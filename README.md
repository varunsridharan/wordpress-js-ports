# WordPress URL Handler
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

---

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


---
## Sponsored By
[![DigitalOcean](https://vsp.ams3.cdn.digitaloceanspaces.com/cdn/DO_Logo_Horizontal_Blue.png)](https://s.svarun.in/Ef)
