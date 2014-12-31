'use strict';

angular.module('infer')
  .controller('TesteeCtrl', function ($scope, $timeout, $q, $log, kcSleep, $document) {
  		$scope.step = "1";

  		$scope.images = {
  			// stolen from http://pho.to/press/cartoon-face.php
  			static: "assets/images/o_ce646cd62c98e6b7-0.jpg",
  			dynamic: "assets/images/press-cartoonizer-animated-brad.gif"
  		};

  		$scope.keys = {
  			'i': 73,
  			'e': 69
  		};

  		$scope.correctAnswer = 'smile';

  		$scope.image = $scope.images.static;

  		$scope.readyToTryButton = "Ready to try?";
  		$scope.onReadyToTryButton = function(){
  			$q(function(resolve){ resolve(); })
  			.then(function(){
				$scope.readyToTryButton = 3;
  			})
  			.then(kcSleep(1000))
  			.then(function(){
				$scope.readyToTryButton = 2;
  			})
  			.then(kcSleep(1000))
  			.then(function(){
				$scope.readyToTryButton = 1;
  			})
  			.then(kcSleep(1000))
  			.then(function(){
				$scope.readyToTryButton = "Go";
				$scope.disableReadToTry = true;

				$scope.testStatus = 'active';
				$scope.startMorph();
  			});
  		};

  		$scope.startMorph = function(){
			$scope.image = $scope.images.dynamic;
  		};
  			
  		$scope.onEnterSubmitName = function (){
  			if ($scope.event.keyCode === 13) {
  				$scope.step = "2";
  			}
  		};

  		$scope.handleKeyPress= function (){
  			if ($scope.event.keyCode === 27) {
  				$scope.step = "1";
  			}
  		};

  		$scope.onKeyUp = function (key){
  			if ($scope.testStatus !== 'active'){
				return;
  			}

  			if (key === $scope.keys.e){
  				ePressed();
  			} else
  			if (key === $scope.keys.i){
  				iPressed();
  			} 

  			$scope.testStatus !== 'done';
  		};

  		$document.on('keyup', function(e){
  			$scope.onKeyUp(e.keyCode);
  			$scope.$apply();
  		});

  		function ePressed(){
			$q(function(resolve){ resolve(); })
  			.then(function(){
				$scope.showE = true;
  			})
  			.then(kcSleep(300))
  			.then(function(){
				$scope.showE = false;
  			});

  			$scope.result = $scope.correctAnswer === 'smile'
  				? "Correct! Now let's move on to the real test..."
  				: "Oops! This was the wrong answer... Try again in the real test!";
  		};

  		function iPressed(){
			$q(function(resolve){ resolve(); })
  			.then(function(){
				$scope.showI = true;
  			})
  			.then(kcSleep(300))
  			.then(function(){
				$scope.showI = false;
  			});

  			$scope.result = $scope.correctAnswer === 'frown'
  				? "Correct! Now let's move on to the real test..."
  				: "Oops! This was the wrong answer... Try again in the real test!";
  		};
  });
