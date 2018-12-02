import untrailingslashit from './untrailingslashit';

export default function( $string ) {
	return untrailingslashit( $string ) + '/\\';
}