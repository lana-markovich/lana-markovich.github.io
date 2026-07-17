# Working on this site with Claude

A plain-language guide for updating the portfolio. You don't need to know how to code — you describe what you want, and Claude does the technical steps. This page tells you **what to say** and **what to expect** for the everyday tasks.

The live site is **https://lana-markovich.github.io**.

---

## One-time setup (do this once)

Before Claude can publish changes for you, your computer needs to be allowed to push to GitHub.

1. Make sure Git is installed and you're signed in to GitHub. The easiest way is to install the **GitHub CLI** and run this in the terminal:
   ```
   gh auth login
   ```
   Follow the prompts (choose GitHub.com → HTTPS → log in with a browser).
2. That's it. You won't need to repeat this unless you switch computers.

> Tip: In Claude Code, you can run a terminal command yourself by typing `!` followed by the command, e.g. `!gh auth login`. Use this for the login step above, since it opens an interactive prompt.

If a "push" ever fails with a permissions error, this login is usually what needs redoing.

---

## The four everyday tasks

For each one, just tell Claude in plain English. Example phrasings are below.

### 1. See the site while you work

**Say:** *"Run the site"* or *"Start the dev server."*

Claude starts a local preview. It'll give you a link (something like `http://localhost:5173`). Open it in your browser. As changes are made, the page updates automatically — you don't need to refresh or restart.

When you're done, you can say *"Stop the site."*

### 2. Publish your changes (make them live)

**Say:** *"Publish this"* or *"Push my changes live."*

Claude commits the changes and pushes them to GitHub. GitHub then rebuilds and deploys the site automatically. **The live site updates about 1–2 minutes later** at https://lana-markovich.github.io.

There's no separate "deploy" button — pushing *is* publishing. If you want to check progress, look at the **Actions** tab of the GitHub repository; a green checkmark means it's live.

> Nothing is public until you say "publish." You can experiment freely with the local preview first.

### 3. Add an image or a new artwork

**Say:** *"Add this image"* (and attach or point to the file), then describe where it should go — for example: *"Add it to the portfolio as a painting called 'Sunset', 2024"* or *"Add it to the scrolling gallery."*

Behind the scenes Claude will optimize the image, register it, and place it where you asked. Things that help Claude do it right:

- **Give the file a simple name** before adding it (e.g. `sunset-over-water.png`). Lowercase, words separated by dashes, no spaces.
- **Tell Claude the details** if it's an artwork: title, year, size/medium (e.g. "100×70 cm, oil on canvas"), and a short description if you have one.
- **Say where it belongs:** the portfolio grid (and which category — Paintings, Decor, or Graphic), the gallery, or a specific section.

After adding, ask Claude to *"run the site"* so you can check it looks right, then *"publish"* when you're happy.

### 4. Change how something looks (styles)

**Say what you want in everyday terms**, for example:
- *"Make the headings a bit smaller."*
- *"Add more space between sections."*
- *"The text feels too light — make it darker."*

You don't need to name colors, pixels, or files. Describe the effect you want; Claude knows where the site's design settings live and will adjust them. Ask to *"run the site"* to see the change, then *"publish"* when it's right.

---

## Good habits

- **Preview before publishing.** Ask Claude to run the site and look at the change first.
- **One change at a time** is easier to review than ten at once.
- **If something looks broken,** tell Claude what you see (or paste a screenshot) — you can always say *"undo that"* before publishing.
- **When in doubt, ask.** *"What will this change?"* or *"Is this safe to publish?"* are perfectly good questions to ask Claude.

---

## For Claude / technical readers

The precise commands, the image-processing pipeline, the deploy workflow, and the design-token locations are documented for the AI in [`../CLAUDE.md`](../CLAUDE.md) under **Common Workflows**. The design system reference lives in [`design-system/`](./design-system/). This guide is the friendly version of that.
