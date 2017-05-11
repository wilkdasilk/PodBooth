(function() {

  angular
    .module('podBooth')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];

  function registerCtrl(  $location,    authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      avatar : "",
      password : ""
    };

    vm.onSubmit = function() {
      vm.fileSelected = function(files) {
        if (files && files.length) {
          vm.credentials.avatar = files[0];
        }
      };
      authentication
        .register(vm.credentials)
        .then(function(){
          $location.path('profile');
        }, function(err){
          alert(err);
        });
    };
  }

})();
