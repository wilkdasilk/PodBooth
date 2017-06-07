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
          _id : payload._id
        };
      }
    };

    var requireLogin = function() {
      if (!isLoggedIn()) {
        $location.path('/');
      }
    }

    register = function(user) {
      return Upload.upload({url: '/api/register', data: user})
                   .then(function(response){
                     saveToken(response.data.token);
                     $rootScope.isLoggedIn = true;
                     $rootScope.currentUser = currentUser();
                   }, function(error){
                     console.log(error);
                     //flash message
                   });
    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(response) {
        saveToken(response.data.token);
        $rootScope.isLoggedIn = true;
        $rootScope.currentUser = currentUser();
      }, function(error){
        console.log(error);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('podbooth-token');
      $rootScope.isLoggedIn = false;
      $rootScope.currentUser = undefined;
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
