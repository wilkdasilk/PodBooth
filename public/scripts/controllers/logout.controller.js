(function() {

  angular
    .module('podBooth')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', 'authentication'];
  function logoutCtrl(   $location,   authentication) {

    authentication
      .logout();
      $location.path('home');    
  };

})();
