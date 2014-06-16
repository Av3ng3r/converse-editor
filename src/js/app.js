(function() {
  var app;

  app = angular.module('app', []);

  app.config(function($locationProvider) {
    return $locationProvider.html5Mode(false);
  });

  angular.element(document).ready(function() {
    return angular.bootstrap(document, ['app']);
  });

}).call(this);
