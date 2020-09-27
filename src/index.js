import add_query_arg from "./functions/add_query_arg";
import remove_query_arg from "./functions/remove_query_arg";
import trailingslashit from "./functions/trailingslashit";
import untrailingslashit from "./functions/untrailingslashit";

/**
 * Appends Function Globally.
 */
window.add_query_arg     = add_query_arg;
window.remove_query_arg  = remove_query_arg;
window.untrailingslashit = untrailingslashit;
window.trailingslashit   = trailingslashit;