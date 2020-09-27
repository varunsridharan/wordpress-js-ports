import add_query_arg from './add_query_arg';

/**
 * Removes an item or items from a query string.
 * @param key
 * @param url
 * @returns {*}
 */
export default function remove_query_arg( key = null, url = null ) {
	if( typeof key !== 'object' ) {
		key = [ key ];
	}

	for( let i in key ) {
		if( key[ i ] ) {
			url = add_query_arg( key[ i ], false, url );
		}
	}
	return url;
}
