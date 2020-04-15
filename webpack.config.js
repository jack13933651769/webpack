const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//这里只要引入两行代码
//const webpack=require('webpack');
//HtmlWebpackPlugin 是webpackhtml 插件 进行把你编译文件的html
//同时输出到你编译的文件内，html引入的相对于你编译前的路径
//模板里面html不需要在引入 css js 否则多此一举 找不到 报错
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//用于删除/清理构建文件夹的插件
const path = require('path');//引入node 路径模块
module.exports = {
	mode: 'production',//模式
	entry: './static/js/main.js',//入口文件 
	devtool:'eval-source-map',//选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
	//以源码显示
	output: {//出口文件设置
		path: path.resolve(__dirname, 'dist'),//保存到当前 文件夹的 dist
		filename: './static/js/[name].js'//保存文件名字为index.js
	 },
	 module: {
		rules: [
		// 	{
        //         test: /\.(html)$/,
        //         use:[{
        //             loader: 'html-loader',
        //         }]
        // },
			{
                test: /\.(jpg|png)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
						// placeholder 占位符 [name] 源资源模块的名称
                        // [ext] 源资源模块的后缀
                        name: "[name]-[hash].[ext]",
                        //打包后的存放位置
                        outputPath: "./static/img",
                        // 打包后文件的 url
                        publicPath: '../img',
                        // 小于 100 字节转成 base64 格式
                        limit: 1000
                    }
                }]
        },
		{
			test: /\.css$/,
			use: [
			  {
				loader: MiniCssExtractPlugin.loader,
				options: {
				  esModule: true,
				},
			  },
			  {
				loader: "css-loader",
				options: {
					// 启用/禁用 url() 处理
					url: true,
					// 启用/禁用 @import 处理
					import: true,
					// 启用/禁用 Sourcemap
					sourceMap: false
				}
			}
			],
		  },	
		{ 
			test: /\.(js|jsx)$/,
			use: 'babel-loader'//转es5loader
		}
		]
	  },
  plugins: [
	//new webpack.HotModuleReplacementPlugin(),
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
		template: './static/index.html',//输出模板html路径
		filename: "index.html",//模板html输出完文件名称
		title: '啊哈哈哈哈哈哈',//文件的标题 title名称 必须在html模板内进行添加<%= 参数 %>
		favicon:'./static/img/psb.jpg',//
		inject:'body',//body head  插入的script是从头部还是尾部
		meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}//添加meta标签
	}),
    new MiniCssExtractPlugin({
		filename: './static/css/[name].css'//设置到文件
	})
  ],
   resolve: {
	alias: {
		a: path.resolve(__dirname, './static')
	  },
	  extensions: [".js", ".json",".css",".jpg",".png",".html"]
  },
  devServer: {
	// 生成的虚拟目录路径
	contentBase: "./dist",
	// 自动开启浏览器
	open: true,
	// 端口
	port: 8081,
	// http://localhost:8787/api/info
	proxy: {
		'/api': {
			target: 'http://localhost:8787',
			pathRewrite: {
				'^/api': ''
			}
		},
		'/api2': {
			target: 'http://localhost:9999'
		}
	},
	// 开启热更新
	hot: true,
	// // 即使 HMR 不生效，也不去刷新整个页面(选择开启)
	// hotOnly: true,
	// historyApiFallback:true,
	// inline:true,
	// progress:true,

}
}