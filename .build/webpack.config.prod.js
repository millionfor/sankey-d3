
'use strict'

const path = require('path')
const webpack = require('webpack')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const { webpackBase, fssConfig } = require('./config')

const genVueLoadOptions = function (option) {
  // vue load config goes here
  const o = {}
  if (!option.bundle) {
    o.extractCSS = true
  }
  return o
}

const genInnerCssLoader = function (option) {
  const cssLoader = {
    loader: 'css-loader'
  }
  if (option.minimize) {
    cssLoader.options = { minimize: true }
  }
  return cssLoader
}

const genCssLoader = function (option) {
  const cssLoader = genInnerCssLoader(option)
  let config = ['style-loader', cssLoader]
  if (!option.bundle) {
    config = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: cssLoader,
      publicPath: './'
    })
  }
  return config
}

const genSassLoader = function (option) {
  const cssLoader = genInnerCssLoader(option)
  let config = [
    'style-loader',
    cssLoader,
    'resolve-url-loader',
    'sass-loader'
  ]
  if (!option.bundle) {
    config = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ cssLoader, 'resolve-url-loader', 'sass-loader'],
      publicPath: './'
    })
  }
  return config
}

const genWebpackCfg = function (filename, library, option) {
  const config = {
    entry: resolve('src/index.js'),
    output: {
      path: resolve('dist'),
      publicPath: '/dist/',
      filename: `${filename}.js`,
      libraryExport: 'default',
      libraryTarget: 'umd',
      library: {
        root: `${library}`,
        commonjs: `${library}`,
        amd: `${library.toLowerCase()}`
      },
      umdNamedDefine: false
    },
    module: {
      rules: [
        { test: /\.scss$/, use: genSassLoader(option) }
        , { test: /\.css$/, use: genCssLoader(option) }
        , { test: /\.vue$/, loader: 'vue-loader', options: genVueLoadOptions(option) }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    ]
  }

  if (!option.bundle) {
    config.plugins.push(new ExtractTextPlugin(`${filename}.css`))
  }

  if (option.minimize) {
    config.plugins.push(
      new UglifyJSPlugin({
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          comments: function (n, c) {
            /*
            IMPORTANT: Please preserve 3rd-party library license info,
            inspired from @allex/amd-build-worker/config/util.js
            */
            var text = c.value, type = c.type
            if (type == 'comment2') {
              return /^!|@preserve|@license|@cc_on|MIT/i.test(text)
            }
          }
        }
      })
    )
  }

  return webpackBase.extend(config)
}

const createOutputList = function (filename, library) {
  const lib = [filename, library, {
    bundle: false,
    minimize: false
  }]
  const minLib = [`${filename}.min`, library, {
    bundle: false,
    minimize: true
  }]
  const bundleLib = [`${filename}.bundle`, library, {
    bundle: true,
    minimize: true
  }]
  return [lib, minLib, bundleLib]
}

const entries = createOutputList(fssConfig.distname, fssConfig.library).map(function (output) {
  return genWebpackCfg.apply(null, output)
})

!function(demo) {
  demo.devtool = 'source-map'
  entries.push(demo)
}(require('./webpack.config.dev'))

module.exports = entries

// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:
