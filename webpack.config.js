const path = require('path');
const webpack = require('html-webpack-plugin');
module.exports = {
    entry: './index.js',
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
        ],
    },
    plugins: [
        new webpack({
            template: './index.html',
        }),
    ],
};