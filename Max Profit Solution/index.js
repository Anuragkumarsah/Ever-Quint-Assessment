import readline from "readline";
import MaxProfitCalculator from "./MaxProfitCalculator.js";

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let time = 0;

io.question("Enter time units (n): ", function (time) {
  time = parseInt(time);
  io.question(
    "Enter 1 for calculating using recursion, 2 for calculating using memoized recursion: ",
    function (calcOption) {
      const option = parseInt(calcOption);

      let calculator = new MaxProfitCalculator(time);

      if (option !== 1 && option !== 2) {
        console.log("Wrong input, only select from 1 and 2");
        io.close();
      }

      let result =
        option === 1 ? calculator.solveRecursive(0) : calculator.solveMemo(0);

      console.log(`\nEarnings: $${result.profit}`);
      console.log("Solutions");

      result.solutions.forEach((s, i) => {
        console.log(`${i + 1}. T: ${s.T} P: ${s.P} C: ${s.C}`);
      });
      io.close();
    },
  );
});
