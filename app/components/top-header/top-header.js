'use strict';

angular.module('myApp.header.top-header', [])

.directive('topHeader', function() {
  var directive = {};

  directive.restrict = 'E';
  directive.templateUrl = 'components/top-header/top-header.html';

  return directive;
});
