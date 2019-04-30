import {expectType} from 'tsd';
import semverRegex = require('.');

expectType<RegExp>(semverRegex());
