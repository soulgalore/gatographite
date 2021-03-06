/**
 * Send Google Analytics data to Graphite
 * Copyright (c) 2015, Peter Hedenskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
var google = require('googleapis'),
	moment = require('moment'),
	util = require('./util'),
	GraphiteSender = require('./graphiteSender');


module.exports = {
	collect: function(conf) {
		var analytics = google.analytics('v3');

		var jwtClient = new google.auth.JWT(
			conf.email,
			conf.pemPath,
			null, ['https://www.googleapis.com/auth/analytics.readonly']
		);

		// setup the dates
		var dateFormat = 'YYYY-MM-DD';
		var endDate = moment().format(dateFormat);
		var startDate;
		var daysBack = 1;
		if (conf._.length === 1) {
			daysBack = conf._[0];
		}
		// default is one day back
		if (isNaN(daysBack)) {
			startDate = daysBack;
			endDate = daysBack;
			console.log('Fetch data from ' + startDate);

		} else {
			startDate = moment().subtract(daysBack, 'days').format(dateFormat);
			endDate = moment().subtract(1, 'days').format(dateFormat);
			console.log('Fetch data from ' + daysBack + ' day(s) back, starting from ' + startDate + ' to ' + endDate);
		}


		jwtClient.authorize(function(err, tokens) {
			if (err) {
				console.error('Couldn\'t authorize. Check your pem file, email and view id:' + err);
				return;
			} else {

				analytics.data.ga.get({
						auth: jwtClient,
						'ids': 'ga:' + conf.viewId,
						'metrics': conf.metrics,
						'start-date': startDate,
						'end-date': endDate,
						'dimensions': 'ga:hostname,ga:pagePath,ga:date,ga:hour' + ((conf.useMinutes === 'true') ? ',ga:minute' : ''),
						'sort': '-ga:pagePath',
						'max-results': conf.maxResults
					}, function(error, response) {
						if (error || response === undefined) {
							console.error('Couldn\'t fetch the data from the Google Analytics API. Is everything setup correctly? ' + error );
							return;
						}

						if (conf.debug) {
							console.log('API response:' + JSON.stringify(response));
						}

						var metrics = [];

						response.columnHeaders.forEach(function(column) {
							if (column.columnType === 'METRIC') {
								metrics.push(column.name.substring(3));
							}
						});

						if (response.rows.length === conf.maxResults) {
							console.log('Ooops we got ' + response.rows.length +
								' rows from Google Analytics the same amount as the max results.');
						}

						var result = getGraphiteData(metrics, response.rows, conf);
						if (conf.debug) {
							console.log('Sending the following data to Graphite:' + result);
						}
						var sender = new GraphiteSender(conf.graphiteHost, conf.graphitePort);
						sender.send(result, function() {
							console.log('Finished sending the metrics to Graphite');
						});
					}

				);
			}
		});
	}
};


function getGraphiteData(metrics, rows, conf) {
	var result = '';
	rows.forEach(function(row) {
		// the two first columns : domain and path
		var fullPath = row[0] + row[1];
		var time;
		var metricsArray;

		if (conf.useMinutes === 'true') {
			time = row[2] + ' ' + row[3] + ':' + row[4] + ':00';
			metricsArray = row.splice(5, row.length);
		} else {
			time = row[2] + ' ' + row[3] + ':00:00';
			metricsArray = row.splice(4, row.length);
		}

		var secondsSinceEpoch = (moment(time, 'YYYYMMDD HH:mm:ss')).unix();

		for (var i = 0; i < metricsArray.length; i++) {

			result += conf.graphiteNameSpace + '.' + util.getGraphiteURLKey('http://' + fullPath) + '.' + metrics[i] + ' ' +
				metricsArray[i] +
				' ' + secondsSinceEpoch + '\n';
		}
	});

	return result;
}
