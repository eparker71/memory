#!/bin/bash

# make sure to setup the env var DEPLOYBUCKET
# export $DEPLOYBUCKET="your bucket name"

aws s3 sync . s3://$DEPLOYBUCKET --acl public-read --exclude "*" --include "*.js" --include "*.html" --include "*.css"

