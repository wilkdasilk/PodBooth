(function() {

  angular
    .module('podBooth')
    .controller('podcastsCtrl', podcastsCtrl);

  podcastsCtrl.$inject = ['$http'];
  function podcastsCtrl(   $http ) {
    var vm = this;
    vm.clickThru = true;

    vm.podcasts = [];

    $http({
      method: 'GET',
      url: '/api/podcasts'
    }).then(function (res) {
      vm.podcasts = res.data;
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
