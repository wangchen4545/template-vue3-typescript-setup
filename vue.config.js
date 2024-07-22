const { defineConfig } = require('@vue/cli-service');
const glob = require("glob");
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { projectPath, projectName } = require("./ask.js");
const getEntrys = function (entryPattern) {
	let entrys = {};
	let entry = {};
	glob.sync(entryPattern).forEach((path) => {
		let length = path.split("/").length - 1;
		path = path.split("/")[length - 1];
		entry = {
			entry: "./src/main.ts",
			template: "./public/index.html",
			filename: `${path}/index.html`,
			// chunks: ['chunk-vendors', 'chunk-common', 'index']
		};
		entrys[`${path}`] = entry;
	});
	//根目录下增加一个index.html
	entrys["base"] = {
		entry: "./src/main.ts",
		template: "./public/index.html",
		filename: "index.html",
	};

	return entrys;
};
const entryPattern = "./src/views/**/index.vue";
const isProduction = process.env.NODE_ENV == "production";
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: `${projectPath}`,
	outputDir: `dist/${projectName}`,
	pages: getEntrys(entryPattern),
	productionSourceMap: false,
	devServer: {
		hot: true,
		open: false, // 项目构建成功之后，自动弹出页面
		host: "my.jr.jd.com", // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
		port: 80, // 端口号，默认8080
		https: false, // 协议
	},
	css: {
		extract: true, //是否使用css分离插件 ExtractTextPlugin
		sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `
          @import "./src/css/index.scss";
        `
      }
    }
	},
	chainWebpack: (config) => {
		config.module
			.rule("compile")
			.test(/\.js$/)
			.include.add(path.join(__dirname, "node_modules/swiper/dist"))
			.add(path.join(__dirname, "node_modules/dom7/dist"))
			.end()
			.use("babel")
			.loader("babel-loader")
			.options({
				presets: [["@babel/preset-env", { modules: false }]],
			})
    config.resolve.symlinks(true);
	},
	configureWebpack: {
		optimization: {
			minimizer: [
				// new HtmlWebpackPlugin({
				// 	title: "",
				// 	minify: {
				// 		removeComments: true, // 移除HTML中的注释
				// 		collapseWhitespace: true, // 删除空白符与换行符
				// 		minifyCSS: true, // 压缩内联css
				// 	},
				// }),
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							// warnings: false,
							drop_debugger: isProduction, //去掉debugger和console
							drop_console: isProduction,
						},
						mangle: false,
					},
					sourceMap: false,
					parallel: true,
				}),
			],
		}
	}
});
