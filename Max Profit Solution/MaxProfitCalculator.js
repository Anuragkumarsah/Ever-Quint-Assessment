class MaxProfitCalculator {
  constructor(totalTime) {
    this.n = totalTime;

    this.memo = {};

    this.buildings = [
      { id: "T", time: 5, earn: 1500 },
      { id: "P", time: 4, earn: 1000 },
      { id: "C", time: 10, earn: 2000 },
    ];
  }

  solveRecursive(currentTime) {
    // If we cannot start any building anymore
    if (currentTime >= this.n) {
      return 0;
    }

    let maxProfit = 0;
    let bestSolutions = [];

    for (let b of this.buildings) {
      let finishTime = currentTime + b.time;

      // Pick building if it can finish before n
      if (finishTime <= this.n) {
        let profitFromThisBuilding = b.earn * (this.n - finishTime);

        let futureProfit = this.solveRecursive(finishTime);

        maxProfit = Math.max(maxProfit, profitFromThisBuilding + futureProfit);
      }
    }

    return maxProfit;
  }

  solveMemo(currentTime) {
    if (currentTime >= this.n) {
      return 0;
    }

    if (this.memo[currentTime] !== undefined) {
      return this.memo[currentTime];
    }

    let maxProfit = 0;

    for (let b of this.buildings) {
      let finishTime = currentTime + b.time;

      if (finishTime <= this.n) {
        let profitFromThisBuilding = b.earn * (this.n - finishTime);

        let futureProfit = this.solveMemo(finishTime);

        maxProfit = Math.max(maxProfit, profitFromThisBuilding + futureProfit);
      }
    }

    this.memo[currentTime] = maxProfit;

    return maxProfit;
  }
}
