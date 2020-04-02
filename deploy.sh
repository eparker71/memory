#!/bin/bash

# make sure to setup the env var DEPLOYBUCKET
# export $DEPLOYBUCKET="your bucket name"
source ~/.profile
aws s3 sync . s3://$DEVBUCKET --acl public-read --exclude "*" --include "*.js"  --include "*.html" --include "*.css" --include "*.ico" --include "*.jpg" --include "*.png" --delete

#aws s3 sync s3://$DEVBUCKET s3://$PRODBUCKET --acl public-read --exclude "*" --include "*.js"  --include "*.html" --include "*.css" --include "*.ico" --include "*.jpg" --include "*.png" --delete
