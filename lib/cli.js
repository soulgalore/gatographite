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
		maxResults: process.env.GA_MAX_RESULTS || 1000,
		graphiteHost: process.env.GRAPHITE_HOST,
		graphitePort: process.env.GRAPHITE_PORT || 2003,
		graphiteNameSpace: process.env.GRAPHITE_NAMESPACE || 'google.analytics',
		debug: false
	}
});

if (conf.help) {
	console.log('Get metrics from Google Analytics and send them to Graphite');
	console.log('Setup your PEM: http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/');
	console.log('And choose values: https://developers.google.com/analytics/devguides/reporting/core/dimsmets')
	console.log('Configuration:');
	console.log('--viewId <ID> - the Google Analytics View ID');
	console.log('--email <EMAIL> - the email address for the Google Analytics user');
	console.log('--pemPath <PATH> - the full path to your PEM file');
	console.log('--metrics <LIST> - the metrics to fetch from GA. Example: ga:pageviews,ga:sessions,ga:avgTimeOnSite');
	console.log('--useMinutes <BOOLEAN> - fetch metrics gropued by hour or minute');
	console.log('--maxResults <INTEGER> - max results from the Google API');
	console.log('--graphiteHost <HOST> - the host of your Graphite instance');
	console.log('--graphitePort <INTEGER> - the Graphite port');
	console.log('--graphiteNameSpace <STRING> - the start part of the Graphite key');
	console.log('--debug - show extra debug info in the console ');
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
