# Nikola Cehic Portfolio

React/Vite portfolio site for Nikola Cehic, built as a chaptered brand surface for senior fullstack, crypto infrastructure, and AI-native product roles.

## Local Development

```bash
npm install
npm run dev
```

The dev server opens at the local URL printed by Vite, usually `http://127.0.0.1:3000/` or `http://localhost:5173/`.

## Production

```bash
npm run build
npm run preview
```

## Checks

```bash
npm test
npm run typecheck
npm run build
```

## Project Structure

```text
src/App.tsx             Main portfolio surface and section composition
src/data.ts             CV, experience, stack, and project content
src/styles/theme.css    OKLCH tokens and typography variables
src/styles/globals.css  Layout, components, motion, and responsive styling
public/                 Static public assets, including the CV PDF
PRODUCT.md             Strategic brand context for design work
DESIGN.md              Visual system context for design work
```

## Content

Update portfolio content in `src/data.ts`. The CV download is served from `public/Nikola-Cehic-CV.pdf` and linked as `/Nikola-Cehic-CV.pdf`.
