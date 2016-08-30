var angular =  require('angular');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

var ngModule =  angular.module('basketApp', []);

require('./services')(ngModule);
require('./directives')(ngModule);


