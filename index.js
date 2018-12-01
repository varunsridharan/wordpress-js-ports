import add_query_arg from './functions/add_query_arg';
import remove_query_arg from './functions/remove_query_arg';


/**
 * Appends Function Globally.
 */
export default ( ( window ) => {
	window.add_query_arg    = add_query_arg;
	window.remove_query_arg = remove_query_arg;
} )( window );
