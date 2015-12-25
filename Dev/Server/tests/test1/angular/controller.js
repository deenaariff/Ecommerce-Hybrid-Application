var Controllers = angular.module('Controllers',[])

Controllers.controller('MainCtrl', function($scope, $http) {

    var base = "http://localhost:5000";

    $scope.getAll = function (name) {
        $http.get(base+'/api/v1/foodList/data/list').success(function(response) {
          console.log(response);
          $scope.food = JSON.parse(response);
        });
    }

    $scope.getItem = function (id, price) {
        return $http.get(base+'/api/v1/foodList/data/item/' + id, {
            method: 'GET',
            params: {
                token: price
            }
        });
    }

    $scope.saveItem = function (form, price) {
        return $http.post(base+'/api/v1/foodList/data/item', form, {
            method: 'POST',
            params: {
                token: price
            }
        });
    }

    $scope.putItem = function (id, form, price) {
        return $http.put(base+'/api/v1/foodList/data/item/' + id, form, {
            method: 'PUT',
            params: {
                token: email
            }
        });
    }

    $scope.deleteItem = function (id, price) {
        return $http.delete(base+'/api/v1/foodList/data/item/' + id, {
            method: 'DELETE',
            params: {
                token: email
            }
        });
    }

  });
