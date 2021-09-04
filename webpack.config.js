const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',

  // qual o primeiro script que será executado no projeto
  entry: './src/main/main.tsx',

  // aonde a gente vai gerar o bundle
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },

  // extenções que serão suportadas
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          // entender as classes do css pelo react
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './images/'
          }
        }
      ]
    }]
  },
  devServer: {
    // file que o server irá servir
    contentBase: './public',

    // constroi os arquivos no disco (false cria os arquivos em memória)
    writeToDisk: true,

    //
    historyApiFallback: true
  },

  // não incluir no bundle
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [
    new CleanWebpackPlugin()
  ]
}
