import rtrim from 'locutus/php/strings/rtrim';

/**
 * Removes trailing forward slashes and backslashes if they exist.
 *
 * The primary use of this is for paths and thus should be used for paths. It is
 * not restricted to paths and offers no specific path support.
 * @param $string
 * @returns {*}
 */
export default function untrailingslashit( $string ) {
	return rtrim( $string, '/\\' );
}