'use strict';

angular.module('infer', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  })
  .when('/', {
    templateUrl: 'app/testee/testee.html',
    controller: 'TesteeCtrl'
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
});
;
