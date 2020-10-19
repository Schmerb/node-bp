// const path = require('path');
// const webpack = require('webpack');

// // console.log({ webpack });

// module.exports = {
//   entry: './server.js',
//   output: {
//     path: path.resolve(__dirname, 'public/js'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         // exclude: /node_modules/,
//         exclude: [path.resolve(__dirname, 'node_modules'), /node_modules/],
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//           },
//         },
//       },
//     ],
//   },
// };

// module.exports = {
//   entry: './src/server.js',
//   output: {
//     path: path.resolve(__dirname, 'public/js/'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['@babel/preset-env'],
//         },
//       },
//     ],
//   },
// };

// module.exports = {
//   entry: ['./server.js'],
//   output: {
//     path: __dirname,
//     filename: 'public/bundle.js',
//   },
//   module: {
//     rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }],
//   },
// };
