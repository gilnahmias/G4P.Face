'use strict';

angular.module('infer')
.controller('DoneCtrl', function ($scope, storageService, $timeout, $q, $log, kcSleep, $document, $window, keys){

  $scope.username = storageService.get('username');

  $scope.results = storageService.results();
  
  $scope.clearResults = function(){
    storageService.clearResults();
    $scope.results = storageService.results();
  };

});
