'use strict';

angular.module('infer', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/testee/username/username.html',
    controller: 'TesteeUsernameCtrl'
  })  
  .when('/example', {
    templateUrl: 'app/testee/exampleTest/exampleTest.html',
    controller: 'TesteeExampleTestCtrl'
  })
  .when('/q1', {
    templateUrl: 'app/testee/q1/q1.html',
    controller: 'Q1Ctrl'
  })
  .when('/q2', {
    templateUrl: 'app/testee/q2/q2.html',
    controller: 'Q2Ctrl'
  })
  .when('/q3', {
    templateUrl: 'app/testee/q3/q3.html',
    controller: 'Q3Ctrl'
  })
  .when('/done', {
    templateUrl: 'app/testee/done/done.html',
    controller: 'DoneCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

      // $locationProvider.html5mode(true);
    })
.factory("kcSleep", function($timeout) {
  return function(ms) {
    return function(value) {
      return $timeout(function() {
        return value;
      }, ms);
    };
  };
})
.directive('onKeyup', function() {
  return function(scope, elm, attrs) {
    elm.bind("keyup", function() {
      scope.$apply(attrs.onKeyup);
    });
  };
})

.value('keys', {
  'i': 73,
  'e': 69,
  'space': 32,
  'enter': 13
})
.value('performance', performance);
;
