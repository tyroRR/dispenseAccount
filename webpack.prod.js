const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ],
    mode: "production"
});
