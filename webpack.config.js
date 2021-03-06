const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const nodeEnv = (process.env.NODE_ENV || 'development').trim();

const styleLoader = nodeEnv !== 'production'
	? 'vue-style-loader'
	: MiniCssExtractPlugin.loader;

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true
	}
};

const cssLoader = [
	styleLoader,
	{
		loader: 'css-loader',
		options: {
			importLoaders: 1
		}
	},
	postcssLoader
];

const lessLoader = [
	styleLoader,
	{
		loader: 'css-loader',
		options: {
			importLoaders: 2
		}
	},
	postcssLoader,
	'less-loader'
];

module.exports = {
	entry: {
		kaede: path.resolve(__dirname, 'app', 'init.js')
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'assets/[name].bundle.js?v=[contenthash:8]'
	},

	mode: nodeEnv,

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'css': cssLoader,
						'less': lessLoader,
						'js': 'babel-loader'
					}
				}
			},

			{
				resourceQuery: /blockType=i18n/,
				type: 'javascript/auto',
				loader: '@intlify/vue-i18n-loader',
			},

			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/]
			},

			{
				test: /\.less$/,
				use: lessLoader
			},

			{
				test: /\.css$/,
				use: cssLoader
			},

			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /inline/,
						loader: 'vue-svg-loader',
						options: {
							svgo: false
						}
					},

					{
						loader: 'file-loader',
						options: {
							name: 'assets/files/[contenthash:8].[ext]'
						}
					}
				]
			},

			{
				test: /\.(png|jpe?g|gif|woff2?|otf|ttf|eot)((\?|#)*)?$/,
				loader: 'file-loader',
				options: {
					name: 'assets/files/[contenthash:8].[ext]'
				}
			}
		]
	},

	resolve: {
		mainFields: ['browser', 'module', 'style', 'main'],
		extensions: ['.svg', '.vue', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'app')
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'app', 'templates', 'default.hbs.ejs'),
			filename: 'default.hbs',
			inject: false
		}),
		new PreloadWebpackPlugin({
			rel: 'preload',
			include: 'asyncChunks',
			// fileWhitelist: [ /\.(css|js)((\?|#).*)?$/ ]
			fileBlacklist: [ /\.(woff2?|eot|ttf|otf|svg|png|jpe?g|gif|txt|map)((\?|#).*)?$/ ]
		}),
		new CopyWebpackPlugin({
			// Need to copy ghost-specific files

			patterns: [
				{
					from: path.posix.join(
						path.resolve(__dirname, 'app', 'templates').replace(/\\/g, '/'),
						'*.hbs'
					),
					to: '[name][ext]'
				},
				{
					from: path.resolve(__dirname, 'package.json'),
					to: '[name][ext]'
				}
			]
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${nodeEnv}"`
		}),
		new MiniCssExtractPlugin({filename: 'assets/[name].bundle.css?v=[contenthash:8]'}),
		new VueLoaderPlugin()
	],

	devtool: 'eval-source-map',
	devServer: {
		index: '',
		host: '0.0.0.0',
		disableHostCheck: true,
		proxy: {
			context: () => true,
			target: 'http://localhost:2368'
		}
	}
};

if(nodeEnv === 'production') {
	module.exports.devtool = 'source-map';
}
