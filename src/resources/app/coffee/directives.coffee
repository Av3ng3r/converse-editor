editorModule = angular.module 'app'
editorModule.directive 'converseEditor', () ->
    converter = new Showdown.converter({
        'github_flavouring': true,
        'tables': true
    })
    restrict: 'A',
    link: (scope, element, attributes) ->
        editor = ace.edit('editor')
        html = converter.makeHtml(editor.getSession().getValue())
        jQuery('#editor-preview').html(html)

        editor.getSession().on('change', () ->
            html = converter.makeHtml(editor.getSession().getValue())
            jQuery('#editor-preview').html(html)
        )