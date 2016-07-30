# semver-regex [![Build Status](https://travis-ci.org/sindresorhus/semver-regex.svg?branch=master)](https://travis-ci.org/sindresorhus/semver-regex)

> Regular expression for matching [semver](https://github.com/npm/node-semver) versions


## Install

```
$ npm install --save semver-regex
```


## Usage

```js
const semverRegex = require('semver-regex');

semverRegex().test('v1.0.0');
//=> true

semverRegex().test('1.2.3-alpha.10.beta.0+build.unicorn.rainbow');
//=> true

semverRegex().exec('unicorn 1.0.0 rainbow')[0];
//=> '1.0.0'

'unicorn 1.0.0 and rainbow 2.1.3'.match(semverRegex());
//=> ['1.0.0', '2.1.3']
```


## Related

- [find-versions](https://github.com/sindresorhus/find-versions) - Find semver versions in a string


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
