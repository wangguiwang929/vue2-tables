var path = require("path");

module.exports = {
    entry: './src/lib/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'vue-tables.js'
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include: path.join(__dirname, './src'),
                exclude: path.join(__dirname, './node-modules')
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.join(__dirname, './src'),
                exclude: path.join(__dirname, './node-modules')
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=800&name=../dist/images/[hash:8].[name].[ext]",
                include: path.join(__dirname, './src'),
                exclude: path.join(__dirname, './node-modules')
            }
        ]


    }
}