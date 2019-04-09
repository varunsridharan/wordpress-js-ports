module.exports = {
	files: {
		'./index.js': {
			webpack: true,
			dist: './',
			watch: [ './functions/*.js' ],
			rename: 'wordpress-js-ports.js',
		}
	}
};
