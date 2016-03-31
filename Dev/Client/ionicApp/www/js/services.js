var servicesModule = angular.module('starter.services', [])

servicesModule.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

servicesModule.service('transactionAPI', function($http) {
  // Might use a resource here that returns a JSON array
  var base = "http://localhost:5000/"
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    getFood: function () {
      return $http.get(base+'/api/v1/transactions/')
        .success(function(response) {
          return response;
        }).error(function (err) {
      });
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

servicesModule.factory('userAPI', function($http) {
  return {
    addUser: function (user) {
      return $http.post({
          url: base+'/api/v1/users/addUser',
          data: user
      }).success(function(res) {
          return res;
      }).error(function (err) {
          return err;
      });
    },
    deleteUser: function(userId) {
      return $http.delete({
        url: base+'/api/v1/users/deleteUser',
        data: user
      }).success(function(res) {
          return res;
      }).error(function (err) {
          return err;
      });
    }
  }
});
