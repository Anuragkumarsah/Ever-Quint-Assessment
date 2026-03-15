# System Architecture

This document describes the architectural layout, rendering pipeline, and algorithms behind the Water Tank Solution project.

## Component Hierarchy

```text
index.html (Application Layout)
 ├── Input Section
 │    ├── Number Input Field
 │    ├── Add Button
 │    └── Tags Area (Dynamic array display)
 └── Result Section
      ├── Visualisation Canvas (SVG Injection point)
      └── Action Buttons (Toggle Elevation, Clear)

index.js (Controller Logging)
 ├── Event Listeners
 ├── State Variables
 └── algorithm (waterStoredPerBlock)

utils.js (View Generators)
 └── getSVG (Constructs SVG elements based on computed data)
```

## Refactor Example

During the development lifecycle, the code experienced a significant structural refactor to adhere to better Separation of Concerns.

**Initial State:** All HTML event listeners, the core $O(N)$ trapping rain water algorithm, and the massive string interpolation needed for building SVGs were stuffed into a uniform `script.js` file.

**Refactor:**

1. Separated the pure DOM event binding and state mutation into `index.js`.
2. Extracted the SVG string construction loop into an independent `utils.js` specifically serving as the "View Layer".
3. Kept the algorithm logic distinct from the DOM rendering components so it's fully testable.
   **Result:** Increased legibility, easier debugging of SVG alignment issues, and distinct domains for logic vs. view logic.

## Performance Optimization

1. **O(N) Time Complexity Algorithm:**
   The calculation of trapped water is done in exactly three linear passes ($O(N)$ time, $O(N)$ space) by pre-computing the `leftMax` and `rightMax` boundaries instead of calculating the boundary dynamically for every single block $O(N^2)$.
2. **Batch DOM Updates:**
   Instead of continually mutating the DOM when generating blocks, `utils.js` computes a massive SVG string natively in memory. The DOM is updated exactly once (`visualisation.innerHTML = getSVG(...)`), effectively mitigating reflows and repaints in the browser engine during complex chart generations.
