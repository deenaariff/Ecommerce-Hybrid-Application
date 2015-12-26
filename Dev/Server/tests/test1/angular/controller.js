var Controllers = angular.module('Controllers',[])

Controllers.controller('MainCtrl', function($scope, $http) {

    var base = "http://localhost:5000";

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
       var objectData = JSON.stringify($scope.fields);
       console.log(objectData);
       /* post to server*/
       $http({
            method: 'POST',
            url: base+'/api/v1/foodList/data/item',
            params: {
              token: objectData
            },
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function(res) {
           if (objectData === res)
              console.log("POST SUCCESFULL");
           else
              console.log("WARNING: Incorrect Data Saved");
         }).error(function (err) {
           console.log("ERROR: " + err.message);
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
