const path = require("path");

module.exports = {
  mode: "development",

  //Config for entry point of the project from where webpack starts reading the module and analyze the dependencies and starts resolving them.
  entry: "./src/app.js",

  //Config for output which tells save output as ./assets/scripts/app.js
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-module-eval-source-map",
};
