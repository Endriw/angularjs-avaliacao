'use strict';

angular.module('myApp.apostas', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/apostas', {
    templateUrl: 'apostas/apostas.html',
    controller: 'ApostasController'
  });

}])

.factory('ApostasFactory', ['$http', function($http) {
  return {
    all : function(rodada) {
      return $http.get('https://bolao.firebaseio.com/rodadas/' + rodada + '/jogos.json').then(function (response) {
        return response.data;
      });
    }
  };
}])

.controller('ApostasController', ['$scope', '$window', 'ApostasFactory', 'ApostasService', 'LoginFactory', function($scope, $window, Factory, Service, LoginFactory) {

  $scope.apostas = [];
  $scope.rodada  = 5;
  $scope.usuarioLogado = LoginFactory.logado();

  function all() {
    Factory.all($scope.rodada).then(function(data) {
      $scope.firebase = data;
    });
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

  $scope.salvar = function() {
    var params = {
      ra : $scope.usuarioLogado.ra,
      rodada : $scope.rodada,
      jogos : $scope.apostas
    };

    Service.salvar(params, function() {
      $window.alert('Salvo com sucesso!');
    });
  };

  all();

}])

.service("ApostasService", ['Firebase', function(Firebase) {
  var vm = this;

  vm.ref = new Firebase("https://bolao.firebaseio.com/");

  vm.salvar = function(params, callback) {
    vm.jogos = vm.ref.child('apostas').child(params.ra).child('rodadas').child(params.rodada).child('jogos');
    vm.jogos.set(params.jogos, callback);
  };
}]);
