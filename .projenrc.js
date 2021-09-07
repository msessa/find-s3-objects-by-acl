const { TypeScriptAppProject } = require('projen');
const project = new TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'find-s3-objects-by-acl',

  // deps: [],                /* Runtime dependencies of this module. */
  // devDeps: [],             /* Build dependencies for this module. */
  description: 'Scan a S3 bucket recursively and print objects matching one or more ACLs ',
  packageName: '@msessa/find-s3-objects-by-acl',
  release: true,
  npmDistTag: 'latest',
});
project.synth();
