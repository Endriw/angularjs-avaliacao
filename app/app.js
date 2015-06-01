'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',

  'myApp.version',
  'myApp.header.top-header',

  'myApp.login',
  'myApp.apostas',
  'myApp.listaApostas',
]);

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/apostas'});
}])

.run(function($rootScope, $location, LoginFactory) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log('$routeChangeStart', LoginFactory, LoginFactory.logado());

      if (!LoginFactory.logado()) {
        $location.path('/login');
      }
    });
  }
);
