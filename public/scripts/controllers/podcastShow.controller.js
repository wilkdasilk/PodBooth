(function() {

  angular
    .module('podBooth')
    .controller('podcastShowCtrl', podcastShowCtrl);

  podcastShowCtrl.$inject = ['$http', '$routeParams', '$location', 'authentication', '$rootScope'];
  function podcastShowCtrl(   $http,   $routeParams,   $location,   authentication,   $rootScope ) {
    var vm = this;
    vm.clickThru = false;

    vm.podcast = [];
    vm.isOwner = function() {
      return vm.podcast._owner == $rootScope.currentUser._id;
    };
    vm.subscribed = function(podcast) {
      return podcast.subscribers.includes($rootScope.currentUser._id);
    };

    vm.createBroadcast = function(){
      $http({
        method: 'POST',
        url: '/api/broadcasts',
        data: {podcastId: $routeParams.id},
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function(res){
        vm.podcast.latestBroadcast = res.data;
        vm.isLive = vm.podcast[0].latestBroadcast.active;
      }, function(err) {
        console.log("error creating broadcast,", err);
      });
    }

    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}`
    }).then(function (res) {
      vm.podcast = [res.data];
      if (!!vm.podcast[0].latestBroadcast) {
        vm.isLive = vm.podcast[0].latestBroadcast.active;
      } else {
        vm.isLive = false;
      }
      if (vm.podcast[0] == null) {
        //no podcast found
        $location.path('/podcasts');
      }
    }, function (err) {
      console.log('There was an error getting the data', err);
    })
  }

})();
