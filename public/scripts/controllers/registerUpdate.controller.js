(function() {

  angular
    .module('podBooth')
    .controller('registerUpdateCtrl', registerUpdateCtrl);

  registerUpdateCtrl.$inject = ['$location', 'authentication', '$rootScope', '$scope'];

  function registerUpdateCtrl(  $location,    authentication,   $rootScope,   $scope) {
    var vm = this;

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
