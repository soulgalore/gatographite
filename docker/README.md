# Fetch metrics from Google Analytics and send to Graphite

Container for fetching metrics from Google Analytics and send them to Graphite. This is perfect if you want to correlate your metrics from sitespeed.io with page views or even RUM data.

Google API version 3 is used and it is some work to get the auth and setup to work:

1. Create your PEM file and setup your GA account: http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/
2. Take a copy of the env.sh and change the configuration for all the values you want, except pointing out the PEM file.
3. Start the container by mapping your own PEM file and start.sh file, something like:
<pre>
docker run --rm -v "$(pwd)"/my.pem:/home/root/my.pem -v "$(pwd)"/env.sh:/home/root/scripts/env.sh test/test gatographite
</pre>

## Configuration
You can either feed the script with params or add your values to the env.sh file. Easiest using Docker is just to configure env.sh.

### Choosing which data to fetch
Metrics that you can fetch is the one in the Google Analytics API:
https://developers.google.com/analytics/devguides/reporting/core/dimsmets

You choose that by giving a comma separated list to *metrics* like this:
<pre>
export GA_METRICS=ga:pageviews,ga:sessions,ga:avgTimeOnSite,ga:domContentLoadedTime
</pre>

## Run

<pre>
// Fetch data from yesterday and send to Graphite
docker run --rm -v "$(pwd)"/my.pem:/home/root/my.pem -v "$(pwd)"/env.sh:/home/root/scripts/env.sh test/test gatographite
</pre>

<pre>
// Fetch data from three days back -> today and send to Graphite
docker run --rm -v "$(pwd)"/my.pem:/home/root/my.pem -v "$(pwd)"/env.sh:/home/root/scripts/env.sh test/test gatographite 3
</pre>

<pre>
// Send data for a specific date
docker run --rm -v "$(pwd)"/my.pem:/home/root/my.pem -v "$(pwd)"/env.sh:/home/root/scripts/env.sh test/test gatographite 2015-06-01
</pre>
