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
      link: function(scope, element, attributes) {
        var editor, html;
        editor = ace.edit('editor');
        html = converter.makeHtml(editor.getSession().getValue());
        jQuery('#editor-preview').html(html);
        return editor.getSession().on('change', function() {
          html = converter.makeHtml(editor.getSession().getValue());
          return jQuery('#editor-preview').html(html);
        });
      }
    };
  });

}).call(this);
