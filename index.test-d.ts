import {expectType} from 'tsd';
import semverRegex, {SEMVER_REGEX} from './index.js';

expectType<RegExp>(semverRegex());
expectType<RegExp>(SEMVER_REGEX);
