import {expectType} from 'tsd';
import semverRegexAsDefault, {semverRegex} from './index.js';

expectType<RegExp>(semverRegexAsDefault());
expectType<RegExp>(semverRegex());
