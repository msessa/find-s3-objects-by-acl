const { TypeScriptAppProject } = require('projen');
const project = new TypeScriptAppProject({
  name: '@msessa/find-s3-objects-by-acl',
  description: 'Scan a S3 bucket recursively and print objects matching one or more ACLs ',
  repositoryUrl: 'https://github.com/msessa/find-s3-objects-by-acl',
  authorName: 'Matteo Sessa',
  authorEmail: 'matteo.sessa@gmail.com',
  release: true,
  releaseToNpm: true,
  defaultReleaseBranch: 'main',
});
project.synth();
