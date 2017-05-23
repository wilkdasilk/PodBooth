(function() {

  angular
    .module('podBooth')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication', '$rootScope'];
  function loginCtrl(   $location,   authentication,   $rootScope) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function() {
      authentication
        .login(vm.credentials)
        .then(function() {
          $rootScope.isLoggedIn = true;
          $rootScope.currentUser = authentication.currentUser();
          $location.path('profile');
        }, function(err) {
          alert(err);
        });
    };
  }

})();
