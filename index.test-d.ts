import {expectType} from 'tsd';
import semverRegex from './index.js';

expectType<RegExp>(semverRegex());
