import { command, run, string, positional, option, multioption, array, optional, oneOf } from 'cmd-ts';
import { getObjectMatchingAcls } from '..';


const cmd = command({
  name: 'find-s3-objects-by-acl',
  description: 'Scan a S3 bucket recursively and print objects matching a specific ACL',
  args: {
    bucket: positional({ type: string, displayName: 'bucket' }),
    prefix: option({
      long: 'prefix',
      type: optional(string),
    }),
    acl: multioption({
      long: 'acl',
      type: array(string),
      description: 'object ACL to scan, can be repeated multiple times',
    }),
    output: option({
      long: 'output',
      type: optional(oneOf(['csv', 'json'])),
    }),
  },
  handler: args => {
    let f: Promise<void>;
    switch (args.output) {
      case 'csv':
        f = printObjectsMatchingAclAsCsv(args.bucket, args.acl, args.prefix);
        break;
      default:
        f = printObjectsMatchingAclAsJsonStream(args.bucket, args.acl, args.prefix);
    }
    f.catch((err: Error) => {
      console.log(err);
    });
  },
});

async function printObjectsMatchingAclAsJsonStream(bucketName: string, acls: string[], prefix?: string) {
  for await (const o of getObjectMatchingAcls(bucketName, acls, prefix)) {
    console.log(o);
  };
}

async function printObjectsMatchingAclAsCsv(bucketName: string, acls: string[], prefix?: string) {
  for await (const o of getObjectMatchingAcls(bucketName, acls, prefix)) {
    Object.entries(o).forEach(([key, value]) => console.log(`${key},${value}`));
  };
}

void run(cmd, process.argv.slice(2));