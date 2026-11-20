# Pre Activation Policy Edits

React + Vite + Tailwind prototype for editing a policy's payment details before and after activation — covers flows like editing the payment schedule, switching premium-paying status, and managing customer payment methods from Customer 360. Same stack and shared sidebar nav as the [Quoter](https://github.com/pranjaljain-dotcom/Quoter) prototype.

Figma source: [pre-and-post-activation-payment-edits](https://www.figma.com/design/jGjFYiG9ji3n0RRUZ2arv2/pre-and-post-activation-payment-edits)

PRD: [docs/PRD.md](docs/PRD.md) ("PRD #128 Pre-Activation Policy Edits by Agents")

---

## Structure

```
Pre Activation Policy Edits/
├── public/
│   └── assets/              ← Sidebar/nav icons, profile photo
├── src/
│   ├── App.tsx              ← Entire app: Sidebar + page content
│   ├── fonts/                ← Theinhardt font files (bundled by Vite, not in public/)
│   ├── index.css             ← Tailwind entrypoint + @font-face declarations
│   └── main.tsx               ← React entrypoint, mounts <App /> into #root
├── .figma/                   ← Figma Make project metadata (site config, deploy scripts)
├── .github/workflows/deploy.yml  ← Builds + deploys to GitHub Pages on push to main
├── index.html
├── vite.config.ts
└── package.json
```

---

## Live Preview (GitHub Pages)

**https://pranjaljain-dotcom.github.io/PreActivationPolicyEdits/**

Redeploys automatically on every push to `main` via GitHub Actions.

---

## Viewing the Prototype Locally

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm run dev
```

Then open `http://localhost:8444` (port is set via the `PORT` env var in `.claude/launch.json`, falls back to 8443 if unset).

To sanity-check a production build (e.g. before pushing):

```bash
pnpm run build
pnpm run preview
```

---

## Status

Built out from the Quoter prototype's config (Vite/Tailwind/Figma Make setup, fonts, GitHub Pages deploy) with the shared `Sidebar` component reused verbatim for the Customer 360 side panel. The policy page and payment-schedule edit flow (SSB / business-day / calendar-day routing, coverage start date edit, payment method edit, e-sign + verification code submission, and the manage customer payment flow) are implemented in `App.tsx`, ported in from a standalone Figma Make export. Remaining frames from the Figma file above (e.g. premium-paying flows) are still to be built out.

---

## Deployment Notes

GitHub Pages serves this repo under a subpath (`/PreActivationPolicyEdits/`), so:

- `vite.config.ts` reads a `GITHUB_PAGES_BASE` env var (set to `/PreActivationPolicyEdits/` in the deploy workflow) to set Vite's `base`.
- All `public/assets/*` references in `App.tsx` must be **document-relative** (`"assets/x.svg"`, not `"/assets/x.svg"`) so they resolve correctly regardless of the base path.
- Fonts live in `src/fonts/` (not `public/fonts/`) so Vite bundles and base-prefixes them automatically via CSS `url()` — a plain `public/fonts/` reference can't be made subpath-safe in CSS the way JS string paths can.
