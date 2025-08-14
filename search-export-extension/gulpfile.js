'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Disable tslint
build.tslintCmd.enabled = false;

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);
  result.set('serve', result.get('serve-deprecated'));
  return result;
};

const envCheck = build.subTask('environmentCheck', (gulp, config, done) => {
  build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
      // Set library target
      generatedConfiguration.output.library = 'SearchExportExtension';
      generatedConfiguration.output.libraryTarget = 'umd';
      
      // Handle HTML files
      if (generatedConfiguration.module && generatedConfiguration.module.rules) {
        generatedConfiguration.module.rules = generatedConfiguration.module.rules.filter(rule => {
          return rule.test && rule.test.toString() !== '/\\.html$/';
        });
        
        generatedConfiguration.module.rules.push({
          test: /\.html$/,
          use: 'raw-loader'
        });
      }
      
      return generatedConfiguration;
    }
  });
  done();
});

build.rig.addPreBuildTask(envCheck);

build.initialize(require('gulp'));