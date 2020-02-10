const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const nodeEnv = (process.env.NODE_ENV || 'development').trim();

const babelLoader = {
	loader: 'babel-loader',

	options: {
		presets: [
			['@babel/preset-env', { targets: 'defaults, IE >= 11' }]
		],

		plugins: [
			'@babel/plugin-transform-runtime'
		]
	}
};

const styleLoader = nodeEnv !== 'production'
	? 'vue-style-loader'
	: MiniCssExtractPlugin.loader;

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		plugins: [
			require('postcss-preset-env')({
				browsers: [
					'defaults, IE >= 11'
				],
				stage: 0
			})
		]
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
		path: path.resolve(__dirname, 'assets'),
		publicPath: '/assets/',
		filename: '[name].bundle.js'
	},

	mode: nodeEnv,

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},

			{
				resourceQuery: /blockType=i18n/,
				type: 'javascript/auto',
				loader: '@kazupon/vue-i18n-loader',
			},

			{
				test: /\.js$/,
				use: babelLoader,
				exclude: file => (
					/node_modules(?!(?:\/|\\)(?:@tryghost|vue-agile))/.test(file) &&
					!/\.vue\.js/.test(file)
				)
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
						use: [
							babelLoader,
							{
								loader: 'vue-svg-loader',
								options: {
									svgo: false
								}
							}
						]
					},

					{
						loader: 'file-loader',
						options: {
							name: 'files/[hash:8].[ext]'
						}
					}
				]
			},

			{
				test: /\.(png|jpe?g|gif|woff2?|otf|ttf|eot)(\?|#.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'files/[hash:8].[ext]'
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${nodeEnv}"`
		}),
		new MiniCssExtractPlugin({filename: '[name].bundle.css'}),
		new VueLoaderPlugin()
	],

	devtool: '#eval-source-map',
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
	module.exports.devtool = '#source-map';
}
