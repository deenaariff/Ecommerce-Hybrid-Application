var Controllers = angular.module('Controllers',[])

Controllers.controller('MainCtrl', function($scope, $http) {

    //var base = "http://localhost:5000";
    var base = "https://testapplication-1.herokuapp.com";

    $scope.fields; // Used for updating form data for post

    $scope.getAll = function (name) {
        $http.get(base+'/api/v1/foodList/data/list').success(function(response) {
          console.log(response);
          $scope.food = response;
        }).error(function (err) {
          console.log(err);
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

    $scope.saveItem=function(){
       /* while compiling form , angular created this object*/
       var objectData = $scope.fields;
       console.log(objectData);
       /* post to server*/
       $http({
            method: 'POST',
            url: base+'/api/v1/foodList/data/item',
            data: objectData,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function(res) {
              $scope.getAll();
        }).error(function (err) {
           console.log("ERROR: " + err);
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

    $scope.deleteItem = function (id) {
        $http.delete(base+'/api/v1/foodList/data/item/' + id, {
            method: 'DELETE',
            params: {
            }
        }).success(function(res) {
           console.log("succesful Deletion");
           $scope.getAll();
         }).error(function (err) {
           console.log(err);
        });
    }

  });
