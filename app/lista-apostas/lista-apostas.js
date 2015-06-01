'use strict';

angular.module('myApp.listaApostas', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/lista-apostas', {
    templateUrl: 'lista-apostas/lista-apostas.html',
    controller: 'ListaApostasController'
  });

}])

.factory('ListaApostasFactory', ['$http', function($http) {
  return {
    all : function(rodada) {
      // seu código aqui
    },
    apostas : function(ra, rodada) {
      // seu código aqui
    }
  };
}])

.controller('ListaApostasController', ['$scope', '$window', 'ListaApostasFactory', 'LoginFactory', function($scope, $window, Factory, LoginFactory) {

  $scope.usuarioLogado = LoginFactory.logado();

  var ra = $scope.usuarioLogado.ra;

  $scope.apostas = [];
  $scope.rodada  = 5;
  $scope.usuarioLogado = LoginFactory.logado();

  function all() {
    // seu código aqui
  }

  $scope.rodadaAnterior = function() {
    if ($scope.rodada == 1) {
      $window.alert('Mas vai aonde? Não existe rodada zero ou negativa! :)');
      return;
    }

    $scope.rodada--;
    all();
  };

  $scope.rodadaProxima = function() {
    if ($scope.rodada == 100) {
      $window.alert('Mas vai aonde? Não existe mais que 100 rodadas! :)');
      return;
    }

    $scope.rodada++;
    all();
  };

  all();

}]);
