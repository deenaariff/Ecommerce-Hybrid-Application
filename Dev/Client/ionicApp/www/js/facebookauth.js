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
