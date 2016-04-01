var app = angular.module('starter.controllers', []);

app.controller('LoginCtrl', function($scope, $state, $q, userAPI, $ionicLoading) {
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
  }

  var authResponse = response.authResponse;

  getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      userAPI.addUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('app.home');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected') {

        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = UserService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// Currently saving to local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

						$state.go('HOME');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('HOME');
				}
      } else {

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the fb permissions
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

});

app.controller('MenuCtrl', function($scope, $stateParams, transactionAPI) {

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
                          { name : 'Cake' ,
                           price: '$2.50',
                           description: 'Six slices of Chocolate Cake',
                           chef: 'Aaron Rodgers',
                           rating: '5'} ,
                           { name : 'Cake' ,
                            price: '$2.50',
                            description: 'Six slices of Chocolate Cake',
                            chef: 'Aaron Rodgers',
                            rating: '5'}

                        ];
});
