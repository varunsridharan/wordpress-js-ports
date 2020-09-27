import untrailingslashit from './untrailingslashit';

export default function trailingslashit( $string ) {
	return untrailingslashit( $string ) + '/\\';
}