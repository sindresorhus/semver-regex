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
	'1.2.3-alpha.10.beta',
	'1.2.3-alpha.10.beta+build.unicorn.rainbow',
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

// See #7
test.failing('does not return tag prefix', t => {
	t.deepEqual('v0.0.0'.match(m()), ['0.0.0']);
});

test('#14, does not match substrings of longer semver-similar strings, respect semver2.0.0 clause 9', t => {
	const invalidStrings = [
		'1',
		'1.2',
		'1.2.3-0123',
		'1.2.3-0123.0123',
		'1.1.2+.123',
		'+invalid',
		'-invalid',
		'-invalid+invalid',
		'-invalid.01',
		'alpha',
		'alpha.beta',
		'alpha.beta.1',
		'alpha.1',
		'alpha+beta',
		'alpha_beta',
		'alpha.',
		'alpha..',
		'beta',
		'1.0.0-alpha_beta',
		'-alpha.',
		'1.0.0-alpha..',
		'1.0.0-alpha..1',
		'1.0.0-alpha...1',
		'1.0.0-alpha....1',
		'1.0.0-alpha.....1',
		'1.0.0-alpha......1',
		'1.0.0-alpha.......1',
		'01.1.1',
		'1.01.1',
		'1.1.01',
		'1.2',
		'1.2.3.DEV',
		'1.2-SNAPSHOT',
		'1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788',
		'1.2-RC-SNAPSHOT',
		'-1.0.3-gamma+b7718',
		'+justmeta',
		'9.8.7+meta+meta',
		'9.8.7-whatever+meta+meta',
		'99999999999999999999999.999999999999999999.99999999999999999----RC-SNAPSHOT.12.09.1--------------------------------..12'
	];

	for (const string of invalidStrings) {
		t.notRegex(string, m());
	}
});
