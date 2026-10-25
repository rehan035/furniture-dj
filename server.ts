import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Simple cookie parser helper
function parseCookies(req: Request): Record<string, string> {
  const list: Record<string, string> = {};
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}

function setSessionCookie(res: Response, name: string, value: string, maxAgeSeconds = 86400) {
  const cookieStr = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; Secure; SameSite=None`;
  res.setHeader('Set-Cookie', cookieStr);
}

function clearSessionCookie(res: Response, name: string) {
  const cookieStr = `${name}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None`;
  res.setHeader('Set-Cookie', cookieStr);
}

function getRedirectUri(req: Request): string {
  const originFromQuery = typeof req.query.origin === 'string' ? req.query.origin : '';
  const base =
    originFromQuery ||
    (process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL' ? process.env.APP_URL : '') ||
    `${req.protocol}://${req.get('host')}`;
  return `${base.replace(/\/$/, '')}/auth/callback`;
}

// 1. Construct GitHub OAuth Authorization URL
app.get('/api/auth/url', (req: Request, res: Response) => {
  const clientId = process.env.CLIENT_ID || process.env.GITHUB_CLIENT_ID || '';
  const redirectUri = getRedirectUri(req);

  if (!clientId) {
    res.status(400).json({
      error: 'GitHub OAuth CLIENT_ID is not configured yet.',
      configured: false,
      redirectUri,
    });
    return;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo workflow read:user',
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.json({ url: authUrl, configured: true, redirectUri });
});

// 2. GitHub OAuth Callback Handler (supports trailing slash variations)
const oauthCallbackHandler = async (req: Request, res: Response) => {
  const code = typeof req.query.code === 'string' ? req.query.code : '';
  const clientId = process.env.CLIENT_ID || process.env.GITHUB_CLIENT_ID || '';
  const clientSecret = process.env.CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET || '';

  if (!code || !clientId || !clientSecret) {
    res.status(400).send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem; background: #fcf9f2; color: #27130b;">
          <h3>GitHub Authentication Incomplete</h3>
          <p>Missing authorization code or OAuth CLIENT_ID / CLIENT_SECRET configuration.</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', message: 'Missing OAuth credentials' }, '*');
              setTimeout(() => window.close(), 1500);
            }
          </script>
        </body>
      </html>
    `);
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };
    if (!tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange code for GitHub token');
    }

    setSessionCookie(res, 'gh_access_token', tokenData.access_token, 60 * 60 * 24 * 7);

    res.send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem; background: #fcf9f2; color: #27130b; text-align: center;">
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>GitHub authentication successful. This window will close automatically.</p>
        </body>
      </html>
    `);
  } catch (err: any) {
    res.status(500).send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem; background: #fcf9f2; color: #27130b;">
          <h3>Authentication Error</h3>
          <p>${err?.message || 'Unable to complete GitHub sign-in.'}</p>
        </body>
      </html>
    `);
  }
};

app.get(['/auth/callback', '/auth/callback/'], oauthCallbackHandler);

// 3. Check GitHub Connection Status
app.get('/api/github/status', async (req: Request, res: Response) => {
  const cookies = parseCookies(req);
  const token = cookies.gh_access_token || process.env.GITHUB_TOKEN || '';
  const oauthConfigured = Boolean(
    (process.env.CLIENT_ID || process.env.GITHUB_CLIENT_ID) &&
      (process.env.CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET)
  );
  const redirectUri = getRedirectUri(req);

  if (!token) {
    res.json({
      authenticated: false,
      oauthConfigured,
      redirectUri,
    });
    return;
  }

  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Pakistan-Rattan-Furniture-Atelier',
      },
    });

    if (!userRes.ok) {
      res.json({
        authenticated: false,
        oauthConfigured,
        redirectUri,
      });
      return;
    }

    const user = (await userRes.json()) as {
      login: string;
      name?: string;
      avatar_url?: string;
      html_url?: string;
    };

    res.json({
      authenticated: true,
      oauthConfigured,
      redirectUri,
      user: {
        login: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
      },
    });
  } catch {
    res.json({
      authenticated: false,
      oauthConfigured,
      redirectUri,
    });
  }
});

// 4. Disconnect GitHub Session
app.post('/api/github/logout', (_req: Request, res: Response) => {
  clearSessionCookie(res, 'gh_access_token');
  res.json({ ok: true });
});

// Helper to gather repository files from workspace
function getRepositoryFiles(): Array<{ path: string; content: string }> {
  const filesToRead = [
    'package.json',
    'index.html',
    'vite.config.ts',
    'tsconfig.json',
    'metadata.json',
    'DESIGN.md',
    'README.md',
    '.gitignore',
    'src/main.tsx',
    'src/index.css',
    'src/App.tsx',
  ];

  const result: Array<{ path: string; content: string }> = [];
  for (const relPath of filesToRead) {
    const fullPath = path.join(__dirname, relPath);
    if (fs.existsSync(fullPath)) {
      result.push({
        path: relPath,
        content: fs.readFileSync(fullPath, 'utf-8'),
      });
    }
  }

  // Also include a GitHub Actions workflow for automatic GitHub Pages deployment
  const pagesWorkflow = `name: Deploy Pakistan Rattan Atelier to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build_and_deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install
      - name: Build Vite site
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  result.push({
    path: '.github/workflows/deploy-pages.yml',
    content: pagesWorkflow,
  });

  return result;
}

