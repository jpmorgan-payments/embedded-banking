# Metrics Gathering

We've created a bash script that runs daily to collect our metrics and store them as csv.
This is because _currently_ GitHub is only storing the last 14days worth of data.

We use the [github_traffic_stats](https://github.com/nchah/github-traffic-stats) python package to gather our metrics in three csv files.

Then we have created merge.sh to merge these metrics with the previous days csv and then sort by date order.

We are storing our latest metrics files on a branch called 'metrics'. This is because we don't want to push directly to main.
