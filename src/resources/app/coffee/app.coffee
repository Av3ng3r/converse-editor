app = angular.module 'app', []

app.config(($locationProvider) ->
    $locationProvider.html5Mode(false)
)

angular.element(document).ready( ->
    angular.bootstrap(document, ['app'])

    editor = ace.edit("editor")
    editor.setTheme("ace/theme/chrome")
    editor.getSession().setMode("ace/mode/markdown")
    editor.renderer.setShowGutter(false)
    editor.renderer.setShowPrintMargin(false)

    editor.setOptions({
        fontFamily: "Source Code Pro, Monaco, Menlo, Consolas, Courier New, monospace"
        fontSize: "20px"
    })
)