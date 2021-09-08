import { command, run, string, positional, option, multioption, array, optional, oneOf } from 'cmd-ts';
import { getObjectMatchingAcls } from '..';


const cmd = command({
  name: 'find-s3-objects-by-acl',
  description: 'Scan a S3 bucket recursively and print objects matching the selected ACLs',
  args: {
    bucket: positional({
      type: string,
      displayName: 'bucket',
      description: 'target S3 bucket',
    }),
    prefix: option({
      long: 'prefix',
      type: optional(string),
      description: 'object prefix for recursive scanning',
    }),
    acl: multioption({
      long: 'acl',
      type: optional(array(string)),
      description: 'object ACL to match, can be repeated multiple times (default: public-read,public-write)',
    }),
    output: option({
      long: 'output',
      type: optional(oneOf(['tsv', 'json'])),
      description: 'output format (default: tsv)',
    }),
  },
  handler: args => {
    let f: Promise<void>;
    let acls: string[];

    if (args.acl) {
      acls = args.acl;
    } else {
      acls = ['public-read', 'public-write'];
    }

    switch (args.output) {
      case 'json':
        f = printObjectsMatchingAclAsJsonStream(args.bucket, acls, args.prefix);
        break;
      default:
        f = printObjectsMatchingAclAsTsv(args.bucket, acls, args.prefix);
    }
    f.catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
  },
});

async function printObjectsMatchingAclAsJsonStream(bucketName: string, acls: string[], prefix?: string) {
  for await (const o of getObjectMatchingAcls(bucketName, acls, prefix)) {
    console.log(o);
  };
}

async function printObjectsMatchingAclAsTsv(bucketName: string, acls: string[], prefix?: string) {
  for await (const o of getObjectMatchingAcls(bucketName, acls, prefix)) {
    console.log([o.key, o.acl].join('\t'));
  };
}

void run(cmd, process.argv.slice(2));