# Kartikeya Pant — Portfolio

A personal portfolio site: systems/projects, leadership, and a photography +
poetry gallery. Built with React, TypeScript, Vite, and Tailwind CSS.

## Editing content

Almost everything on the page — headline, project write-ups, code snippets,
leadership blurbs, the poem, image captions, links, CV URL — lives in one
file:

```
src/content.ts
```

Edit the text there and it flows into every section automatically. You
generally won't need to touch the component files in `src/components/`
unless you want to change layout or add/remove a section.

To swap the gallery photos, replace the files in `public/assets/` (keep the
same filenames, or update the `src` paths in `content.ts`) with your own
images.

## Local development

Requires Node.js 18+.

```bash
npm install
npm run dev
```

This starts a local dev server (usually at http://localhost:5173) with hot
reload.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite — framework preset "Vite", build command
   `npm run build`, output directory `dist`. Leave the defaults and deploy.

No environment variables or extra config are needed.

## Structure

```
src/
  content.ts        ← all editable copy and data
  App.tsx            ← page layout / section order
  components/
    Header.tsx
    Hero.tsx
    FluidVisual.tsx  ← interactive canvas visual in the hero
    Systems.tsx       ← projects section
    Leadership.tsx    ← clubs/roles section
    Gallery.tsx       ← poem + photo plates
    Footer.tsx
public/
  assets/            ← gallery images
```
