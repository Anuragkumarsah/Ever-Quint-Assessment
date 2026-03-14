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
        } else if (totalProfit === maxProfit) {
          for (let solution of futureProfit.solutions) {
            let newSolution = { ...solution };
            newSolution[building.id]++;
            bestSolutions.push(newSolution);
          }
        }
      }
    }

    if (bestSolutions.length === 0) {
      bestSolutions.push({ T: 0, P: 0, C: 0 });
    }

    return {
      profit: maxProfit,
      solutions: bestSolutions,
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
        } else if (totalProfit === maxProfit) {
          for (let solution of futureProfit.solutions) {
            let newSolution = { ...solution };
            newSolution[building.id]++;
            bestSolutions.push(newSolution);
          }
        }
      }
    }

    if (bestSolutions.length === 0) {
      bestSolutions.push({ T: 0, P: 0, C: 0 });
    }

    this.memo[currentTime] = {
      profit: maxProfit,
      solutions: bestSolutions,
    };

    return this.memo[currentTime];
  }
}
