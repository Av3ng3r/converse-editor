(function() {
  var app;

  app = angular.module('app', []);

  app.config(function($locationProvider) {
    return $locationProvider.html5Mode(false);
  });

  angular.element(document).ready(function() {
    var editor;
    angular.bootstrap(document, ['app']);
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    return editor.getSession().setMode("ace/mode/markdown");
  });

}).call(this);
