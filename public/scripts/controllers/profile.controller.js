(function() {

  angular
    .module('podBooth')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'podBoothData'];
  function profileCtrl(   $location,   podBoothData) {
    var vm = this;

    vm.user = {};

    podBoothData.getProfile()
      .then(function(response) {
        vm.user = response.data;
      }, function(e) {
        console.log(e);
      });
  }

})();
