(function () {

  angular
    .module('podBooth')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', '$location'];
  function authentication (  $http,   $window,   $location ) {

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
          name : payload.name
        };
      }
    };

    var requireLogin = function() {
      if (!isLoggedIn()) {
        $location.path('/');
      }
    }

    register = function(user) {
      return $http.post('/api/register', user).then(function(response){
        saveToken(response.data.token);
      }, function(error){
        console.log(error);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(response) {
        saveToken(response.data.token);
      }, function(error){
        console.log(error);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('podbooth-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout,
      requireLogin : requireLogin
    };
  }

})();
