#!/bin/bash

aws s3 sync --acl public-read post-images/. s3://blog-images-1