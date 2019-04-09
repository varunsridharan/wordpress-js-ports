# WordPress JS Ports
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

This Repository Contain's usefull WordPress URL PHP functions which are ported into Javascript to with minimal Dependency

## Install
You Can install via NPM using below cmd

###### `npm install wordpress-js-ports` OR `npm install wordpress-js-ports --save-dev`

#### Manual
```html
<script src="wordpress-js-ports.js" type="text/javascript"/>
```

## Ported Functions
1. [`add_query_arg`](#add_query_arg)
2. [`remove_query_arg`](#remove_query_arg)
2. [`trailingslashit`](#trailingslashit)
2. [`untrailingslashit`](#untrailingslashit)

---

### `add_query_arg`
Retrieves a modified URL query string.
You can rebuild the URL and append query variables to the URL query by using this function.
There are two ways to use this function; either a single key and value, or an associative array.

**Using a single key and value:**
```javascript
add_query_arg( 'key', 'value', 'http://example.com' );
// Output : http://example.com?key=value
```

**Using an associative array:**
```javascript
add_query_arg( {
    'key1' : 'value1',
    'key2' : 'value2',
}, 'http://example.com' );
// Output : http://example.com?key1=value1&key2=value2
```

Omitting the URL from either use results in the current URL being used (the value of `window.location.href`).

### `remove_query_arg`
Removes an item or items from a query string.

**Using Single Key To Remove**
```javascript
add_query_arg( 'key1', 'http://example.com?key1=value1&key2=value2' );
//Output : http://example.com?key2=value2
```
**Using An Array of Keys To Remove**
```javascript
add_query_arg( ['key1','key2'], 'http://example.com?key1=value1&key2=value2' );
//Output : http://example.com
```

### `trailingslashit`
Appends a trailing slash.

Will remove trailing slash if it exists already before adding a trailing slash. This prevents double slashing a string or path.

The primary use of this is for paths and thus should be used for paths. It is not restricted to paths and offers no specific path support.
 
```javascript
trailingslashit( '/home/julien/bin/dotfiles' ); 
//Output : /home/julien/bin/dotfiles/
```
### `untrailingslashit`
Removes trailing slash if it exists.

The primary use of this is for paths and thus should be used for paths. It is not restricted to paths and offers no specific path support. 
```javascript
untrailingslashit( '/home/julien/bin/dotfiles/' ); 
//Output : /home/julien/bin/dotfiles
```
---

## Contribute
If you would like to help, please take a look at the list of
[issues][issues] or the [To Do](#-todo) checklist.

## License
This project is licensed under **General Public License v3.0 license**. See the [LICENSE](LICENSE) file for more info.

## Copyright
2017 - 2018 Varun Sridharan, [varunsridharan.in][website]

If you find it useful, let me know :wink:

You can contact me on [Twitter][twitter] or through my [email][email].

## Backed By
| [![DigitalOcean][do-image]][do-ref] | [![JetBrains][jb-image]][jb-ref] |  [![Tidio Chat][tidio-image]][tidio-ref] |
| --- | --- | --- |

[twitter]: https://twitter.com/varunsridharan2
[email]: mailto:varunsridharan23@gmail.com
[website]: https://varunsridharan.in
[issues]: issues/

[do-image]: https://vsp.ams3.cdn.digitaloceanspaces.com/cdn/DO_Logo_Horizontal_Blue-small.png
[jb-image]: https://vsp.ams3.cdn.digitaloceanspaces.com/cdn/phpstorm-small.png?v3
[tidio-image]: https://vsp.ams3.cdn.digitaloceanspaces.com/cdn/tidiochat-small.png
[do-ref]: https://s.svarun.in/Ef
[jb-ref]: https://www.jetbrains.com
[tidio-ref]: https://tidiochat.com
[downloads-image]: http://img.shields.io/npm/dm/js-parse-args.svg
[npm-url]: https://www.npmjs.com/package/js-parse-args
[npm-image]: http://img.shields.io/npm/v/js-parse-args.svg