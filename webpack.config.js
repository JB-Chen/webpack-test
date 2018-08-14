var website = {
    publicPath:"http://localhost:1717/"
};
// 打包html文件
const htmlPlugin =  require('html-webpack-plugin');
// css从js中抽离的插件
const extractTextPlugin = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
const path = require('path');
const config = {
    // 开发模式
    mode:'development',
    // 入口模式
    entry:{
        // entry:'./src/assets/js/index.js',
        entry:'./src/assets/js/main.js'
    },
    // 出口模式
    output:{
        // 打包路径
        path:path.resolve(__dirname,'dist'),
        // 打包名称  md5格式，防止缓存造成的影响
        filename:'[name].[hash:5].js',
        publicPath:website.publicPath
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
               use:extractTextPlugin.extract({
                use:[
                    //   {
                    //     loader:"style-loader" //创建style样式
                    //   },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader: 'sass-loader' //less-loader插件，将less转成css
                    }],
                    // 分离出less
                    fallback:'style-loader'
               })
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                query:{
                    'presets':['es2015','stage-0'],
                    'plugins':['transform-runtime']
                }

            }
        ]
    },
    // 插件
    plugins:[
        //  压缩js的插件
        new uglify(),
        //  打包html的插件
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        // css分离插件
        new extractTextPlugin("/css/index.css")
    ],
     //开发服务器
     devServer:{
        //  1,npm install webpack-dev-server --save-dev 进行npm安装
        //  2,webpack4.x 中 webpack-cli被隔离，所以要进行webpack-cli安装
        //     npm install webpack-cli -D
        //  3，webpack-dev-server 测试
        //  4，运行服务器 npm run server
        //  设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        // 服务器的ip地址,可以用ip也可以用localhost
        host:'localhost',
        // 服务器端压缩是否开启
        compress:true,
        // 配置服务端口号
        port:1717
     }

}


module.exports = config;