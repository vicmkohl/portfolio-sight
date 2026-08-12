# Portfolio Site — Quick Start

Three files, no build step: `index.html`, `styles.css`, `script.js`. Open `index.html`
in a browser to preview, or upload all three to any static host (Netlify, Vercel,
GitHub Pages, etc.).

## This version replicates selectedbase.com's actual UX patterns

Rather than a generic portfolio grid, this rebuild mirrors the real structure and
interaction language of Selected. (Berlin's house-music label site) section by section:

| Selected. section | This site | Pattern replicated |
|---|---|---|
| Loader ("000%") | Loader | Percentage counter before reveal |
| Cookie banner | Cookie banner | Bottom-left Accept/Decline banner |
| "Our Releases" | **Work** | Big duplicated marquee headline + auto-scrolling horizontal row of project cards |
| "Our Artists" | **Recommendations** | Section marquee heading + auto-rotating single testimonial with dot navigation (mirrors their rotating `{{name}}` template) |
| "Selected Sessions" | **Sessions** | Stacked full-width cards, each with a location tag, headline, description, and a "Watch" link — plus a scrolling name ticker at the end |
| Newsletter signup | Newsletter | Underlined email field + submit |
| Footer nav columns + giant wordmark | Footer | Three-column link footer, huge centered name, copyright bar |

The **marquee ticker** — a full-width auto-scrolling line of duplicated text — is
Selected.'s single most distinctive device, and it's now used three ways: a role
ticker under the hero, a giant duplicated headline at the top of every section, and
a small-caps client-name ticker under Sessions. It pauses on hover.

Type, color, and the timecode/grain motif from the original build are kept
(Anton + Work Sans + IBM Plex Mono, near-black with one signal-blue accent) since
those aren't specific to Selected. — they just support the reel/broadcast feel.

## What to replace

Placeholder tiles are dark with a caption telling you what belongs there. Search for:

1. **Name & role** — `ALEX RIVERA` / `Director / Cinematographer` (nav, hero, footer, email).
2. **Hero reel** — `.hero-video.placeholder-video` in the Hero section.
3. **Work row** — six `.release-card` blocks under `#work` (first three are the
   real set, the next three are `aria-hidden="true"` duplicates for the seamless
   scroll loop — edit both copies to match, or regenerate the duplicate in JS later).
4. **About** — `.about-media` photo, bio copy, skills list.
5. **Recommendations** — four `.rotator-slide` blocks (quote + name + role).
6. **Sessions** — three `.session` blocks (location, title, description, video).
7. **Contact & footer** — email address and Instagram/Vimeo/LinkedIn links (appear
   in the fullscreen menu and footer).

## Swapping a placeholder for a real video

```html
<div class="release-media">
  <video src="your-clip.mp4" autoplay muted loop playsinline></video>
</div>
```

Drop the `placeholder-video`/`placeholder-photo` class and `data-placeholder`
attribute once real media is in — the hover-zoom, marquee, and card layout keep working.

## Notes

- The release row and every marquee auto-scroll continuously and pause on hover —
  matches Selected.'s behavior, but means the content is genuinely duplicated in
  the DOM (marked `aria-hidden` where appropriate) rather than JS-cloned, so it's
  simple to hand-edit.
- Newsletter form has no backend wired up — it just shows a confirmation message
  on submit. Point it at Mailchimp/ConvertKit/etc. when ready.
- Cookie banner choice is remembered via `localStorage` (falls back gracefully if
  unavailable, e.g. in some private-browsing modes).
- Fully responsive; custom cursor and hover states disable under 860px.
