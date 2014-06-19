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

        $scope.editor = ace.edit("editor")
        $scope.initText = "# Heading\n\n

`This is some well code`\n\n

    \tCode\n
    \tIs\n
    \tCool\n\n

This is an example of a paragraph\n\n

[This link](http://example.net/) has no **title** attribute."

        $scope.init = () ->

            $scope.editor.setTheme("ace/theme/chrome")
            $scope.editor.getSession().setMode("ace/mode/markdown")
            $scope.editor.renderer.setShowGutter(false)
            $scope.editor.renderer.setShowPrintMargin(false)

            $scope.editor.setOptions({
                fontFamily: "Source Code Pro, Monaco, Menlo, Consolas, Courier New, monospace"
                fontSize: "18px"
            })

            $scope.editor.getSession().setValue($scope.initText, -1)

            html = converter.makeHtml($scope.editor.getSession().getValue())
            jQuery('#editor-preview').html(html)

            $scope.editor.getSession().on('change', () ->
                html = converter.makeHtml($scope.editor.getSession().getValue())
                jQuery('#editor-preview').html(html)
            )

        $scope.bold = () ->
            pattern = /\*\*([a-z_\s]+)\*\*/i

            $scope.toggle(pattern, "**", "**")

        $scope.italic = () ->
            pattern = /_([a-z\s]+)_/i

            $scope.toggle(pattern, "_", "_")


        $scope.toggle = (pattern, prefix, postfix) ->
            range = $scope.editor.selection.getRange()

            selection = $scope.editor.getSession().getTextRange($scope.editor.getSelectionRange()).trim()

            if selection == ''
                return

            if pattern.test(selection) == true
                $scope.editor.getSession().replace(range, selection.replace(pattern, "$1"))
            else
                $scope.editor.getSession().replace(range, "#{prefix}#{selection}#{postfix}")


    link: (scope, element, attributes) ->
        scope.init()