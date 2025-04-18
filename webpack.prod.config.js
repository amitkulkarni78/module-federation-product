const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require("path");

module.exports = {
    entry: './src/index.tsx',
    mode: 'production',
    devServer: {
        port: 3002,
        historyApiFallback: true
    },
    output: {
        publicPath: "https://d2rlgquuf6ymrx.cloudfront.net/products/",
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.svg']
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
                './store': './src/productsStore.ts',
                './Products': './src/components/products.tsx'
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
                '@reduxjs/toolkit': { singleton: true, eager: true },
                'react-redux': { singleton: true, eager: true },
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/manifest.json', to: 'manifest.json' }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                PUBLIC_URL: 'https://d2rlgquuf6ymrx.cloudfront.net/products'
            }
        })
    ]
};