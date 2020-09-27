(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var ini_get = function ini_get(varname) {
	  // eslint-disable-line camelcase
	  //  discuss at: https://locutus.io/php/ini_get/
	  // original by: Brett Zamir (https://brett-zamir.me)
	  //      note 1: The ini values must be set by ini_set or manually within an ini file
	  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
	  //   example 1: ini_get('date.timezone')
	  //   returns 1: 'Asia/Hong_Kong'

	  var $global = typeof window !== 'undefined' ? window : commonjsGlobal;
	  $global.$locutus = $global.$locutus || {};
	  var $locutus = $global.$locutus;
	  $locutus.php = $locutus.php || {};
	  $locutus.php.ini = $locutus.php.ini || {};

	  if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
	    if ($locutus.php.ini[varname].local_value === null) {
	      return '';
	    }
	    return $locutus.php.ini[varname].local_value;
	  }

	  return '';
	};

	var parse_url = function parse_url(str, component) {
	  // eslint-disable-line camelcase
	  //       discuss at: https://locutus.io/php/parse_url/
	  //      original by: Steven Levithan (https://blog.stevenlevithan.com)
	  // reimplemented by: Brett Zamir (https://brett-zamir.me)
	  //         input by: Lorenzo Pisani
	  //         input by: Tony
	  //      improved by: Brett Zamir (https://brett-zamir.me)
	  //           note 1: original by https://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
	  //           note 1: blog post at https://blog.stevenlevithan.com/archives/parseuri
	  //           note 1: demo at https://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
	  //           note 1: Does not replace invalid characters with '_' as in PHP,
	  //           note 1: nor does it return false with
	  //           note 1: a seriously malformed URL.
	  //           note 1: Besides function name, is essentially the same as parseUri as
	  //           note 1: well as our allowing
	  //           note 1: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
	  //        example 1: parse_url('https://user:pass@host/path?a=v#a')
	  //        returns 1: {scheme: 'https', host: 'host', user: 'user', pass: 'pass', path: '/path', query: 'a=v', fragment: 'a'}
	  //        example 2: parse_url('https://en.wikipedia.org/wiki/%22@%22_%28album%29')
	  //        returns 2: {scheme: 'https', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}
	  //        example 3: parse_url('https://host.domain.tld/a@b.c/folder')
	  //        returns 3: {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}
	  //        example 4: parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar')
	  //        returns 4: { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }

	  var query;

	  var mode = (typeof commonjsRequire !== 'undefined' ? ini_get('locutus.parse_url.mode') : undefined) || 'php';

	  var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'];

	  // For loose we added one optional slash to post-scheme to catch file:/// (should restrict this)
	  var parser = {
	    php: new RegExp(['(?:([^:\\/?#]+):)?', '(?:\\/\\/()(?:(?:()(?:([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?', '()', '(?:(()(?:(?:[^?#\\/]*\\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)'].join('')),
	    strict: new RegExp(['(?:([^:\\/?#]+):)?', '(?:\\/\\/((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?', '((((?:[^?#\\/]*\\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)'].join('')),
	    loose: new RegExp(['(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?', '(?:\\/\\/\\/?)?', '((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)', '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))', '(?:\\?([^#]*))?(?:#(.*))?)'].join(''))
	  };

	  var m = parser[mode].exec(str);
	  var uri = {};
	  var i = 14;

	  while (i--) {
	    if (m[i]) {
	      uri[key[i]] = m[i];
	    }
	  }

	  if (component) {
	    return uri[component.replace('PHP_URL_', '').toLowerCase()];
	  }

	  if (mode !== 'php') {
	    var name = (typeof commonjsRequire !== 'undefined' ? ini_get('locutus.parse_url.queryKey') : undefined) || 'queryKey';
	    parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
	    uri[name] = {};
	    query = uri[key[12]] || '';
	    query.replace(parser, function ($0, $1, $2) {
	      if ($1) {
	        uri[name][$1] = $2;
	      }
	    });
	  }

	  delete uri.source;
	  return uri;
	};

	var parse_str = function parse_str(str, array) {
	  // eslint-disable-line camelcase
	  //       discuss at: https://locutus.io/php/parse_str/
	  //      original by: Cagri Ekin
	  //      improved by: Michael White (https://getsprink.com)
	  //      improved by: Jack
	  //      improved by: Brett Zamir (https://brett-zamir.me)
	  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
	  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
	  //      bugfixed by: stag019
	  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
	  //      bugfixed by: MIO_KODUKI (https://mio-koduki.blogspot.com/)
	  // reimplemented by: stag019
	  //         input by: Dreamer
	  //         input by: Zaide (https://zaidesthings.com/)
	  //         input by: David Pesta (https://davidpesta.com/)
	  //         input by: jeicquest
	  //      bugfixed by: Rafał Kukawski
	  //           note 1: When no argument is specified, will put variables in global scope.
	  //           note 1: When a particular argument has been passed, and the
	  //           note 1: returned value is different parse_str of PHP.
	  //           note 1: For example, a=b=c&d====c
	  //        example 1: var $arr = {}
	  //        example 1: parse_str('first=foo&second=bar', $arr)
	  //        example 1: var $result = $arr
	  //        returns 1: { first: 'foo', second: 'bar' }
	  //        example 2: var $arr = {}
	  //        example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', $arr)
	  //        example 2: var $result = $arr
	  //        returns 2: { str_a: "Jack and Jill didn't see the well." }
	  //        example 3: var $abc = {3:'a'}
	  //        example 3: parse_str('a[b]["c"]=def&a[q]=t+5', $abc)
	  //        example 3: var $result = $abc
	  //        returns 3: {"3":"a","a":{"b":{"c":"def"},"q":"t 5"}}
	  //        example 4: var $arr = {}
	  //        example 4: parse_str('a[][]=value', $arr)
	  //        example 4: var $result = $arr
	  //        returns 4: {"a":{"0":{"0":"value"}}}
	  //        example 5: var $arr = {}
	  //        example 5: parse_str('a=1&a[]=2', $arr)
	  //        example 5: var $result = $arr
	  //        returns 5: {"a":{"0":"2"}}

	  var strArr = String(str).replace(/^&/, '').replace(/&$/, '').split('&');
	  var sal = strArr.length;
	  var i;
	  var j;
	  var ct;
	  var p;
	  var lastObj;
	  var obj;
	  var chr;
	  var tmp;
	  var key;
	  var value;
	  var postLeftBracketPos;
	  var keys;
	  var keysLen;

	  var _fixStr = function _fixStr(str) {
	    return decodeURIComponent(str.replace(/\+/g, '%20'));
	  };

	  var $global = typeof window !== 'undefined' ? window : commonjsGlobal;
	  $global.$locutus = $global.$locutus || {};
	  var $locutus = $global.$locutus;
	  $locutus.php = $locutus.php || {};

	  if (!array) {
	    array = $global;
	  }

	  for (i = 0; i < sal; i++) {
	    tmp = strArr[i].split('=');
	    key = _fixStr(tmp[0]);
	    value = tmp.length < 2 ? '' : _fixStr(tmp[1]);

	    if (key.includes('__proto__') || key.includes('constructor') || key.includes('prototype')) {
	      break;
	    }

	    while (key.charAt(0) === ' ') {
	      key = key.slice(1);
	    }

	    if (key.indexOf('\x00') > -1) {
	      key = key.slice(0, key.indexOf('\x00'));
	    }

	    if (key && key.charAt(0) !== '[') {
	      keys = [];
	      postLeftBracketPos = 0;

	      for (j = 0; j < key.length; j++) {
	        if (key.charAt(j) === '[' && !postLeftBracketPos) {
	          postLeftBracketPos = j + 1;
	        } else if (key.charAt(j) === ']') {
	          if (postLeftBracketPos) {
	            if (!keys.length) {
	              keys.push(key.slice(0, postLeftBracketPos - 1));
	            }

	            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
	            postLeftBracketPos = 0;

	            if (key.charAt(j + 1) !== '[') {
	              break;
	            }
	          }
	        }
	      }

	      if (!keys.length) {
	        keys = [key];
	      }

	      for (j = 0; j < keys[0].length; j++) {
	        chr = keys[0].charAt(j);

	        if (chr === ' ' || chr === '.' || chr === '[') {
	          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
	        }

	        if (chr === '[') {
	          break;
	        }
	      }

	      obj = array;

	      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
	        key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
	        lastObj = obj;

	        if ((key === '' || key === ' ') && j !== 0) {
	          // Insert new dimension
	          ct = -1;

	          for (p in obj) {
	            if (obj.hasOwnProperty(p)) {
	              if (+p > ct && p.match(/^\d+$/g)) {
	                ct = +p;
	              }
	            }
	          }

	          key = ct + 1;
	        }

	        // if primitive value, replace with object
	        if (Object(obj[key]) !== obj[key]) {
	          obj[key] = {};
	        }

	        obj = obj[key];
	      }

	      lastObj[key] = value;
	    }
	  }
	};

	var rawurlencode = function rawurlencode(str) {
	  //       discuss at: https://locutus.io/php/rawurlencode/
	  //      original by: Brett Zamir (https://brett-zamir.me)
	  //         input by: travc
	  //         input by: Brett Zamir (https://brett-zamir.me)
	  //         input by: Michael Grier
	  //         input by: Ratheous
	  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
	  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
	  //      bugfixed by: Joris
	  // reimplemented by: Brett Zamir (https://brett-zamir.me)
	  // reimplemented by: Brett Zamir (https://brett-zamir.me)
	  //           note 1: This reflects PHP 5.3/6.0+ behavior
	  //           note 1: Please be aware that this function expects \
	  //           note 1: to encode into UTF-8 encoded strings, as found on
	  //           note 1: pages served as UTF-8
	  //        example 1: rawurlencode('Kevin van Zonneveld!')
	  //        returns 1: 'Kevin%20van%20Zonneveld%21'
	  //        example 2: rawurlencode('https://kvz.io/')
	  //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
	  //        example 3: rawurlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
	  //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'

	  str = str + '';

	  // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
	  // but if you want to reflect current
	  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
	  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
	};

	var urlencode = function urlencode(str) {
	  //       discuss at: https://locutus.io/php/urlencode/
	  //      original by: Philip Peterson
	  //      improved by: Kevin van Zonneveld (https://kvz.io)
	  //      improved by: Kevin van Zonneveld (https://kvz.io)
	  //      improved by: Brett Zamir (https://brett-zamir.me)
	  //      improved by: Lars Fischer
	  //      improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
	  //         input by: AJ
	  //         input by: travc
	  //         input by: Brett Zamir (https://brett-zamir.me)
	  //         input by: Ratheous
	  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
	  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
	  //      bugfixed by: Joris
	  // reimplemented by: Brett Zamir (https://brett-zamir.me)
	  // reimplemented by: Brett Zamir (https://brett-zamir.me)
	  //           note 1: This reflects PHP 5.3/6.0+ behavior
	  //           note 1: Please be aware that this function
	  //           note 1: expects to encode into UTF-8 encoded strings, as found on
	  //           note 1: pages served as UTF-8
	  //        example 1: urlencode('Kevin van Zonneveld!')
	  //        returns 1: 'Kevin+van+Zonneveld%21'
	  //        example 2: urlencode('https://kvz.io/')
	  //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
	  //        example 3: urlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
	  //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'

	  str = str + '';

	  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/~/g, '%7E').replace(/%20/g, '+');
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var http_build_query = function http_build_query(formdata, numericPrefix, argSeparator, encType) {
	  // eslint-disable-line camelcase
	  //  discuss at: https://locutus.io/php/http_build_query/
	  // original by: Kevin van Zonneveld (https://kvz.io)
	  // improved by: Legaev Andrey
	  // improved by: Michael White (https://getsprink.com)
	  // improved by: Kevin van Zonneveld (https://kvz.io)
	  // improved by: Brett Zamir (https://brett-zamir.me)
	  //  revised by: stag019
	  //    input by: Dreamer
	  // bugfixed by: Brett Zamir (https://brett-zamir.me)
	  // bugfixed by: MIO_KODUKI (https://mio-koduki.blogspot.com/)
	  // improved by: Will Rowe
	  //      note 1: If the value is null, key and value are skipped in the
	  //      note 1: http_build_query of PHP while in locutus they are not.
	  //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;')
	  //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
	  //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_')
	  //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'
	  //   example 3: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;', 'PHP_QUERY_RFC3986')
	  //   returns 3: 'foo=bar&amp;php=hypertext%20processor&amp;baz=boom&amp;cow=milk'

	  var encodeFunc;

	  switch (encType) {
	    case 'PHP_QUERY_RFC3986':
	      encodeFunc = rawurlencode;
	      break;

	    case 'PHP_QUERY_RFC1738':
	    default:
	      encodeFunc = urlencode;
	      break;
	  }

	  var value;
	  var key;
	  var tmp = [];

	  var _httpBuildQueryHelper = function _httpBuildQueryHelper(key, val, argSeparator) {
	    var k;
	    var tmp = [];
	    if (val === true) {
	      val = '1';
	    } else if (val === false) {
	      val = '0';
	    }
	    if (val !== null) {
	      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	        for (k in val) {
	          if (val[k] !== null) {
	            tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator));
	          }
	        }
	        return tmp.join(argSeparator);
	      } else if (typeof val !== 'function') {
	        return encodeFunc(key) + '=' + encodeFunc(val);
	      } else {
	        throw new Error('There was an error processing for http_build_query().');
	      }
	    } else {
	      return '';
	    }
	  };

	  if (!argSeparator) {
	    argSeparator = '&';
	  }
	  for (key in formdata) {
	    value = formdata[key];
	    if (numericPrefix && !isNaN(key)) {
	      key = String(numericPrefix) + key;
	    }
	    var query = _httpBuildQueryHelper(key, value, argSeparator);
	    if (query !== '') {
	      tmp.push(query);
	    }
	  }

	  return tmp.join(argSeparator);
	};

	var strpos = function strpos(haystack, needle, offset) {
	  //  discuss at: https://locutus.io/php/strpos/
	  // original by: Kevin van Zonneveld (https://kvz.io)
	  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
	  // improved by: Brett Zamir (https://brett-zamir.me)
	  // bugfixed by: Daniel Esteban
	  //   example 1: strpos('Kevin van Zonneveld', 'e', 5)
	  //   returns 1: 14

	  var i = (haystack + '').indexOf(needle, offset || 0);
	  return i === -1 ? false : i;
	};

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

	function add_query_arg(key, value, url) {
	  if (key === void 0) {
	    key = null;
	  }

	  if (value === void 0) {
	    value = null;
	  }

	  if (url === void 0) {
	    url = null;
	  }

	  if (typeof key === 'object' && null === value) {
	    url = window.location.href;
	  } else if (typeof key === 'object' && null !== value) {
	    url = value;
	    value = null;
	  } else if (null === url) {
	    url = window.location.href;
	  }

	  if (false === url || '' === url || undefined === url) {
	    url = window.location.href;
	  }

	  var $parsed = parse_url(url),
	      $query = {},
	      $fragment = $parsed.fragment ? '#' + $parsed.fragment : '';

	  if (typeof $parsed.query !== 'undefined') {
	    parse_str($parsed.query, $query);
	  }

	  if (typeof key === 'object') {
	    for (var k in key) {
	      if (key[k]) {
	        $query[k] = key[k];
	      }
	    }
	  } else {
	    $query[key] = value;
	  }

	  var split_url = null,
	      base_url = url;

	  if (false !== strpos(url, '?')) {
	    split_url = url.split('?');
	    base_url = split_url[0] || url;
	  } else if (false !== strpos(url, '#')) {
	    split_url = url.split('#');
	    base_url = split_url[0] || url;
	  }

	  for (var _k in $query) {
	    if (false === $query[_k]) {
	      delete $query[_k];
	    }
	  }

	  $query = http_build_query($query, null, '&');
	  $query = $query !== '' ? '?' + $query : $query;
	  return base_url + $query + $fragment;
	}

	/**
	 * Removes an item or items from a query string.
	 * @param key
	 * @param url
	 * @returns {*}
	 */

	function remove_query_arg(key, url) {
	  if (key === void 0) {
	    key = null;
	  }

	  if (url === void 0) {
	    url = null;
	  }

	  if (typeof key !== 'object') {
	    key = [key];
	  }

	  for (var i in key) {
	    if (key[i]) {
	      url = add_query_arg(key[i], false, url);
	    }
	  }

	  return url;
	}

	var rtrim = function rtrim(str, charlist) {
	  //  discuss at: https://locutus.io/php/rtrim/
	  // original by: Kevin van Zonneveld (https://kvz.io)
	  //    input by: Erkekjetter
	  //    input by: rem
	  // improved by: Kevin van Zonneveld (https://kvz.io)
	  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
	  // bugfixed by: Brett Zamir (https://brett-zamir.me)
	  //   example 1: rtrim('    Kevin van Zonneveld    ')
	  //   returns 1: '    Kevin van Zonneveld'

	  charlist = !charlist ? ' \\s\xA0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1');

	  var re = new RegExp('[' + charlist + ']+$', 'g');

	  return (str + '').replace(re, '');
	};

	/**
	 * Removes trailing forward slashes and backslashes if they exist.
	 *
	 * The primary use of this is for paths and thus should be used for paths. It is
	 * not restricted to paths and offers no specific path support.
	 * @param $string
	 * @returns {*}
	 */

	function untrailingslashit($string) {
	  return rtrim($string, '/\\');
	}

	function trailingslashit($string) {
	  return untrailingslashit($string) + '/\\';
	}

	/**
	 * Appends Function Globally.
	 */

	window.add_query_arg = add_query_arg;
	window.remove_query_arg = remove_query_arg;
	window.untrailingslashit = untrailingslashit;
	window.trailingslashit = trailingslashit;

}());
