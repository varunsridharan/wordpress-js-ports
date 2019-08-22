'use strict';
const PLUGIN_NAME = 'gulp-combine-files';
var through       = require( 'through2' ),
	  gutil       = require( 'gulp-util' ),
	  path        = require( 'path' ),
	  fs          = require( 'fs' );

module.exports = function( opt ) {
	if( typeof opt === "undefined" ) {
		opt = {};
	}
	if( typeof opt.append === 'undefined' ) {
		opt.append = 'gulp-append';
	}
	if( typeof opt.prepend === 'undefined' ) {
		opt.prepend = 'gulp-prepend';
	}
	if( typeof opt.inline === 'undefined' ) {
		opt.inline = 'gulp-inline';
	}


	let options        = opt;
	let append_regex   = ( false !== options[ 'append' ] ) ? new RegExp( '(\\/\\/@(?:' + options[ 'append' ] + ')? (.*?)(.*))', 'g' ) : false;
	let prepend_regex  = ( false !== options[ 'prepend' ] ) ? new RegExp( '(\\/\\/@(?:' + options[ 'prepend' ] + ')? (.*?)(.*))', 'g' ) : false;
	let inline         = ( false !== options[ 'inline' ] ) ? new RegExp( '(\\/\\/@(?:' + options[ 'inline' ] + ')? (.*?)(.*))', 'g' ) : false;
	let combine_helper = {
		append: function( file_source, return_file, $abs ) {
			if( false !== append_regex ) {
				var $m;
				var $append = '';
				var $regex  = new RegExp( append_regex );
				while( ( $m = $regex.exec( file_source ) ) !== null ) {
					if( $m.index === $regex.lastIndex ) {
						$regex.lastIndex++;
					}
					if( typeof $m[ 3 ] !== "undefined" ) {
						try {
							var $file_content = fs.readFileSync( $abs + '/' + $m[ 3 ], "utf-8" );
							$file_content     = combine_helper.append( $file_content, $file_content, path.dirname( $abs + '/' + $m[ 3 ] ) );
							$file_content     = combine_helper.inline( $file_content, $file_content, path.dirname( $abs + '/' + $m[ 3 ] ) );
							$file_content     = combine_helper.prepend( $file_content, $file_content, path.dirname( $abs + '/' + $m[ 3 ] ) );
							$append           = $append + $file_content;
							return_file       = return_file.replace( $m[ 1 ], '' );
						} catch( e ) {
							console.log( 'File ' + JSON.stringify( $m ) + ' Not Found' );
						}
					}
				}
				return $append + '\r' + return_file;
			}
			return return_file;
		},
		prepend: function( file_source, return_file, $abs ) {
			if( false !== prepend_regex ) {
				var $m;
				var $prepend = '';
				var $regex   = new RegExp( prepend_regex );
				while( ( $m = $regex.exec( file_source ) ) !== null ) {
					if( $m.index === $regex.lastIndex ) {
						$regex.lastIndex++;
					}
					if( typeof $m[ 3 ] !== "undefined" ) {
						try {
							var $file_content = fs.readFileSync( $abs + '/' + $m[ 3 ], "utf-8" );
							$file_content     = combine_helper.append( $file_content, $file_content, path.dirname( $abs + '/' + $m[ 3 ] ) );
							$file_content     = combine_helper.inline( $file_content, $file_content, path.dirname( $abs + '/' + $m[ 3 ] ) );
							$file_content     = combine_helper.prepend( $file_content, $file_content, path.dirname( $abs + '/' + $m[ 3 ] ) );
							$prepend          = $prepend + $file_content;
							return_file       = return_file.replace( $m[ 1 ], '' );
						} catch( e ) {
							console.log( 'File ' + JSON.stringify( $m ) + ' Not Found' );
						}
					}
				}
				return return_file + $prepend;
			}
			return return_file;
		},
		inline: function( file_source, return_file, $abs ) {
			if( false !== inline ) {
				var m;
				var $regex = new RegExp( inline );
				while( ( m = $regex.exec( file_source ) ) !== null ) {
					if( typeof m[ 3 ] !== "undefined" ) {
						try {
							var $file_content = fs.readFileSync( $abs + '/' + m[ 3 ], "utf-8" );
							$file_content     = combine_helper.append( $file_content, $file_content, path.dirname( $abs + '/' + m[ 3 ] ) );
							$file_content     = combine_helper.inline( $file_content, $file_content, path.dirname( $abs + '/' + m[ 3 ] ) );
							$file_content     = combine_helper.prepend( $file_content, $file_content, path.dirname( $abs + '/' + m[ 3 ] ) );
							return_file       = return_file.replace( m[ 1 ], $file_content );
						} catch( e ) {
							console.log( 'File ' + m[ 3 ] + '  | "' + m[ 0 ] + '" Not Found' );
						}
					}
				}
			}
			return return_file;
		},
		array_filter: function( arr, func ) {
			var retObj = {},
				k;
			func       = func || function( v ) {
				return v;
			};

			if( Object.prototype.toString.call( arr ) === '[object Array]' ) {
				retObj = [];
			}

			for( k in arr ) {
				if( func( arr[ k ] ) ) {
					retObj[ k ] = arr[ k ];
				}
			}

			return retObj;
		},
		filter_help: function( el ) {
			return ( el.length !== 0 );
		}
	};

	return through.obj( function( file, enc, callback ) {
		let $data       = new String( file.contents ),
			return_file = $data,
			$abs        = path.dirname( file.path );
		return_file     = combine_helper.inline( $data, return_file, $abs );
		return_file     = combine_helper.append( $data, return_file, $abs );
		return_file     = combine_helper.prepend( $data, return_file, $abs );
		file.contents   = new Buffer( return_file );
		callback( null, file );
	} );
};