/**
 * Send Google Analytics data to Graphite
 * Copyright (c) 2015, Peter Hedenskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var parseArgs = require('minimist');

var conf = parseArgs(process.argv.slice(2), {
	default: {
		viewId: process.env.GA_VIEW_ID,
		email: process.env.GA_EMAIL,
		pemPath: process.env.GA_PEM_PATH,
		metrics: process.env.GA_METRICS,
		useMinutes: process.env.GA_MINUTES,
		graphiteHost: process.env.GRAPHITE_HOST,
		graphitePort: process.env.GRAPHITE_PORT || 2003,
		graphiteNameSpace: process.env.GRAPHITE_NAMESPACE || 'google.analytics',
		maxResults: process.env.GA_MAX_RESULTS || 1000,
		debug: false
	}
});

if (conf.help) {
	console.log('Help!');
	process.exit(0);
}

var isMissing = false;
Object.keys(conf).forEach(function(key) {
	if (conf[key] === undefined) {
		console.error('Missing configuration for parameter ' + key);
		isMissing = true;
	}

});

if (isMissing) {
	console.log(JSON.stringify(process.env));
	process.exit(1);
}

if (conf.debug) {
	Object.keys(conf).forEach(function(key) {
		console.log(key + ':' + conf[key]);
	});
}

module.exports = conf;
