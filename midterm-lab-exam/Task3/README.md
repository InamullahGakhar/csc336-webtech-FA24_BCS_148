N = 48  
BP = 600 + 48 = **648px**  
H = (48 × 7) mod 360 = **336°**  
Accent colour = **hsl(336, 70%, 45%)**  
K = (48 mod 3) + 3 = **3**  
Sticky offset = (48 mod 40) + 70 = **78px**  
Premium threshold = 48 × 100 = **Rs. 4,800** (strictly greater than)

# Midterm — Tasks 2 and 3

## Files

- `index.html`: the Task 1 home page with Task 3 search/sort controls and a deferred script link.
- `product.html`: the existing product page with a Grid layout and a longer description.
- `styles.css`: the supplied stylesheet with clearly marked Task 2 and Task 3 additions.
- `script.js`: plain JavaScript for combined filtering, price sorting and Premium labels.
- `README.md`: personal numbers, an explanation of the changes and test results.

Keep both HTML files, `styles.css` and `script.js` together. Open `index.html` to inspect Task 3 and follow a product link to inspect Task 2.

## Task 2 — Product page layout with a sticky details box

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

`product.html` contains zero script elements. Task 2 uses HTML and CSS only. Task 3's script is linked only from `index.html`. The existing Add to Cart controls remain visual controls; these tasks do not add cart behaviour.

To check manually, resize the viewport to each required width and reload. On the two wider layouts, scroll several hundred pixels and watch the details box remain 78px below the top. On the narrow layout, check the image/details/description order and normal scrolling.

## Task 3 — Search, sorting and Premium labels

All Task 3 additions are marked with `Task 3` comments. Bootstrap remains the styling framework. The script uses plain JavaScript, with no jQuery or JavaScript framework.

### What changed and where

| File | Change |
| --- | --- |
| `index.html`, head | Link `script.js` with `defer`, so the HTML is parsed before the script runs |
| `index.html`, above the grid | Add a labelled search input and a Sort by price button |
| `index.html`, existing price paragraphs | Add `product-price` as a class; keep the same price text |
| `index.html`, after the grid | Add the initially hidden message `No products found` |
| `styles.css`, after `.product-image` | Make the `hidden` attribute override Bootstrap's Grid display and style the Premium label with the personal accent colour |
| `script.js` | Read, filter and reorder the existing card elements, and create Premium labels on load |

The eight product cards remain in the HTML. Their names, prices, images and links are not rebuilt from product data. The `productCards` array contains references to the existing Grid children. Sorting this array and using `appendChild` moves those same wrappers, including their original articles and contents.

### How the script works

| Code | Purpose |
| --- | --- |
| `N` and `premiumLimit` | Set N = 48 and calculate the Rs. 4,800 threshold |
| `querySelector`, `getElementById` and `querySelectorAll` | Find the Grid, controls, message and existing category radio buttons |
| `Array.from(productGrid.children)` | Collect references to the existing card wrappers so they can be sorted |
| `getPrice(card)` | Read `.product-price`, remove `Rs.` and commas, and convert the result to a number |
| `filterProducts()` | Read the search input and checked category, then show a card only when both match |
| `toLowerCase()` and `includes()` | Match a product name without case sensitivity; `trim()` ignores outer spaces in the search |
| `card.hidden` | Hide the entire Bootstrap column so filtered cards leave no empty column spaces |
| `visibleCount` | Hide the Grid and show `No products found` when the combined result is empty |
| Premium-label loop | Use `createElement`, `textContent` and `prepend` to add a small span only when the card price is greater than 4,800 |
| Search `input` listener | Filter on every edit, including clearing the search box |
| Category `change` listeners | Recheck the current search whenever the selected category changes |
| Sort `click` listener | Sort numerically, call `appendChild` for each existing card wrapper and alternate direction |
| Final two statements | Apply restored form values and reveal the working controls |

The first sort click uses low-to-high order, the second high-to-low, and subsequent clicks alternate. The button text reports the current applied order. Hidden cards are sorted too, so changing search or category retains the current price order. Prices are read from the DOM during each sort, rather than from cached product data. The Grid is never rewritten with `innerHTML`.

The original Task 1 CSS category filters remain intact and still work with JavaScript disabled. The new controls stay hidden when JavaScript is disabled. With JavaScript enabled, `filterProducts()` uses the same category values to combine category and search for an accurate empty state.

### Task 3 validation

Checked at 375px, exactly 648px and 1280px in Chromium. Each width passed:

- Case-insensitive name search, including outer spaces and clearing the input.
- Search and category filtering together, including a mismatch followed by recovery.
- The exact `No products found` message replacing the Grid only when needed.
- Repeated ascending/descending numeric sorting, including while filtered or empty.
- Original card wrapper and article identities retained after sorting; `appendChild` used for every move.
- A changed price in the DOM affecting the next sort.
- Seven Premium labels: every current product except the Rs. 4,500 mouse.
- No horizontal overflow or page JavaScript errors.

The threshold was also checked with temporary test prices: Rs. 4,800 receives no label; Rs. 4,801 receives one. Test prices were not saved into the delivered page.

The Task 2 layout/sticky checks and Task 1 category checks were rerun with JavaScript disabled and passed.

To check manually, type `mouse`: two cards appear. Choose PC Hardware: the empty message appears. Clear the search: two hardware cards appear. Choose All and click Sort by price twice: the mouse is first on the first click, and the graphics card is first on the second click.
