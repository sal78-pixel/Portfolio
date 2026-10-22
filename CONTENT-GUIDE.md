# Content editing guide

The content is intentionally written as normal HTML so it is simple to move and change.

## Move a section

1. Open the page that contains the section.
2. Find its `<!-- MOVEABLE SECTION: ... -->` comment.
3. Select the entire `<section> ... </section>` block.
4. Move it to another spot in that page, or paste it into the `<main>` area of a different page.
5. Keep the page's single `<h1>` in its introduction. Use `<h2>` for section titles and `<h3>` for items inside sections.

Each page has its own navigation and footer. Those are separate from the moveable content in `<main>`.

## Edit common content

- `index.html`: introduction, featured project links, short profile, and contact call to action.
- `about.html`: education, work history, robotics leadership, and volunteering.
- `projects.html`: duplicate or reorder a `<article class="project-feature">` to add or rearrange a project. Keep each `id` unique.
- `skills.html`: edit the skill cards and tags. They describe experience without invented numeric proficiency levels.
- `contact.html`: email and LinkedIn links.
- `styles.css`: palette, typography, spacing, mobile layouts, and dark theme.
- `script.js`: mobile navigation and the dark mode toggle.

The resume and portfolio contain personal information. Review it before publishing, especially the email address and public professional links.
