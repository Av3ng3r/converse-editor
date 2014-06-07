(function() {
  var app;

  app = angular.module('app', []);

  app.config(function($locationProvider) {
    return $locationProvider.html5Mode(false);
  });

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
    return console.log('App init');
  });

}).call(this);
