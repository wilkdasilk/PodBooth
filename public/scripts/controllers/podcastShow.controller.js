(function() {

  angular
    .module('podBooth')
    .controller('podcastShowCtrl', podcastShowCtrl);

  podcastShowCtrl.$inject = ['$http', '$routeParams', '$location'];
  function podcastShowCtrl(   $http,   $routeParams,   $location ) {
    var vm = this;
    vm.clickThru = false;


    vm.podcast = [];

    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}`
    }).then(function (res) {
      vm.podcast = [res.data];
      if (vm.podcast[0] == null) {
        //no podcast found
        $location.path('podcasts');
      };
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
