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

## 📝 Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[Checkout CHANGELOG.md](/CHANGELOG.md)

## 🤝 Contributing
If you would like to help, please take a look at the list of [issues](issues/).

## 💰 Sponsor
[I][twitter] fell in love with open-source in 2013 and there has been no looking back since! You can read more about me [here][website].
If you, or your company, use any of my projects or like what I’m doing, kindly consider backing me. I'm in this for the long run.

- ☕ How about we get to know each other over coffee? Buy me a cup for just [**$9.99**][buymeacoffee]
- ☕️☕️ How about buying me just 2 cups of coffee each month? You can do that for as little as [**$9.99**][buymeacoffee]
- 🔰         We love bettering open-source projects. Support 1-hour of open-source maintenance for [**$24.99 one-time?**][paypal]
- 🚀         Love open-source tools? Me too! How about supporting one hour of open-source development for just [**$49.99 one-time ?**][paypal]

## 📜  License & Conduct
- [**General Public License v3.0 license**](LICENSE) © [Varun Sridharan](website)
- [Code of Conduct](code-of-conduct.md)

## 📣 Feedback
- ⭐ This repository if this project helped you! :wink:
- Create An [🔧 Issue](issues/) if you need help / found a bug

## Connect & Say 👋
- **Follow** me on [👨‍💻 Github][github] and stay updated on free and open-source software
- **Follow** me on [🐦 Twitter][twitter] to get updates on my latest open source projects
- **Message** me on [📠 Telegram][telegram]
- **Follow** my pet on [Instagram][sofythelabrador] for some _dog-tastic_ updates!

---

<p align="center">
<i>Built With ♥ By <a href="https://sva.onl/twitter"  target="_blank" rel="noopener noreferrer">Varun Sridharan</a> 🇮🇳 </i>
</p>

---

<!-- Personl Links -->
[paypal]: https://sva.onl/paypal
[buymeacoffee]: https://sva.onl/buymeacoffee
[sofythelabrador]: https://www.instagram.com/sofythelabrador/
[github]: https://sva.onl/github/
[twitter]: https://sva.onl/twitter/
[telegram]: https://sva.onl/telegram/
[email]: https://sva.onl/email
[website]: https://sva.onl/website/