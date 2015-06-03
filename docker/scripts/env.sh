# Follow these instructions on how to create your PEM file and
# setup your GA account
# http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/

# Get the email address from Google Analytics
export GA_EMAIL=thesupersecretemailcode@developer.gserviceaccount.com
# And the full path to the PEM file
export GA_PEM_PATH=/home/root/my.pem
# Choose which metrics to send. You can probably use
# this list https://developers.google.com/analytics/devguides/reporting/core/dimsmets
export GA_METRICS=ga:pageviews,ga:sessions,ga:avgTimeOnSite
# The view id on your Google Analytics account
export GA_VIEW_ID=YOUR_VIEW_ID
# Want to export data based per minute?
export GA_MINUTES=false
# Maximum number of results from GA
export GA_MAX_RESULTS=1000
# The hostname of your Graphite instance
export GRAPHITE_HOST=
# Graphite port
export GRAPHITE_PORT=2003
# The start of the key namespace sent to Graphite
export GRAPHITE_NAMESPACE=google.analytics
