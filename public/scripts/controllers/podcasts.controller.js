(function() {

  angular
    .module('podBooth')
    .controller('podcastsCtrl', podcastsCtrl);

  podcastsCtrl.$inject = ['$http', 'authentication', '$rootScope'];
  function podcastsCtrl(   $http,   authentication, $rootScope ) {
    var vm = this;
    vm.showAmount = 10;
    vm.showMore = function (){
      vm.showAmount +=10;
    };

    vm.clickThru = true;

    vm.podcasts = [];

    $http({
      method: 'GET',
      url: '/api/podcasts'
    }).then(function (res) {
      vm.podcasts = res.data;
      console.log(vm.podcasts);
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
