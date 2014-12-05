'use strict';

var semverString = "\\bv?(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)(?:-[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?(?:\\+[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?\\b";

var regex = function(){
    return new RegExp(semverString, "ig");
}

regex.toString = function (){
    return semverString;
}

module.exports = regex
