'use strict';
var assert = require('assert');
var semverRegex = require('./');

var fixture = [
	'0.0.0',
	'0.10.0',
	'v1.0.0',
	'0.0.0-foo',
	'1.2.3-4',
	'2.7.2+asdf',
	'1.2.3-a.b.c.10.d.5',
	'2.7.2-foo+bar',
	'1.2.3-alpha.10.beta.0',
	'1.2.3-alpha.10.beta.0+build.unicorn.rainbow',
	'foo 0.0.0 bar 0.0.0'
];

it('should match semver versions on test', function () {
	fixture.forEach(function (el) {
		assert(semverRegex().test(el), el);
	});

	assert(!semverRegex().test('0.88'));
	assert(!semverRegex().test('1.0.08'));
	assert(!semverRegex().test('1.08.0'));
	assert(!semverRegex().test('01.8.0'));
});

it('should return semver on match', function () {
	assert.deepEqual('0.0.0'.match(semverRegex()), ['0.0.0']);
	assert.deepEqual('foo 0.0.0 bar 0.1.1'.match(semverRegex()), ['0.0.0', '0.1.1']);
});

// See: https://github.com/sindresorhus/semver-regex/issues/7
it.skip('should not return tag prefix', function () {
	assert.deepEqual('v0.0.0'.match(semverRegex()), ['0.0.0'])
});
