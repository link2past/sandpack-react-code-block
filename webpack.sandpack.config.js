const path = require("path");

module.exports = {
  entry: "./src/components/ReactCodeBlock/index.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "sandpackBundle.js",
  },
  mode: "production",
  optimization: {
    minimize: true, // Minifies output to reduce size
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react/jsx-runtime": require.resolve("react/jsx-runtime"),
      "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
    },
  },
};
