editorModule = angular.module 'app'
editorModule.directive 'converseEditor', () ->
    converter = new Showdown.converter({
        'github_flavouring': true,
        'tables': true
    })
    restrict: 'A',
    template: '<div class="toolbar"></div>' +
        '<div class="editor" id="editor"></div>',

    controller: ($scope) ->
        $scope.init = () ->
            editor = ace.edit('editor')
            html = converter.makeHtml(editor.getSession().getValue())
            jQuery('#editor-preview').html(html)

            editor.getSession().on('change', () ->
                html = converter.makeHtml(editor.getSession().getValue())
                jQuery('#editor-preview').html(html)
            )

    link: (scope, element, attributes) ->
        scope.init()