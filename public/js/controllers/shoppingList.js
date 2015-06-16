(function() {
    var app = angular.module('shoppingList', []);

    app.controller('shoppingListCtrl', ['$scope', '$http', 'shoppingAPI', function($scope, $http, shoppingAPI) {
        $scope.formData = {};

        // Get all shopping items on page load
        shoppingAPI.get().success(function(data) {
            $scope.list = data;
        }).error(function(data) {
            console.log('Error: ' + data);
        });
        
        // Helper function to delete a single item
        var deleteItem = function(id) {
            shoppingAPI.delete(id).success(function(data) {
                $scope.list = data;
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        };

        // Creates a shopping item from the form input
        $scope.createItem = function() {
            shoppingAPI.create($scope.formData).success(function(data) {
                $scope.formData = {};
                $scope.list = data;
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        };

        // Determines if there's any items checkmarked
        $scope.checkItem = function() {
            $scope.showClear = false;
            for (var id in $scope.formData.checked) {
                if ($scope.formData.checked[id]) $scope.showClear = true;
            }
        };

        // Clears items that are checkmarked
        $scope.clearSelected = function() {
            for (var id in $scope.formData.checked) {
                if ($scope.formData.checked[id]) {
                    deleteItem(id);
                }
            }
        };

        // Clears all items
        $scope.clearAll = function() {
            for (var i = 0; i < $scope.list.length; i++) {
                deleteItem($scope.list[i]._id);
            }
        };

    }]);
})();