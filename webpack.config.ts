import * as webpack from "webpack";
import * as path from "path";
import * as fs from "fs";
import * as TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as LicenseBannerPlugin from "license-banner-webpack-plugin";

const config: webpack.Configuration = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".css"],
        plugins: [
            new TsConfigPathsPlugin()
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new LicenseBannerPlugin(),
        new webpack.BannerPlugin(fs.readFileSync('./LICENSE', 'utf8'))
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    devServer: {
        contentBase: "./dist"
    }
};
export default config;
