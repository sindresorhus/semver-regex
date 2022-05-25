import test from 'ava';
import semverRegex from './index.js';
import semver from 'semver';

const fixtures = [
	'0.0.0',
	'0.10.0',
	'v1.0.0',
	'0.0.0-foo',
	'0.0.0-foo-bar-baz',
	'1.2.3-4',
	'2.7.2+asdf',
	'1.2.3-a.b.c.10.d.5',
	'2.7.2-foo+bar',
	'1.2.3-alpha.10.beta',
	'1.2.3-alpha.10.beta+build.unicorn.rainbow',
	'99999.99999.99999'
];

test('matches semver versions on test', t => {
	for (const fixture of fixtures) {
		t.regex(fixture, semverRegex());
		t.true(semver.valid(fixture) !== null);

		if (!fixture.startsWith('v')) { // Should we trim v prefix?
			t.deepEqual(fixture.match(semverRegex()), [fixture]);
		}
	}

	t.notRegex('0.88', semverRegex());
	t.notRegex('1.0.08', semverRegex());
	t.notRegex('1.08.0', semverRegex());
	t.notRegex('01.8.0', semverRegex());
});

test('returns semver on match', t => {
	t.deepEqual('0.0.0'.match(semverRegex()), ['0.0.0']);
	t.deepEqual('1.2.3-alpha.10.beta'.match(semverRegex()), ['1.2.3-alpha.10.beta']);
	t.deepEqual('1.2.3-alpha.10.beta'.match(semverRegex()), ['1.2.3-alpha.10.beta']);
	t.deepEqual('0.0.0-foo-bar alpha.beta.1 1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788 1.2.3-4'.match(semverRegex()), ['0.0.0-foo-bar', '1.2.3-4']);
});

test('#7, does not return tag prefix', t => {
	t.deepEqual('v0.0.0'.match(semverRegex()), ['0.0.0']);
});

test('#14, does not match sub-strings of longer semver-similar strings, respect semver@2.0.0 clause 9', t => {
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
		t.notRegex(string, semverRegex());
		t.true(semver.valid(string) === null);
	}
});

test('#18, allow 0 as numeric identifier', t => {
	for (const string of [
		'0.2.3-alpha.10.beta+build.unicorn.rainbow',
		'1.0.3-alpha.10.beta+build.unicorn.rainbow',
		'1.2.0-alpha.10.beta+build.unicorn.rainbow',
		'1.2.3-0.10.beta+build.unicorn.rainbow',
		'1.2.3-alpha.0.beta+build.unicorn.rainbow',
		'1.2.3-alpha.10.0+build.unicorn.rainbow'
	]) {
		t.regex(string, semverRegex());
		t.true(semver.valid(string) !== null);
	}
});

// If tests take longer than a second, it's stuck on this and we have catatrophic backtracking.
test('invalid version does not cause catatrophic backtracking', t => {
	t.regex(
		'v1.1.3-0aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa$',
		semverRegex()
	);

	const postfix = '.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'.repeat(99999);
	t.regex(
		`v1.1.3-0aa${postfix}$`,
		semverRegex()
	);

	for (let index = 1; index <= 50000; index++) {
		const start = Date.now();
		const fixture = `0.0.0-0${'.-------'.repeat(index)}@`;
		semverRegex().test(fixture);
		const difference = Date.now() - start;
		t.true(difference < 20, `Execution time: ${difference}`);
	}

	for (let index = 1; index <= 20; index++) {
		const start = Date.now();
		const fixture = `0.0.1-${'-.--'.repeat(index)} `;
		semverRegex().test(fixture);
		const difference = Date.now() - start;
		t.true(difference < 20, `Execution time: ${difference}`);
	}
});
