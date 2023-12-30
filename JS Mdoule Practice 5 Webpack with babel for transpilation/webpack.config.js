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
  // how to handle files
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            //@babel/preset-env will do the transpilation
            //useBuiltIns config helps us add polifills automatically by default its false
            // when set to usage babel checks which feature you are using and automatically adds polyfill
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },

  //For sourcemaps
  devtool: "cheap-module-eval-source-map",
};
