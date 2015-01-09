'use strict';

angular.module('infer')
  .controller('TesteeUsernameCtrl', function ($scope, storageService){

  	$scope.username = storageService.username();
  	$scope.$watch ('username', function(newUsername){
  		storageService.username(newUsername);
  	});

  	$scope.onEnterSubmitName = function(){
  		if ($scope.event.keyCode === 13){
        $('#submitUsername').click();
  		}
  	}
  });
  	