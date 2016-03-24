var app = angular.module('starter.controllers', []);

app.controller('DashCtrl', function($scope, $http, $cordovaOauth) {

  $scope.login = function() {
    facebookLogin($cordovaOauth, $http);
  }

  function facebookLogin($cordovaOauth, $http) {
        $cordovaOauth.facebook("119506955112274", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"})
          .then(function(result){
              displayData($http, result.access_token);
          },  function(error){
                  alert("Error: " + error);
        });
  }

  function displayData($http, access_token) {
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }})
      .then(function(result) {
          console.log(result.data.name);
      }, function(error) {
          alert("Error: " + error);
    });
  }

});

app.controller('MenuCtrl', function($scope, $stateParams, restAPI) {

    $scope.foodsToday;

    $scope.getFood = function() {
      restAPI.getFood().success(function(result) {
        $scope.foodsToday = result;
        console.log(JSON.stringify($scope.foodsToday));
      });
    };

    $scope.foodsYesterday = [ { name: 'Lasagna' ,
                            price: '$7.00',
                            description: 'Fresh Vegetarian Lasagna',
                            chef: 'Alex Smith' ,
                            rating: '2'} ,
                         { name: 'Tacos' ,
                          price: '$3.00' ,
                          description: 'Four beef tacos with cheese',
                          chef: 'Tom Brady',
                          rating: '5'} ,
                         { name : 'Cake' ,
                          price: '$2.50',
                          description: 'Six slices of Chocolate Cake',
                          chef: 'Aaron Rodgers',
                          rating: '5'} ,

                        ];
});
