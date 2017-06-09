(function() {

  angular
    .module('podBooth')
    .controller('registerUpdateCtrl', registerUpdateCtrl);

  registerUpdateCtrl.$inject = ['$location', 'authentication', '$rootScope', '$scope'];

  function registerUpdateCtrl(  $location,    authentication,   $rootScope,   $scope) {
    var vm = this;

    authentication.requireLogin();
    vm.credentials = {};
    vm.credentials.name = $rootScope.currentUser.name;
    vm.credentials.email = $rootScope.currentUser.email;
    vm.credentials.avatar = $rootScope.currentUser.avatar;

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
      vm.credentials.avatar = undefined;
    }

    vm.onSubmit = function() {
      authentication
        .update(vm.credentials)
        .then(function(){
          $location.path('profile');
        });
    };
  }

})();
