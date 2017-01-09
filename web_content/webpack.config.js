module.exports = {
  // 这是一个主文件包括其他模块
  entry: ['babel-polyfill', './src/main.js'],
  // 编译的文件路径
  output: {
      //`dist`文件夹
    path: '../public/javascripts',
    publicPath: "/javascripts/",
    // 文件 `build.js` 即 dist/build.js
    filename: 'build.js'
  },
  module: {
    // 一些特定的编译规则
    loaders: [
      {
        // 让webpack去验证文件是否是.js结尾将其转换
        test: /\.js$/,
        // 通过babel转换
        loader: 'babel-loader',
        // 不用转换的node_modules文件夹
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }    
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '/api/codes': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/stylesheets': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/javascripts': {
        target: 'http://localhost:3000',
        secure: false
      },
      'images': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/': {
        target: 'http://localhost:3000',
        secure: false
      }      
    }
  }
}