// 5. Inspect Repository Bundle
app.get('/api/github/bundle', (_req: Request, res: Response) => {
  const files = getRepositoryFiles();
  res.json({
    repositoryDefaultName: 'pakistan-rattan-furniture-atelier',
    fileCount: files.length,
    files: files.map((f) => ({
      path: f.path,
      sizeBytes: Buffer.byteLength(f.content, 'utf-8'),
      content: f.content,
    })),
  });
});

// 6. Publish Repository to GitHub
app.post('/api/github/publish', async (req: Request, res: Response) => {
  const cookies = parseCookies(req);
  const token = cookies.gh_access_token || process.env.GITHUB_TOKEN || '';

  if (!token) {
    res.status(401).json({
      error: 'Please connect your GitHub account first to publish directly.',
    });
    return;
  }

  const {
    repoName = 'pakistan-rattan-furniture-atelier',
    description = 'Pakistan Rattan Furniture Atelier — Handcrafted Cane & Bespoke Woodwork in Islamabad',
    isPrivate = false,
    commitMessage = 'Initial release: Pakistan Rattan Furniture Atelier (Islamabad)',
  } = req.body || {};

  const cleanRepoName = String(repoName)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-');

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'Pakistan-Rattan-Furniture-Atelier',
  };

  try {
    // 1. Get authenticated user
    const userRes = await fetch('https://api.github.com/user', { headers });
    if (!userRes.ok) {
      throw new Error('GitHub session expired. Please reconnect your GitHub account.');
    }
    const user = (await userRes.json()) as { login: string };
    const owner = user.login;

    // 2. Check if repository exists; if not, create it with auto_init: true so default branch exists
    let repoUrl = `https://github.com/${owner}/${cleanRepoName}`;
    let defaultBranch = 'main';

    const existingRepoRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepoName}`, {
      headers,
    });

    if (!existingRepoRes.ok) {
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: cleanRepoName,
          description,
          private: Boolean(isPrivate),
          auto_init: true,
        }),
      });

      if (!createRes.ok) {
        const errBody = (await createRes.json()) as { message?: string };
        throw new Error(errBody.message || 'Failed to create repository on GitHub');
      }

      const createdRepo = (await createRes.json()) as { html_url: string; default_branch: string };
      repoUrl = createdRepo.html_url;
      defaultBranch = createdRepo.default_branch || 'main';
    } else {
      const existingRepo = (await existingRepoRes.json()) as { html_url: string; default_branch: string };
      repoUrl = existingRepo.html_url;
      defaultBranch = existingRepo.default_branch || 'main';
    }

    // 3. Push all files via Contents API or Git Tree API
    const files = getRepositoryFiles();

    // Get latest commit SHA of defaultBranch
    const refRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepoName}/git/ref/heads/${defaultBranch}`,
      { headers }
    );

    if (refRes.ok) {
      const refData = (await refRes.json()) as { object: { sha: string } };
      const latestCommitSha = refData.object.sha;

      const commitRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/git/commits/${latestCommitSha}`,
        { headers }
      );
      const commitData = (await commitRes.json()) as { tree: { sha: string } };

      // Create tree with all project files
      const treeItems = files.map((file) => ({
        path: file.path,
        mode: '100644',
        type: 'blob',
        content: file.content,
      }));

      const newTreeRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/git/trees`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            base_tree: commitData.tree.sha,
            tree: treeItems,
          }),
        }
      );

      if (!newTreeRes.ok) {
        const treeErr = (await newTreeRes.json()) as { message?: string };
        throw new Error(treeErr.message || 'Failed to build Git tree');
      }

      const newTree = (await newTreeRes.json()) as { sha: string };

      // Create commit
      const newCommitRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/git/commits`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: commitMessage,
            tree: newTree.sha,
            parents: [latestCommitSha],
          }),
        }
      );

      if (!newCommitRes.ok) {
        const commitErr = (await newCommitRes.json()) as { message?: string };
        throw new Error(commitErr.message || 'Failed to create Git commit');
      }

      const newCommit = (await newCommitRes.json()) as { sha: string; html_url?: string };

      // Update branch reference
      await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/git/refs/heads/${defaultBranch}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            sha: newCommit.sha,
            force: true,
          }),
        }
      );

      res.json({
        success: true,
        owner,
        repoName: cleanRepoName,
        repoUrl,
        branch: defaultBranch,
        commitSha: newCommit.sha.slice(0, 7),
        filesPublished: files.length,
        pagesUrl: `https://${owner}.github.io/${cleanRepoName}/`,
      });
      return;
    }

    // Fallback: sequential file put if branch ref was not initialized yet
    for (const file of files) {
      await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/contents/${file.path}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(file.content, 'utf-8').toString('base64'),
          }),
        }
      );
    }

    res.json({
      success: true,
      owner,
      repoName: cleanRepoName,
      repoUrl,
      branch: defaultBranch,
      commitSha: 'initial',
      filesPublished: files.length,
      pagesUrl: `https://${owner}.github.io/${cleanRepoName}/`,
    });
  } catch (err: any) {
    res.status(500).json({
      error: err?.message || 'Failed to publish repository to GitHub',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
