(function() {

  angular
    .module('podBooth')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', 'authentication', '$rootScope'];
  function logoutCtrl(   $location,   authentication,   $rootScope) {

    authentication
      .logout();
      $rootScope.isLoggedIn = false;
      $rootScope.currentUser = undefined;
      $location.path('home');
  };

})();
