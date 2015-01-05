'use strict';

angular.module('infer')
.controller('Q1Ctrl', function ($scope, storageService, $timeout, $q, $log, kcSleep, $document, performance){

  $scope.username = storageService.get('username');

  $scope.images = {
        // stolen from http://pho.to/press/cartoon-face.php
        static: "assets/images/o_ce646cd62c98e6b7-0.jpg",
        dynamic: "assets/images/press-cartoonizer-animated-brad.gif"
      };

      $scope.keys = {
        'i': 73,
        'e': 69
      };

      $scope.testStatus = 'todo';
      $scope.testIsDone = function(){
        return 'done' === $scope.testStatus;
      };
      $scope.correctAnswer = 'smile';

      $scope.image = $scope.images.static;

      $scope.startButton = "Start";
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
          $scope.startButton = "Go";
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
    endTest()
  } else
  if (key === $scope.keys.i){
    iPressed();    
    endTest();
  } 
 
};

var endTest = function(){
  $scope.endMorphAt = performance.now();
  $scope.testStatus = 'done';
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
      timingMessage = "it took you " + ms + " milliseconds";

  return $scope.result() 
  ? "Correct! Brad was smiling! " + timingMessage
  : "Oops! Brad was smiling..." + timingMessage
};

});
