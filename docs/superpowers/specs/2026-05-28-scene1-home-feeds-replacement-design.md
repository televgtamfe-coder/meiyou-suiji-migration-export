# Scene1 Home Feeds Replacement Design

Date: 2026-05-28

## Goal

Replace the current placeholder `scene1-home` feeds content with the real feeds content from `html-经期首页.zip`, while preserving the already-approved shell and current Scene1 integrations.

## Scope

In scope:

- Replace the feeds area inside `Scene1HomePage.tsx`
- Recreate the full real feed list from the code package
- Reuse the current `scene1-home` shell, status bar, top bar, KMI card, period switch row, floating action button, bottom tab bar, and page scroll behavior
- Introduce the feed assets needed from the HTML package
- Update tests so they verify real feed modules instead of the current placeholder feed structure

Out of scope:

- Replacing the page shell or top hero section
- Changing KMI score logic or its placement
- Reworking the bottom navigation
- Rebuilding the full Pixso-exported page 1:1 outside the feeds section

## Source Baseline

The HTML package contains a complete period-home feed module set, including:

- Main feed item with:
  - author `月月姐姐`
  - subtitle `宝宝1岁`
  - long post copy with `#姐妹来帮忙`
  - `全文`
  - three real preview images
  - `热评`
  - comment and like interaction row
- Additional follow-up feed cards below the main feed

These will be treated as the content source of truth for the feeds area.

## Recommended Approach

Use the current React page structure as the host container and replace only the feed list subtree.

Why this approach:

- It preserves the currently verified Scene1 shell and navigation
- It keeps the existing KMI/home integrations intact
- It minimizes regression risk in the already-reviewed top and bottom areas
- It allows the real feed content to be restored without importing the full Pixso absolute-position page output

## UI / Structure Plan

`Scene1HomePage.tsx` will be updated so that:

- The hero card remains unchanged
- The period switch row remains unchanged
- The placeholder community cards are removed
- A real feed list section is rendered in the same vertical scroll region

The new feed list will contain:

1. A primary feed card
   - author block
   - post text
   - three-image preview row
   - hot-comment block
   - interaction footer

2. Remaining feed cards from the HTML package
   - kept as separate cards
   - mapped into the existing home visual system
   - rendered as real content rather than generic placeholders

## Data / Asset Plan

Add a local feed data source near Scene1 home code to hold:

- author name
- subtitle
- post text
- optional tag
- image asset references
- hot comment
- counts / footer values

Asset handling:

- Copy only the images needed for the feed cards from the extracted HTML package into repo assets
- Prefer explicit named imports over opaque runtime path stitching
- Avoid bringing over package artifacts that are unrelated to the feeds area

## Styling Plan

The page must continue to visually belong to the current `scene1-home`.

That means:

- Keep the current page width, spacing system, and shell alignment
- Reuse existing `scene1-home-post-*` styles where they still fit
- Replace only the placeholder thumbnail/avatar constructions with real-image-based feed styling
- Add new CSS only where the real content requires it

No broad restyling of the home page should happen in this task.

## Testing Plan

Before implementation:

- Add or update tests to fail until the placeholder feed structure is replaced

The tests should verify:

- the main real feed author and subtitle are rendered
- the main feed text and `全文` are rendered
- three real feed preview images exist for the primary feed
- the hot comment module is present
- current shell/top/tab structures still render on `/scene1-home`

Verification after implementation:

- targeted vitest for `scene1-home`
- related tabbar/home tests
- production build

## Risks and Controls

Risk: the Pixso HTML export contains absolute-position structures that do not map cleanly to the current React layout.

Control:

- use the content and required local module structure from the export, not the whole absolute-position page shell

Risk: replacing feeds could accidentally disturb already-approved home spacing.

Control:

- keep edits scoped to the feed subtree and local feed CSS

Risk: too many package assets could bloat the repo.

Control:

- import only the assets used by the final rendered feed cards

## Success Criteria

- `/scene1-home` keeps the existing shell and navigation behavior
- the placeholder feed content is gone
- the feed area shows the real content from `html-经期首页.zip`
- the main feed includes real author, text, preview images, hot comment, and footer interactions
- tests and build pass
