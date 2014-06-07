app = angular.module 'app', []

app.config(($locationProvider) ->
    $locationProvider.html5Mode(false)
)

angular.element(document).ready( ->
    angular.bootstrap(document, ['app'])

    editor = ace.edit("editor")
    editor.setTheme("ace/theme/monokai")
    editor.getSession().setMode("ace/mode/markdown")
)