import test from 'ava';
import m from '.';

const fixture = [
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

test('matches semver versions on test', t => {
	for (const el of fixture) {
		t.regex(el, m());
	}

	t.notRegex('0.88', m());
	t.notRegex('1.0.08', m());
	t.notRegex('1.08.0', m());
	t.notRegex('01.8.0', m());
});

test('returns semver on match', t => {
	t.deepEqual('0.0.0'.match(m()), ['0.0.0']);
	t.deepEqual('foo 0.0.0 bar 0.1.1'.match(m()), ['0.0.0', '0.1.1']);
});

// See: https://github.com/sindresorhus/semver-regex/issues/7
test.failing('doesn not return tag prefix', t => {
	t.deepEqual('v0.0.0'.match(m()), ['0.0.0']);
});
