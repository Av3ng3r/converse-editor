editorModule = angular.module 'app'
editorModule.directive 'converseEditor', () ->
    converter = new Showdown.converter({
        'github_flavouring': true,
        'tables': true
    })

    scripts = document.getElementsByTagName("script")
    currentScriptPath = scripts[scripts.length-1].src;

    restrict: 'A',
    templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + 'templates/editor.html'

    controller: ($scope) ->

        $scope.initText = "# Heading\n\n

`This is some well code`\n\n

    \tCode\n
    \tIs\n
    \tCool\n\n

This is an example\n\n

This is [an example](http://example.com/ \"Title\") inline link.\n\n

[This link](http://example.net/) has no title attribute.\n\n

See my [About](/about/) page for details.\n\n

Use the `printf()` function."

        $scope.init = () ->
            editor = ace.edit("editor")
            editor.setTheme("ace/theme/chrome")
            editor.getSession().setMode("ace/mode/markdown")
            editor.renderer.setShowGutter(false)
            editor.renderer.setShowPrintMargin(false)

            editor.setOptions({
                fontFamily: "Source Code Pro, Monaco, Menlo, Consolas, Courier New, monospace"
                fontSize: "18px"
            })

            editor.getSession().setValue($scope.initText, 0)

            html = converter.makeHtml(editor.getSession().getValue())
            jQuery('#editor-preview').html(html)

            editor.getSession().on('change', () ->
                html = converter.makeHtml(editor.getSession().getValue())
                jQuery('#editor-preview').html(html)
            )

    link: (scope, element, attributes) ->
        scope.init()