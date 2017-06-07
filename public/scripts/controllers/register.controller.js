(function() {

  angular
    .module('podBooth')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication', '$rootScope', '$scope'];

  function registerCtrl(  $location,    authentication,   $rootScope,   $scope) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      avatar : "",
      password : ""
    };


    $scope.$watch('files', function(){
      if ($scope.files != undefined) {
        vm.fileSelected($scope.files)
      }
    });

    vm.fileSelected = function(files) {
      if (files && files.length) {
        vm.credentials.avatar = files[0];
      }
    };

    vm.removeFile = function($event){
      $event.preventDefault();
      $scope.files = undefined;
    }

    vm.onSubmit = function() {
      authentication
        .register(vm.credentials)
        .then(function(){
          $location.path('profile');
        });
    };
  }

})();
