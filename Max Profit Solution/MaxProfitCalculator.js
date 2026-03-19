import { buildings } from "./constants.js";
export default class MaxProfitCalculator {
  constructor(totalTime) {
    this.totalTime = totalTime;

    this.memo = {};

    this.buildings = buildings;
  }

  solveRecursive(currentTime) {
    // If we cannot start any building anymore
    if (currentTime >= this.totalTime) {
      return {
        profit: 0,
        solutions: [{ T: 0, P: 0, C: 0 }],
      };
    }

    let maxProfit = 0;
    let bestSolutions = [];

    for (let building of this.buildings) {
      let finishTime = currentTime + building.time;

      // Pick building if it can finish before n
      if (finishTime <= this.totalTime) {
        let currentProfit = building.earn * (this.totalTime - finishTime);

        // Filtering out non-impactful entries (zero earnings)
        if (currentProfit === 0) continue;

        let futureProfit = this.solveRecursive(finishTime);

        let totalProfit = currentProfit + futureProfit.profit;

        if (totalProfit > maxProfit) {
          maxProfit = totalProfit;
          bestSolutions = [];

          for (let solution of futureProfit.solutions) {
            let newSolution = { ...solution };

            newSolution[building.id]++;

            bestSolutions.push(newSolution);
          }
        } else if (totalProfit === maxProfit && totalProfit > 0) {
          for (let solution of futureProfit.solutions) {
            let newSolution = { ...solution };
            newSolution[building.id]++;
            bestSolutions.push(newSolution);
          }
        }
      }
    }

    // in case if no profitable buildings could be built
    if (bestSolutions.length === 0) {
      bestSolutions.push({ T: 0, P: 0, C: 0 });
    }

    // Filter out redundant combinations
    const seen = new Set();
    const finalSolutions = bestSolutions.filter((solution) => {
      const key = `T${solution.T}P${solution.P}C${solution.C}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });

    return {
      profit: maxProfit,
      solutions: finalSolutions,
    };
  }

  solveMemo(currentTime) {
    if (currentTime >= this.totalTime) {
      return {
        profit: 0,
        solutions: [{ T: 0, P: 0, C: 0 }],
      };
    }

    if (this.memo[currentTime]) {
      return this.memo[currentTime];
    }

    let maxProfit = 0;
    let bestSolutions = [];

    for (let building of this.buildings) {
      let finishTime = currentTime + building.time;

      if (finishTime <= this.totalTime) {
        let currentProfit = building.earn * (this.totalTime - finishTime);

        // Filtering out non-impactful entries (zero earnings)
        if (currentProfit === 0) continue;

        let futureProfit = this.solveMemo(finishTime);

        let totalProfit = currentProfit + futureProfit.profit;

        if (totalProfit > maxProfit) {
          maxProfit = totalProfit;
          bestSolutions = [];

          for (let solution of futureProfit.solutions) {
            let newSolution = { ...solution };

            newSolution[building.id]++;

            bestSolutions.push(newSolution);
          }
        } else if (totalProfit === maxProfit && totalProfit > 0) {
          for (let solution of futureProfit.solutions) {
            let newSolution = { ...solution };
            newSolution[building.id]++;
            bestSolutions.push(newSolution);
          }
        }
      }
    }

    // same in case if no profitable buildings could be built
    if (bestSolutions.length === 0) {
      bestSolutions.push({ T: 0, P: 0, C: 0 });
    }

    // Filtering out redundant combinations
    const seen = new Set();
    const finalSolutions = bestSolutions.filter((solution) => {
      const key = `T${solution.T}P${solution.P}C${solution.C}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });

    this.memo[currentTime] = {
      profit: maxProfit,
      solutions: finalSolutions,
    };

    return this.memo[currentTime];
  }
}
