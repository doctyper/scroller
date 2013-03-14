The template engine is based on [Hogan.js](http://twitter.github.com/hogan.js/)/Mustache with a few modifications:

- No support for automatic parent lookup of locally unavailable keys.
- No support to lambdas in data to dynamically process data.
- No support for triple `{{{xxx}}}` unescaped values. Use `{{&xxx}}` instead.
- No support for dynamic template controllable delimiters using `{{=delim}}`.
- Added support for basic non looping conditionals `{{?xxx}}`.

See also:

- [Mustache Manpage](http://mustache.github.com/mustache.5.html)
- [Mustache Spec](https://github.com/mustache/spec)