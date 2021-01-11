const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client') + '/index.tsx',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: "tsconfig.client.json"
                }
            }],
            exclude: ['/node_modules/', '/server']
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client', 'dist'),
    }
};