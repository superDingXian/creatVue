const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
function getEntry() {
    let entry = {};
    //读取src目录所有page入口
    glob.sync('src/pages/**/*/index.js')
        .forEach(function (filePath) {
            var name = filePath.match(/\/pages\/(.+)\/index.js/);
            name = name[1];
            entry[name] = './' + filePath;
        });
    return entry;
}
module.exports = {
    //项目入口文件
    entry: getEntry(),
    output: {
        //打包出口路径
        path: path.join(__dirname, "dist"),
        filename: "js/[name].js",
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name][hash:8].[ext]",
                            publicPath: "/image",
                            outputPath: "image"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        //css抽离
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
            filename: 'index.html'
        }),
        //压缩图片
        new ImageminPlugin({
            test: /\.(png|jpg|gif)$/,
            pngquant: {
                quality: "95-100"
            }
        }),
        //清空dist文件,需放最后一个
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".js", ".vue", ".less"]
    },
    devServer: {
        writeToDisk: true
    },
};
