const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: "3000",
    static: ["./public"],
    open: true,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
  },
});
