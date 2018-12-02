export const add_query_arg = require('./functions/add_query_arg').default;

export const remove_query_arg = require('./functions/remove_query_arg').default;

export const trailingslashit = require('./functions/trailingslashit').default;

export const untrailingslashit = require('./functions/untrailingslashit').default;


/**
 * Appends Function Globally.
 */
export default ( ( window ) => {
	window.add_query_arg     = add_query_arg;
	window.remove_query_arg  = remove_query_arg;
	window.untrailingslashit = untrailingslashit;
	window.trailingslashit   = trailingslashit;
} )( window );
