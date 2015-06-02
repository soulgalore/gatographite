/**
 * Send Google Analytics data to Graphite
 * Copyright (c) 2015, Peter Hedenskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
var 	url = require('url');

module.exports = {
  getGraphiteURLKey: function(theUrl) {

    var join = '.';
    var char = '_';

    var myUrl = url.parse(theUrl);
    var protocol = myUrl.protocol.replace(':', '');
    var hostname = myUrl.hostname.split('.').join(char);
    var pathName = myUrl.pathname;

    if (pathName === null || pathName === '' || pathName === '/') {
      pathName = 'slash';
    }

    var replace = ['.', '~', ' ', '/'];
    replace.forEach(function(replaceMe) {
      if (pathName.indexOf(replaceMe) > -1) {
        pathName = pathName.split(replaceMe).join(char);
      }
    });

    return hostname + join + pathName;
  }
};
