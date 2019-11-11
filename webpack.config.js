const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: true,

  devServer: {
    contentBase: `${__dirname}/dist`,
    port: 9000,
    historyApiFallback: {
      index: "/"
    }
  },

  entry: {
    main: `${__dirname}/src/tests/main.ts`
  },

  output: {
    filename: `[name].bundle.js`,
    path: `${__dirname}/dist`
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.template.html`
    })
  ],

  resolve: {
    extensions: [".js", ".ts", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|json)$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  }
};
