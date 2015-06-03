# Fetch metrics from Google Analytics and send to Graphite

Container for fetching metrics from Google Analytics and send them to Graphite. This is perfect if you want to correlate your metrics from sitespeed.io with page views or even RUM data. Massive love to [https://github.com/etsy/GoogleAnalyticsToGraphite](https://github.com/etsy/GoogleAnalyticsToGraphite) for inspiration.


Google API version 3 is used and it is some work to get the auth and setup to work:

1. Create your PEM file and setup your GA account: [http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/](http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/)
2. Take a copy of the [env.sh](https://github.com/soulgalore/gatographite/blob/master/docker/scripts/env.sh) and change the configuration for all the values you want, except pointing out the PEM file.
3. Start the container by mapping your own PEM file and env.sh file:

```
docker run --rm -v /path/to/my.pem:/home/root/my.pem -v /path/to/env.sh:/home/root/scripts/env.sh sitespeedio/gatographite gatographite
```

## Configuration
You can either feed the script with params or add your values to the env.sh file. Easiest using Docker is just to configure env.sh.

### Choosing which data to fetch
Metrics that you can fetch is the one in the Google Analytics API:
[https://developers.google.com/analytics/devguides/reporting/core/dimsmets](https://developers.google.com/analytics/devguides/reporting/core/dimsmets)

You choose that by giving a comma separated list to *metrics* like this:

```
export GA_METRICS=ga:pageviews,ga:sessions,ga:avgTimeOnSite,ga:domContentLoadedTime
```

## Run

### Fetch data from yesterday and send to Graphite
```
docker run --rm -v "$(pwd)"/my.pem:/home/root/my.pem -v "$(pwd)"/env.sh:/home/root/scripts/env.sh sitespeedio/gatographite gatographite
```

### Fetch data from three days back -> yesterday and send to Graphite
```
docker run --rm -v /path/to/my.pem:/home/root/my.pem -v /path/to/env.sh:/home/root/scripts/env.sh sitespeedio/gatographite gatographite 3
```

###  Send data for a specific date
```
docker run --rm -v /path/to/my.pem:/home/root/my.pem -v /path/to/env.sh:/home/root/scripts/env.sh sitespeedio/gatographite gatographite 2015-06-01
```

## Running on Mac
Do you get an error like **Error: invalid_grant**? It's because the clock in Docker is not synced between your container and your Mac. Easiest solution is to stop and start boot2docker (the clock is then in sync) and run again.
