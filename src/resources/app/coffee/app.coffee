app = angular.module 'app', []

app.config(($locationProvider) ->
    $locationProvider.html5Mode(false)
)

angular.element(document).ready( ->
    angular.bootstrap(document, ['app'])

    console.log 'App init'
)