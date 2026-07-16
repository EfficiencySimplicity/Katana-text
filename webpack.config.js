const path = require('path');
const webpack = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // https://webpack.js.org/guides/asset-management/
            // I have no idea about text loader, so it's json now!
            {
                test: /\.(json)$/i,
                use: ['json-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new webpack({
            template: './src/index.html',
        }),
    ],
};