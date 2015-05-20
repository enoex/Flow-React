module.exports = {
    entry: "./static/js/main.js",
    output: {
        path: __dirname + '/static/build/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx-loader" }
        ]
    }
};
