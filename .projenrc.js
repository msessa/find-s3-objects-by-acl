const { TypeScriptAppProject, NpmAccess } = require('projen');
const project = new TypeScriptAppProject({
  name: '@sv-oss/find-s3-objects-by-acl',
  description: 'Scan a S3 bucket recursively and print objects matching one or more ACLs ',
  repositoryUrl: 'https://github.com/sv-oss/find-s3-objects-by-acl',
  authorName: 'Matteo Sessa',
  authorEmail: 'matteo.sessa@service.vic.gov.au',
  license: 'MIT',
  package: true,
  release: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  defaultReleaseBranch: 'main',
  jest: true,

  deps: [
    'cmd-ts',
    '@aws-sdk/client-s3@3.28.0',
  ],
});

// add support for dom library in typescript compiler
project.tsconfig.file.addOverride('compilerOptions.lib', ['es2018', 'dom']);
project.tsconfigEslint.file.addOverride('compilerOptions.lib', ['es2018', 'dom']);
project.tryFindObjectFile('tsconfig.jest.json').addOverride('compilerOptions.lib', ['es2018', 'dom']);

project.synth();
