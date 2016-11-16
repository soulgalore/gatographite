# Follow these instructions on how to create your PEM file and
# setup your GA account
# http://www.bentedder.com/server-to-server-authorization-for-google-analytics-api-with-node-js/

# And the full path to the PEM file
export GA_PEM_PATH=/home/root/my.pem
# Want to export data based per minute?
export GA_MINUTES=true
# Maximum number of results from GA
export GA_MAX_RESULTS=1000
# The start of the key namespace sent to Graphite
export GRAPHITE_NAMESPACE=google.analytics
