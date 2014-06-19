(function() {
  var editorModule;

  editorModule = angular.module('app');

  editorModule.directive('converseEditor', function() {
    var converter, currentScriptPath, scripts;
    converter = new Showdown.converter({
      'github_flavouring': true,
      'tables': true
    });
    scripts = document.getElementsByTagName("script");
    currentScriptPath = scripts[scripts.length - 1].src;
    return {
      restrict: 'A',
      templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + 'templates/editor.html',
      controller: function($scope) {
        $scope.editor = ace.edit("editor");
        $scope.initText = "# Heading\n\n `This is some well code`\n\n \tCode\n \tIs\n \tCool\n\n This is an example of a paragraph\n\n [This link](http://example.net/) has no **title** attribute.";
        $scope.init = function() {
          var html;
          $scope.editor.setTheme("ace/theme/chrome");
          $scope.editor.getSession().setMode("ace/mode/markdown");
          $scope.editor.renderer.setShowGutter(false);
          $scope.editor.renderer.setShowPrintMargin(false);
          $scope.editor.setOptions({
            fontFamily: "Source Code Pro, Monaco, Menlo, Consolas, Courier New, monospace",
            fontSize: "18px"
          });
          $scope.editor.getSession().setValue($scope.initText, -1);
          html = converter.makeHtml($scope.editor.getSession().getValue());
          jQuery('#editor-preview').html(html);
          $scope.editor.getSession().on('change', function() {
            html = converter.makeHtml($scope.editor.getSession().getValue());
            return jQuery('#editor-preview').html(html);
          });
          return $scope.setFocus();
        };
        $scope.setFocus = function() {
          var n;
          $scope.editor.focus();
          n = $scope.editor.getSession().getValue().split("\n").length;
          return $scope.editor.gotoLine(n + 1);
        };
        $scope.bold = function() {
          var pattern;
          pattern = /\*\*([a-z_\s]+)\*\*/i;
          return $scope.toggle(pattern, "**", "**");
        };
        $scope.italic = function() {
          var pattern;
          pattern = /_([\*\*a-z\*\*\s]+)_/i;
          return $scope.toggle(pattern, "_", "_");
        };
        return $scope.toggle = function(pattern, prefix, postfix) {
          var range, selection;
          range = $scope.editor.selection.getRange();
          selection = $scope.editor.session.getTextRange($scope.editor.getSelectionRange()).trim();
          if (selection === '') {
            $scope.editor.insert("" + prefix + "emphasis" + postfix + " ");
            return;
          }
          if (pattern.test(selection) === true) {
            $scope.editor.session.replace(range, selection.replace(pattern, "$1"));
          } else {
            $scope.editor.session.replace(range, "" + prefix + selection + postfix);
          }
          range.end.column += parseInt(prefix.length * 2);
          return $scope.editor.selection.setSelectionRange(range);
        };
      },
      link: function(scope, element, attributes) {
        return scope.init();
      }
    };
  });

}).call(this);
