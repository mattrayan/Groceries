(function() {
    var app = angular.module('app', ['ngRoute', 'shoppingList', 'shoppingService']);

    // Setup routing
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './templates/shoppingList.html',
            controller: 'shoppingListCtrl'
        });        

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });

})();