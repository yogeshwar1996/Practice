console.log("Hello! there");
const fs = require("fs");
fs.writeFile("output.txt", "I am Yogeshwar.", (error) => {
  console.log(error);
});
fs.appendFile("output.txt", "I am an engineer.", (error) => {
  console.log(error);
});

fs.readFile("output.txt", (error, data) => {
  console.log("Error ", error);
  console.log("Data ", data); // This will give buffer data
  console.log("Data ", data.toString()); // We can convert it to string so that we can read it
});
