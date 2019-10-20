const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        reports: './get_allreports'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        // chunkFilename: "[id].bundle.js"
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false
                },
            })
        ],
    }
    // externals: { './config': 'require("./config")' },
};