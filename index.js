'use strict';
module.exports = function () {
	return /v?\d+\.\d+\.\d+(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?/ig;
};
