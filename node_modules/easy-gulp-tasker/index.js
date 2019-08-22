/* global async:true */

/**
 * Functions & Basic Needs.
 * @type {string}
 */
const $easy_gulp_tasker = '1.6';

/**
 * Required Imports.
 */
const { handler }                = require( './handler' );
const $gulp                      = require( 'gulp' );
const { get_config, processarg } = require( './functions' );
const $config                    = get_config();
const fancyLog                   = require( 'fancy-log' );

async function processFiles( array, src = null ) {
	for( let $id in array ) {
		if( array.hasOwnProperty( $id ) ) {
			if( array[ $id ] instanceof Array ) {
				await processFiles( array[ $id ], $id );
			} else {
				let $_src    = ( null === src ) ? $id : src;
				let $handler = new handler( $_src, array[ $id ], $config.config );
				await $handler.init();
			}
		}
	}
}

$gulp.task( 'watch', ( callback ) => {
	async function processData( $id, $config, $global ) {
		let $handler = new handler( $id, $config, $global );
		await $handler.init();
	}

	async function watchArray( array, src = null ) {
		for( let $id in array ) {
			if( array.hasOwnProperty( $id ) ) {
				if( array[ $id ] instanceof Array ) {
					for( let $_c in array[ $id ] ) {
						if( array[ $id ].hasOwnProperty( $_c ) ) {
							let $watch = ( true === array[ $id ][ $_c ].watch ) ? $id : array[ $id ][ $_c ].watch;
							if( typeof $watch !== 'undefined' ) {
								$gulp.watch( $watch, { queue: true }, ( cb ) => {
									processData( $id, array[ $id ][ $_c ], $config.config ).then( () => cb() );
								} );
							}
						}
					}


				} else {
					let $watch = ( true === array[ $id ].watch ) ? $id : array[ $id ].watch;
					if( typeof $watch !== 'undefined' ) {
						$gulp.watch( $watch, { queue: true }, ( cb ) => {
							processData( $id, array[ $id ], $config.config ).then( () => cb() );
						} );
					}
				}
			}
		}
	}

	if( typeof $config.files !== 'undefined' ) {
		watchArray( $config.files ).then( () => {
			callback();
		} );
	}
} );

$gulp.task( 'compile', ( callback ) => {
	if( typeof $config.files !== 'undefined' ) {
		processFiles( $config.files ).then( () => {
			callback();
		} );
	}
} );

$gulp.task( 'single', ( callback ) => {
	let $current = processarg();
	let $_config = $config.files[ $current.file ];

	if( typeof $_config !== 'undefined' ) {
		let $arg              = {};
		$arg[ $current.file ] = $_config;
		processFiles( $arg ).then( () => {
			callback();
		} );
	} else {
		fancyLog.error( $current.file + ' Not Found. Please check if you have passed file path. Eg : gulp single --file "your-file-path" ' );
		callback();
	}
} );