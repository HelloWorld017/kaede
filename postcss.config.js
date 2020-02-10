module.exports = {
	plugins: [
		require('postcss-preset-env')({
			browsers: [
				'last 4 versions'
			],
			stage: 0
		})
	]
};
