'use strict';

angular.module('myApp.login', ['ngRoute']);

angular.module('myApp.login')
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginController'
    })
    .when('/sair', {
      template: '',
      controller: 'SairController'
    });

}])
.controller('LoginController', function($scope, $location, LoginFactory) {
  $scope.ra = null;

  $scope.login = function() {
    LoginFactory.login($scope.ra).success(function(response) {
      console.log('response', response);
      if (response !== 'null') {
        response.ra = $scope.ra;
        LoginFactory.setarUsuario(response);

        $location.path('/').replace();
      }
    });
  };
})
.controller('SairController', function($location, LoginFactory) {
  LoginFactory.sair();

  $location.path('/login').replace();
})
.factory('LoginFactory', function($window, $http) {
  var service = {
    nome: 'usuario'
  };

  service.setarUsuario = function(usuario) {
    $window.localStorage.setItem(service.nome, JSON.stringify(usuario));
  };

  service.logado = function() {
    return JSON.parse($window.localStorage.getItem(service.nome));
  };

  service.login = function(ra) {
    return $http.get('https://bolao.firebaseio.com/alunos/' + ra + '.json');
  };

  service.sair = function() {
    $window.localStorage.removeItem(service.nome);
  };

  return service;
})
.factory('Autenticacao', function($window) {
  var service = {};

  service.autenticado = function() {
    return JSON.parse($window.localStorage.getItem('autenticado')) || false;
  };

  return service;
});
