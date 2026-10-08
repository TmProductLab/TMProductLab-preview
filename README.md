# TMProductLab — GitHub Pages + private editor

This is the separate GitHub Pages edition of TMProductLab. It keeps the existing visual direction, but moves editable information into `content/` and adds a Decap CMS editor at:

`/studio-vault-7m4k/`

The unusual address is only a convenience. It is **not** the security layer. Write access is secured by GitHub sign-in, the GitHub OAuth helper, and repository permissions.

## What the editor controls

- Add, reorder, feature, update, or remove projects.
- Upload project thumbnails and media-frame images.
- Edit each project’s description, status, year, Lab relationships, and media details.
- Add optional public GLB/GLTF model and poster URLs for future interactive 3D modules.
- Edit Labs, capabilities, tools, homepage images, homepage copy, logo, wordmark, footer, email, résumé URL, and social links.
- Review edits in an editorial workflow before publishing.

Uploaded images are saved under `public/uploads/`. For large videos or 3D models, use an external storage URL so the GitHub repository stays fast.

## Local preview

Requires Node.js 22 or newer.

```powershell
npm install
npm run dev
```

The site opens at `http://localhost:3000`.

To test the content editor locally, keep the site running and start this in a second terminal:

```powershell
npm run admin
```

Then open `http://localhost:3000/studio-vault-7m4k/index.html`. The published GitHub Pages address will use the cleaner `/studio-vault-7m4k/` path.

## Connect the future GitHub account

After copying this folder to the other computer/account:

1. Create a GitHub repository and upload this project to its `main` branch.
2. In `public/studio-vault-7m4k/config.yml`, replace:
   - `REPLACE_WITH_GITHUB_ACCOUNT/REPLACE_WITH_REPOSITORY`
   - `https://REPLACE_WITH_OAUTH_DOMAIN`
   - both instances of `https://REPLACE_WITH_SITE_DOMAIN`
3. Create a GitHub OAuth App on the account and connect it to a small OAuth helper service. GitHub Pages is static, so the helper is required for secure browser sign-in. The helper can be hosted separately, for example as a Cloudflare Worker.
4. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
5. Keep repository write access limited to the GitHub accounts allowed to publish.

Every approved editor change becomes a Git commit. The included workflow rebuilds the site and publishes it to GitHub Pages automatically.

## Privacy and security

- The public portfolio requires no visitor login.
- The editor URL is marked `noindex`, but anyone who discovers the address can load its sign-in screen.
- Only a GitHub user authorized by the OAuth App and allowed to write to the repository can save or publish changes.
- Do not put private files, passwords, client secrets, or confidential briefs in `public/`, `content/`, or the repository.
- If the repository is public, its source content and uploaded media are public even when the editor is protected.

## GitHub Pages paths

The included workflow automatically handles both:

- `account.github.io` repositories, served at the domain root.
- ordinary project repositories, served under `/repository-name/`.

No route or asset path should need manual rewriting after migration.
