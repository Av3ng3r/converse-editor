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
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/markdown");
    editor.renderer.setShowGutter(false);
    editor.renderer.setShowPrintMargin(false);
    return editor.setOptions({
      fontFamily: "Source Code Pro, Monaco, Menlo, Consolas, Courier New, monospace",
      fontSize: "20px"
    });
  });

}).call(this);
