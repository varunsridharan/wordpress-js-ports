# gulp-combine-files

> This plugin will allow you to combine multiple JS files using (@gulp-append / @gulp-prepend / @gulp-inline)

## Getting Started
This plugin requires Gulp `~0.4.5`

If you haven't used [Gulp](http://gulpjs.com/) Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-combine-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gulpfile with this line of JavaScript:

```js
var combine_files = require('gulp-combine-files');
```


### Usage

```js
var gulp = require('gulp');
var combine_files = require('gulp-combine-files');

gulp.task('combine:test',function(){
	return gulp.src("path_to_your_script_file")
	.pipe(combine_files({
	    append:'gulp-append',
	    prepend:'gulp-prepend',
	    inline:'gulp-inline',
	})).pipe(gulp.dest('path_to_dist'));
});
```

### Options

#### options.append
Type: `String|Bool`
Default value: `'gulp-append'`

A string value that is used to do something with whatever.

#### options.prepend
Type: `String|false`
Default value: `'gulp-prepend'`

A string value that is used to do something else with whatever else.

#### options.inline
Type: `String|false`
Default value: `'gulp-inline'`

A string value that is used to do something else with whatever else.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).

## Release History
_(Nothing yet)_

## Sponsored By
[![DigitalOcean](https://vsp.ams3.cdn.digitaloceanspaces.com/cdn/DO_Logo_Horizontal_Blue.png)](https://s.svarun.in/Ef)