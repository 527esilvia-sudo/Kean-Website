# Kean University Website

This project is a static multi-page recruitment website for Kean University. The final implementation includes a restored homepage KEAN collage, a content-rich About page, a Student Life experience page, a Programs explorer, and a Cost and planning page.

## Project purpose

The site is built to present Kean as a public university with:

- strong New Jersey roots
- a wider national and global reach
- practical, career-connected programs
- active student life and campus community
- clear admissions and affordability information

## File structure

- `index.html` — homepage hero, intro content, feature cards, and footer
- `about.html` — university story, campus locations, map, and storytelling sections
- `studentLife.html` — Student Life overview, residence information, first-year foundation, and campus engagement content
- `programs.html` — program explorer, categories, and detail modal
- `admissions.html` — cost and affordability planning page
- `apply.html` — application entry page
- `styles.css` — shared navigation, footer, homepage hero, and global site styling
- `about.css` — page-specific About layout, map section, timeline, and big visual storytelling blocks
- `student-life.css` — Student Life page-specific layouts and content styling
- `programs.css` — programs/cost visual styling, chart layout, modal styling, and responsive forms
- `script.js` — global behavior for campus map interactions, tab-like toggles, and reveal animations
- `student-life.js` — Student Life academic area toggles
- `programs.js` — program search/filtering, modal behavior, and cost estimate interactions
- `artimgs/`, `scienceimgs/`, `sportimgs/` — image assets used across the site
- `campus.jpeg`, `students.png`, `nj-map.png` — shared campus and map imagery

## Dependencies

- Bootstrap 5.3.8 via CDN for layout, navbar, spacing, and component behavior
- Google Fonts used for the site theme, with the special KEAN hero collage using the custom display-style treatment in the home page CSS
- No build toolchain is required; the site is served as static files

## Homepage hero and collage

The homepage uses an oversized KEAN collage built from four letter blocks with image-filled masks. The collage is intentionally kept separate from the global typography so the rest of the site retains its normal fonts and spacing.

The letter treatment includes:

- four large letter forms for K, E, A, and N
- image fills associated with athletics, science, arts, and student life
- an outline treatment that follows the actual letter shape
- hover emphasis without introducing a duplicate black letter beneath the visible image layer

## About page map

The About page uses the real `nj-map.png` asset and positions interactive campus pins relative to the map container. It includes a selected-campus detail preview and a responsive stacked layout for smaller screens.

## Student Life interactions

The Student Life page includes:

- a responsive hero layout
- content blocks emphasizing residence life, academics, and student engagement
- academic-area accordion toggles
- a first-year foundation section and timeline-based storytelling

## Programs and cost functionality

The Programs and Cost experience includes:

- searchable and filterable program cards
- a compact program detail modal
- cost planning estimates for resident vs commuter models
- undergraduate cost comparison visuals and planning summaries

## Responsive behavior

The site is designed to respond across desktop and mobile widths using:

- Bootstrap layout utilities
- CSS Grid and Flexbox-based section layouts
- `clamp()` sizing for large headings and responsive spacing
- breakpoint-driven stacking for the map, timeline, and mobile navigation

## How to run locally

```bash
cd /workspaces/Kean-Website
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Notes

- Page-specific JavaScript is guarded so it only runs when the relevant elements exist.
- Shared styles are kept broad enough for site-wide consistency while page-specific CSS remains in dedicated files.
- The project is intentionally static and documentation reflects the final code structure rather than a hypothetical future build system.
