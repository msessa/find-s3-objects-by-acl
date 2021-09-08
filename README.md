# find-s3-objects-by-acl
Scan a S3 bucket recursively and print objects matching one or more ACLs

## Usage
```
find-s3-objects-by-acl
> Scan a S3 bucket recursively and print objects matching the selected ACLs

ARGUMENTS:
  <bucket> - target S3 bucket

OPTIONS:
  --prefix <str>   - object prefix for recursive scanning [optional]
  --acl <str>      - object ACL to match, can be repeated multiple times (default: public-read,public-write)
  --output <value> - output format (default: tsv) [optional]

FLAGS:
  --help, -h - show help
```