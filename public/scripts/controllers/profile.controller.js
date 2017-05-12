(function() {

  angular
    .module('podBooth')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'podBoothData', 'authentication'];
  function profileCtrl(   $location,   podBoothData,   authentication ) {

    authentication.requireLogin();

    var vm = this;
    vm.user = {};
    vm.clickThru = true;

    podBoothData.getProfile()
      .then(function(response) {
        vm.user = response.data;
        console.log(vm.user);
      }, function(e) {
        console.log(e);
      });
  }

})();
