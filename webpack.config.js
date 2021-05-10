const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { postcss } = require("autoprefixer");

const isDev = process.env.NODE_ENV === "development";
const config = {
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  mode: "development", // 设置mode
  target: "web",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          "stylus-loader",
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-aaa.[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin(),
  ],
};
if (isDev) {
  // config.devtool = "#cheap-module-eval-source-map",
  (config.devtool = "eval-cheap-module-source-map"),
    (config.devServer = {
      port: "8000",
      host: "0.0.0.0",
      overlay: {
        errors: true,
      },
      hot: true,
      //open:true,
      // historyFallback:{

      // }
    });
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //热更新模块加入 hot才能生效
    new webpack.NoEmitOnErrorsPlugin() //减少信息输出
  );
}

module.exports = config;
