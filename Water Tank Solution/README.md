# Water Tank Solution

A vanilla JavaScript and HTML visualization of the classic "Trapping Rain Water" algorithm problem.

## Features

- **Algorithm Visualization:** Calculates and visualizes how much water is trapped between elevation blocks.
- **Interactive Input:** Accept single or comma-separated numbers for elevation blocks.
- **Dynamic Preview:** Provides a live preview of the elevation layout as numbers are added.
- **Toggle View:** Quickly switch between seeing only the trapped water or the combined blocks and water.

## How to Run

Since this is a client-side vanilla JavaScript and HTML application, no build steps or servers are required.

1. **Navigate to the UI Directory:**
   ```bash
   cd "Water Tank Solution/UI"
   ```
2. **Open the Application:**
   Start a Python's HTTP server (Note: Python 3 is required and needs to be installed):
   ```bash
   python -m http.server 8000
   ```
3. Open the application in your browser at `http://localhost:8000`.

## Architecture Overview

For a deeper dive into the component breakdown, performance optimizations, and code structure, see our [ARCHITECTURE.md](./ARCHITECTURE.md).

This project relies on a simple, fast Vanilla JS architecture:

- **`index.html` & `index.css`**: Define the structure and styling.
- **`index.js`**: Handles DOM manipulation and user events.
- **`utils.js`**: Contains the complex SVG generation logic.
- **`algorithm.ts` / Algorithm Implementation**: The core `waterStoredPerBlock` function logic that pre-computes maximum values for efficiency.
