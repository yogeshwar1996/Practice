const path = require("path");
const cleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

  //Config for entry point of the project from where webpack starts reading the module and analyze the dependencies and starts resolving them.
  entry: "./src/app.js",

  //Config for output which tells save output as ./assets/scripts/app.js
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  // devtool: "cheap-source-map", //(optional)
  plugins: [new cleanPlugin.CleanWebpackPlugin()],
};
