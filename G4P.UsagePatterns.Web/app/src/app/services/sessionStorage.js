'use strict';

var StorageService = (function() {
  function StorageService() {}

  StorageService.prototype.set = function(key, value) {
    var json;
    json = value === void 0 ? null : JSON.stringify(value);
    return sessionStorage.setItem(key, json);
  };

  StorageService.prototype.get = function(key) {
    return JSON.parse(sessionStorage.getItem(key));
  };

  StorageService.prototype.username = function(value) {
    if (value == null) {
      value = null;
    }
    if (value === null) {
      return this.get('username');
    } else {
      return this.set('username', value);
    }
  };

  StorageService.prototype.addResult = function(question, result, delay) {
    var results = this.results();
    results.push ({
      username: this.username(),
      timestamp: new Date().getTime(),
      question: question,
      result: !!result,
      delay: delay
    });
    this.set('results', results);
  };

  StorageService.prototype.results = function() {
    return this.get('results') || [];
  };

  StorageService.prototype.clearResults = function() {
    return this.set('results', []);
  };

  /*@ngInject*/
  angular.module('infer').service('storageService', StorageService);

  return StorageService;

})();