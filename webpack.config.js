const fs = require('fs');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

function generateHTMLWebpackPluginArrayForAllPages() {
    const folderPath = path.join(__dirname, './src/pages');
    const files = fs.readdirSync(folderPath);
    return files.map(file => new HtmlPlugin({
        template: `./src/pages/${file}`,
        filename: file,
        chunks: ['main'],
        inject: true
    }));
}

const customHTMLWebpackPluginArray = generateHTMLWebpackPluginArrayForAllPages();

module.exports = {
    entry: {main: './src/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|json)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[hash][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name]-[hash][ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src',
                            },
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './assets/style.css'
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/images/animation", to: "images/animation" },
            ],
        }),
        ...customHTMLWebpackPluginArray
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 3000
    },
};
