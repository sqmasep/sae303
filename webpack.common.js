const path = require("path");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },

  target: "web",

  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".styl"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /.(wav|mp3|mp4)/,
        use: "file-loader",
      },
    ],
  },
};
