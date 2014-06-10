(function() {
  var editorModule;

  editorModule = angular.module('app');

  editorModule.directive('converseEditor', function() {
    var converter;
    converter = new Showdown.converter({
      'github_flavouring': true,
      'tables': true
    });
    return {
      restrict: 'A',
      template: '<div class="toolbar"></div>' + '<div class="editor" id="editor"></div>',
      controller: function($scope) {
        return $scope.init = function() {
          var editor, html;
          editor = ace.edit('editor');
          html = converter.makeHtml(editor.getSession().getValue());
          jQuery('#editor-preview').html(html);
          return editor.getSession().on('change', function() {
            html = converter.makeHtml(editor.getSession().getValue());
            return jQuery('#editor-preview').html(html);
          });
        };
      },
      link: function(scope, element, attributes) {
        return scope.init();
      }
    };
  });

}).call(this);
