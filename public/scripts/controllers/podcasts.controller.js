(function() {

  angular
    .module('podBooth')
    .controller('podcastsCtrl', podcastsCtrl);

  podcastsCtrl.$inject = ['$http', 'authentication', '$rootScope', '$document', '$scope', '$timeout'];
  function podcastsCtrl(   $http,   authentication,   $rootScope,   $document,   $scope,   $timeout ) {
    var vm = this;
    vm.showAmount = 0;
    vm.showMore = function (){
      vm.showAmount +=10;
    };
    vm.contentLoaded = false;
    vm.clickThru = true;

    vm.podcasts = [];

    $http({
      method: 'GET',
      url: '/api/podcasts'
    }).then(function (res) {
      vm.podcasts = res.data;
      console.log(vm.podcasts);
      var searchbar = $('.input-field.searchbar');
      console.log(searchbar);
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
