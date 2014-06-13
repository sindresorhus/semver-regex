# semver-regex [![Build Status](https://travis-ci.org/sindresorhus/semver-regex.svg?branch=master)](https://travis-ci.org/sindresorhus/semver-regex)

> Regular expression for matching [semver](https://github.com/isaacs/node-semver) versions


## Install

```sh
$ npm install --save semver-regex
```


## Usage

```js
var semverRegex = require('semver-regex');

semverRegex().test('v1.0.0');
//=> true

semverRegex().test('1.2.3-alpha.10.beta.0+build.unicorn.rainbow');
//=> true

semverRegex().exec('unicorn 1.0.0 rainbow')[0];
//=> 1.0.0
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
