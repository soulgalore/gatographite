# Push Google Analytics data to Graphite

Fetch your Google Analytics data and send it to Graphite, massive love to  https://github.com/etsy/GoogleAnalyticsToGraphite for inspiration.

This is a work in progress and when it is finished, I'll wrap the functionality on a Docker container.

## Setup your Google Account and setup everything
To fetch the metrics from Google Analtics, we use the Google API v3. To get it up and running, it needs a couple of things. I'll add the steps asap but if you follow these http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/ instructions for now, it will hopefully work :)

## Configuration
You can either feed the script with params (check cli.js, I'll add docs later) or add your values to the export.sh file and source it, then all values are fetched from the environment variables.

## Choosing which data to fetch
Metrics that you can fetch is the one in the Google Analytics API:
https://developers.google.com/analytics/devguides/reporting/core/dimsmets

## Install
```
npm install -g gatographite
```

## Run

```
// Fetch data from yesterday and send to Graphite
gatographite
```

```
// Fetch data from three days back -> today and send to Graphite
gatographite 3
```

```
// Send data for a specific date
gatographite 2015-06-01
```
