'use strict';

var G4P = G4P || {};
G4P.Directives = G4P.Directives || {};

G4P.Directives.Question = function() {
	var html = 	'<div class="container">' +
					'<div class="form-group text-center" }>' +
						'<div class="row padding">' +
							'<div ng-cloak ng-show="testIsDone()" class="blanket">' +
								'<div ng-class="result() ? \'alert alert-success\' : \'alert alert-danger\'" role="alert">' +
									'<p ng-bind="resultMessage()" class="example-test-user-notice"></p>' +
									'<br /><br />' +
									'<a class="btn btn-lg btn-primary pull-right" ng-href="{{nextUrl}}" id="btnNext">{{nextId}}&nbsp;<span class="glyphicon glyphicon-chevron-right"></span></a>' +
									'<br/><br/>' +
								'</div>' +
							'</div>' +

							'<div class="pressedKey" ng-show="showE">smile</div>' +
							'<div class="pressedKey" ng-show="showI">frown</div>' +

							'<br /><br /><br />' +

							'<div class="col-xs-3 col-xs-offset-2">' +
								'<h3><b>{{id}}</b></h3>' +
								'<h4>' +
									'<br /><br />' +
									'The moment you can tell which one it is, press <code>E</code> for <strong>smile</strong> or <code>I</code> for <strong>frown</strong>.' +
									'<br /><br /><br /><br />' +
									'<a class="btn btn-lg btn-primary" ng-click="onStartButtonClicked()" ng-disabled="disableStartButton">{{startButton}}&nbsp;<span class="glyphicon glyphicon-chevron-right"></span></a>' +
								'</h4>' +

							'</div>' +
							'<div class="col-xs-4">' +
								'<img ng-src="{{image}}" />' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';

	return { 
		template: html,
		scope: {
			id: '@',
			correctAnswer: '@',
			nextUrl: '@',
			nextId: '@',
		},

		controller: QuestionCtrl,
		replace: true,
		restrict: 'E',
	};
};

	QuestionCtrl.$inject = ['$scope', '$element', 'storageService', '$document', '$q', 'kcSleep', 'keys'];
	function QuestionCtrl ($scope, $element, storageService, $document, $q, kcSleep, keys){
			$scope.username = storageService.get('username');

			$scope.images = {
		        // stolen from http://pho.to/press/cartoon-face.php
		        static: 'assets/images/o_ce646cd62c98e6b7-0.jpg',
		        dynamic: 'assets/images/press-cartoonizer-animated-brad.gif'
		    };

		    $scope.testStatus = 'todo';
		    $scope.testIsDone = function(){
		    	return 'done' === $scope.testStatus;
		    };

		    $scope.image = $scope.images.static;

		    $scope.startButton = 'Space to start';
		    $scope.onStartButtonClicked = function(){
		    	$q(function(resolve){ resolve(); })
		    	.then(function(){
		    		$scope.startButton = 3;
		    	})
		    	.then(kcSleep(1000))
		    	.then(function(){
		    		$scope.startButton = 2;
		    	})
		    	.then(kcSleep(1000))
		    	.then(function(){
		    		$scope.startButton = 1;
		    	})
		    	.then(kcSleep(1000))
		    	.then(function(){
		    		$scope.startButton = 'Go';
		    		$scope.disableStartButton = true;

		    		$scope.testStatus = 'active';
		    		$scope.startMorph();
		    	});
		    };

		    $scope.startMorph = function(){
		    	$scope.image = $scope.images.dynamic;
		    	$scope.startMorphAt = performance.now();
		    };

		    $scope.onEnterSubmitName = function (){
		    	if ($scope.event.keyCode === 13) {
		    		$scope.step = '2';
		    	}
		    };

		    $scope.handleKeyPress= function (){
		    	if ($scope.event.keyCode === 27) {
		    		$scope.step = '1';
		    	}
		    };

		    $scope.onKeyUp = function (key){
		    	if ($scope.testStatus === 'todo'){
		    		if (key === keys.space){
		    			$scope.onStartButtonClicked();
		    		}
		    		return;
		    	}

		    	if ($scope.testStatus === 'active'){
		    		if (key === keys.e){
		    			ePressed();
		    			endTest()
		    		} else
		    		if (key === keys.i){
		    			iPressed();
		    			endTest();
		    		} 
		    		return;
		    	};

		    	if ($scope.testStatus === 'done'){
		    		if (key === keys.enter){
		    			$('#btnNext').click();
		    		}
		    		return;
		    	};
		    };

		    var endTest = function(){
		    	$scope.endMorphAt = performance.now();
		    	$scope.testStatus = 'done';

		    	storageService.addResult($scope.id, $scope.result(), $scope.endMorphAt - $scope.startMorphAt);
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
		    	.then(kcSleep(700))
		    	.then(function(){
		    		$scope.showE = false;
		    	});

		    	$scope.userAnswer = 'smile';
		    };

		    function iPressed(){
		    	$q(function(resolve){ resolve(); })
		    	.then(function(){
		    		$scope.showI = true;
		    	})
		    	.then(kcSleep(700))
		    	.then(function(){
		    		$scope.showI = false;
		    	});

		    	$scope.userAnswer = 'frown';
		    };

		    $scope.result = function(){
		    	return $scope.userAnswer === $scope.correctAnswer;
		    };

		    $scope.resultMessage = function(){
		    	if (!$scope.userAnswer){
		    		return;
		    	}

		    	var ms = $scope.endMorphAt - $scope.startMorphAt,
		    	timingMessage = 'it took you ' + ms + ' milliseconds';

		    	return $scope.result() 
		    	? 'Correct! Brad was smiling! ' + timingMessage
		    	: 'Oops! Brad was smiling...' + timingMessage
		    };
		};

angular.module('infer')
	.directive ('question', G4P.Directives.Question);