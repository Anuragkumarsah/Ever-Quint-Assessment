const readline = require("readline");

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

io.question("Enter time units (n): ", function (input) {
  let n = parseInt(input);

  let calculator = new MaxProfitCalculator(n);

  let result = calculator.solveMemo(0);

  console.log("Maximum Earnings: $" + result);

  io.close();
});
