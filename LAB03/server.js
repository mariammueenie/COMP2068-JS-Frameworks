// LAB03 - Simple Calculator App
// Mariam Mueen - COMP2068

const connect = require("connect");
const url = require("url");

const app = connect();

// Calculator function middleware
function calculate(req, res, next) {
  // Parse the URL and extract query parameters
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Only respond to /lab2 (as instructions say)
  if (path !== "/lab2") {
    res.end("Use the /lab2 route with method, x, and y parameters.");
    return;
  }

  const method = parsedUrl.query.method;
  const x = Number(parsedUrl.query.x);
  const y = Number(parsedUrl.query.y);

  // Validate inputs
  if (!method || isNaN(x) || isNaN(y)) {
    res.end("Error: Please provide method, x, and y. Example: /lab2?method=add&x=5&y=3");
    return;
  }

  let result;
  let operatorSymbol;

  // Determine which operation to perform
  switch (method) {
    case "add":
      result = x + y;
      operatorSymbol = "+";
      break;
    case "subtract":
      result = x - y;
      operatorSymbol = "-";
      break;
    case "multiply":
      result = x * y;
      operatorSymbol = "*";
      break;
    case "divide":
      result = y !== 0 ? x / y : "Error (cannot divide by zero)";
      operatorSymbol = "/";
      break;
    default:
      res.end("Error: Invalid method. Use add, subtract, multiply, or divide.");
      return;
  }

  // Output the result
  res.end(`${x} ${operatorSymbol} ${y} = ${result}`);
}

// Use the middleware
app.use(calculate);

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/lab2");
});
