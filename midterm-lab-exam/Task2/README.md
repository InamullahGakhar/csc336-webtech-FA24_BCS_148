N = 48  
BP = 600 + 48 = **648px**  
H = (48 × 7) mod 360 = **336°**  
Accent colour = **hsl(336, 70%, 45%)**  
K = (48 mod 3) + 3 = **3**  
Sticky offset = (48 mod 40) + 70 = **78px**

# Task 2 — Product page layout with a sticky details box

## Files

- `index.html`: the supplied Task 1 home page, unchanged.
- `product.html`: the existing product page with a Grid layout and a longer description.
- `styles.css`: the supplied stylesheet with clearly marked Task 2 additions and a phone navigation fix.
- `README.md`: personal numbers, an explanation of the changes and test results.

Keep the HTML and CSS files together. Open `product.html` to inspect Task 2, or open `index.html` and follow a product link.

## What changed and where

Search for `Task 2` in the HTML and CSS to find the changes.

| Location | Change | Purpose |
| --- | --- | --- |
| `product.html`, inside `<main>` | Replace the product's `row` and `col-*` wrappers with `.product-layout`, `.product-photo` and `.product-details` | Let CSS Grid control this part of the page at the personal breakpoint |
| `product.html`, product heading | Add `id="product-name"` and a matching section label | Give the details section an accessible name |
| `product.html`, after the details | Add `.product-description` with several headings and paragraphs | Put the description in its own area and provide enough content for scrolling |
| `styles.css`, after `.quantity-input` | Add the three area assignments, Grid layout and details-box styling | Make each section easy to identify and position |
| `styles.css`, `@media (min-width: 648px)` | Change to two columns, span the description across both and enable sticky positioning | Apply the desktop layout starting at exactly BP |
| `styles.css`, existing phone media query | Strengthen the navigation-link selector and prevent wrapping inside links | Override Bootstrap's link padding and keep the product navigation within 375px |

The existing Bootstrap stylesheet, navigation links, product image, product name, price, quantity input, button and footer are retained. The home-page cards and Task 1 filtering selectors are retained. The existing accent colour already matches H = 336°.

## How the Grid works

Below 648px, the named areas form one column:

```css
grid-template-areas:
  "image"
  "details"
  "description";
```

From 648px upwards, they form two columns:

```css
grid-template-areas:
  "image details"
  "description description";
```

Each section has a matching `grid-area` declaration. Repeating `description` across the second row makes it occupy the full grid width. The HTML reading order remains image, details, description at every width.

`minmax(0, 1fr)` makes a column take an equal share of available space while allowing it to shrink. `gap: 1.5rem` separates the areas. Bootstrap still provides the container, typography, image utilities, form styling and buttons; its column classes no longer control the product layout.

## How sticky positioning works

Inside the 648px media query, `.product-details` uses:

```css
position: sticky;
top: 78px;
align-self: start;
z-index: 1;
```

The box starts beside the image. As the page scrolls, its top stops at 78px from the viewport top. `align-self: start` keeps it at its natural height rather than stretching it to fill the Grid row. Its white background and stacking order keep the box visible above scrolling content. It stays within the product grid and moves away before the footer.

Below 648px, those declarations do not apply, so the details scroll normally between the image and description. No height or overflow rule traps the box inside a separate scrolling panel.

## Validation

Checked in Chromium with page JavaScript disabled. The original Bootstrap CSS and product photograph were used for the product-page checks.

| Viewport width | Layout | Details while scrolling | Result |
| --- | --- | --- | --- |
| 375px | Image, details, description stacked | Normal scrolling; no sticky position | Pass |
| 648px, exactly BP | Image and details side by side; description spans both columns | Top remains at 78px at scroll positions 200px, 500px and 800px | Pass |
| 1280px | Image and details side by side; description spans both columns | Top remains at 78px at scroll positions 200px, 500px and 800px | Pass |

Also checked 647px to confirm that the one-column layout continues until the breakpoint. There was no horizontal overflow at the tested widths. The details box cleared the footer at the end of the page.

Task 1 filters were checked at 375px, 648px and 1280px: All shows 8 cards, Peripherals 5, PC Hardware 2 and Monitors 1. Filtering works with JavaScript disabled.

Both HTML files contain zero script elements. Task 2 uses HTML and CSS only. The existing Add to Cart button remains a visual control; this task does not add cart behaviour.

To check manually, resize the viewport to each required width and reload. On the two wider layouts, scroll several hundred pixels and watch the details box remain 78px below the top. On the narrow layout, check the image/details/description order and normal scrolling.
