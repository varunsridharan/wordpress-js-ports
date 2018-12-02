const parse_url        = require( 'locutus/php/url/parse_url' );
const parse_str        = require( 'locutus/php/strings/parse_str' );
const http_build_query = require( 'locutus/php/url/http_build_query' );
const strpos           = require( 'locutus/php/strings/strpos' );

/**
 * Retrieves a modified URL query string.
 *
 * You can rebuild the URL and append query variables to the URL query by using this function.
 * There are two ways to use this function; either a single key and value, or an associative array.
 *
 * Using a single key and value:
 *
 *     add_query_arg( 'key', 'value', 'http://example.com' );
 *
 * Using an associative array:
 *
 *     add_query_arg( array(
 *         'key1' => 'value1',
 *         'key2' => 'value2',
 *     ), 'http://example.com' );
 *
 * Omitting the URL from either use results in the current URL being used
 * (the value of `window.location.href`).
 *
 * Values are expected to be encoded appropriately with urlencode() or rawurlencode().
 *
 * Setting any query variable's value to boolean false removes the key (see remove_query_arg()).
 *
 * Important: The return value of add_query_arg() is not escaped by default. Output should be
 * late-escaped with esc_url() or similar to help prevent vulnerability to cross-site scripting
 * (XSS) attacks.
 *
 * @param key
 * @param value
 * @param url
 * @returns {string}
 */
export default function add_query_arg( key = null, value = null, url = null ) {
	if( typeof key === 'object' && null === value ) {
		url = window.location.href;
	} else if( typeof key === 'object' && null !== value ) {
		url   = value;
		value = null;
	} else if( null === url ) {
		url = window.location.href;
	}

	if( false === url || '' === url || undefined === url ) {
		url = window.location.href;
	}

	let $parsed   = parse_url( url ),
		$query    = {},
		$fragment = ( $parsed.fragment ) ? '#' + $parsed.fragment : '';

	if( typeof $parsed.query !== 'undefined' ) {
		parse_str( $parsed.query, $query );
	}

	if( typeof key === 'object' ) {
		for( let k in key ) {
			if( key[ k ] ) {
				$query[ k ] = key[ k ];
			}
		}
	} else {
		$query[ key ] = value;
	}

	let split_url = null,
		base_url  = url;
	if( false !== strpos( url, '?' ) ) {
		split_url = url.split( '?' );
		base_url  = split_url[ 0 ] || url;
	} else if( false !== strpos( url, '#' ) ) {
		split_url = url.split( '#' );
		base_url  = split_url[ 0 ] || url;
	}

	for( let k in $query ) {
		if( false === $query[ k ] ) {
			delete $query[ k ];
		}
	}

	$query = http_build_query( $query, null, '&' );
	$query = ( $query !== '' ) ? '?' + $query : $query;
	return base_url + $query + $fragment;
}