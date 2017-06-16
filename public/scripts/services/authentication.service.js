(function () {

  angular
    .module('podBooth')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', '$location', 'Upload', '$rootScope'];
  function authentication (  $http,   $window,   $location,   Upload,   $rootScope ) {

    var saveToken = function (token) {
      $window.localStorage['podbooth-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['podbooth-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name,
          avatar : payload.avatar,
          _id : payload._id
        };
      }
    };

    var requireLogin = function() {
      if (!isLoggedIn()) {
        $rootScope.userAlerts.push("You must be logged in!");
        $location.path('/');
      }
    }

    var requireLoggedOut = function() {
      if (isLoggedIn()) {
        $rootScope.userAlerts.push("You're already logged in!");
        $location.path('/profile');
      }
    }

    register = function(user) {
      return Upload.upload(
        {url: '/api/register',
        data: user
      }).then(function(response){
        saveToken(response.data.token);
        $rootScope.isLoggedIn = true;
        $rootScope.currentUser = currentUser();
        $rootScope.userAlerts.push(`Welcome, ${$rootScope.currentUser.name}!`);
      }, function(error){
        console.log(error);
        $rootScope.userAlerts.push("Uh oh, could not create your account.")
      });

    };

    update = function(user) {
      return Upload.upload({
        url: '/api/register',
        data: user,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      }).then(function(response){
        saveToken(response.data.token);
        $rootScope.currentUser = currentUser();
        $rootScope.userAlerts.push("Account updated successfully!");
      }, function(error){
        console.log("error updating account",error);
        $rootScope.userAlerts.push("Could not update your account");
      });

    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(response) {
        saveToken(response.data.token);
        $rootScope.isLoggedIn = true;
        $rootScope.currentUser = currentUser();
        $rootScope.userAlerts.push(`Welcome back, ${$rootScope.currentUser.name}!`);
      }, function(error){
        $rootScope.userAlerts.push("Uh oh, couldn't log in!");
      });
    };

    logout = function() {
      $window.localStorage.removeItem('podbooth-token');
      $rootScope.isLoggedIn = false;
      $rootScope.currentUser = undefined;
      $rootScope.userAlerts.push("Signed out!")
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      update : update,
      login : login,
      logout : logout,
      requireLogin : requireLogin,
      requireLoggedOut : requireLoggedOut
    };
  }

})();
