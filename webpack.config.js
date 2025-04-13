const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".html"],
  },
};

const componentConfig = {
  ...commonConfig,
  name: "component",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "CDComponents",
    umdNamedDefine: true,
    globalObject: "this",
  },
  mode: "production",
};

const demoConfig = {
  ...commonConfig,
  name: "demo",
  entry: "./demo/index.ts",
  output: {
    path: path.resolve(__dirname, "demo/dist"),
    filename: "demo.js",
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "demo/dist"),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/index.html",
      filename: "index.html",
    }),
  ],
};

module.exports = [componentConfig, demoConfig];
