# Max Profit Solution

A Node.js application that calculates the maximum profit that can be earned by developing a plot of land over a given period of time. It evaluates combinations of constructing Theatres (T), Pubs (P), and Commercial Parks (C) and outputs the maximum possible earnings and the associated combinations of constructions.

## Prerequisites

- Node.js installed on your machine.
- Note that since this project uses ES6 modules (`import`/`export`), ensure you either have `"type": "module"` in your `package.json` or you run it in a Node environment that natively supports it (e.g., node v14+).

## How to Run

1. Open your terminal and navigate to the project directory:
   ```bash
   cd "Max Profit Solution"
   ```

2. Run the application using Node.js:
   ```bash
   node index.js
   ```

3. Follow the CLI prompts:
   - Enter the total time units (`n`).
   - Select the calculation method:
     - `1` for Standard Recursion.
     - `2` for Memoized Recursion (Recommended for larger inputs).

## Refactoring & Improvements Made

This project has been structured with maintainability, separation of concerns, and performance in mind:

1. **Separation of Concerns:**
   - **`constants.js`**: Extracted building properties (id, time to build, and earnings) into a central configuration file.
   - **`MaxProfitCalculator.js`**: Encapsulates the core algorithmic logic completely independent of the user interface.
   - **`index.js`**: Handles purely the Read-Eval-Print Loop (REPL) presentation layer.

2. **Algorithmic Optimization (Memoization):**
   - The original subset-sum style problem has overlapping subproblems. To improve performance drastically for large `n` inputs, a Dynamic Programming approach via memoization (`solveMemo`) was introduced.
   - While `solveRecursive` brute-forces all valid construction branches (which can be very slow for large inputs), the memoized version caches previously calculated maximum outputs at specific time states (`this.memo[currentTime]`), cutting down redundant calculations and significantly reducing time complexity.

3. **Modern JavaScript Standards:**
   - The application was refactored to use ES6 Modules (`import` and `export`) rather than legacy CommonJS `require()`, encouraging a cleaner and standard compliant module resolution.
   - The calculator is constructed as an ES6 Class (`MaxProfitCalculator`), keeping the state (`totalTime`, `memo`, `buildings`) tightly bound to the instance, which is cleaner than maintaining global variables.
