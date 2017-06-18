(function() {

  angular
    .module('podBooth')
    .controller('podcastShowCtrl', podcastShowCtrl);

  podcastShowCtrl.$inject = ['$http', '$routeParams', '$location', 'authentication', '$rootScope', '$window', '$scope'];
  function podcastShowCtrl(   $http,   $routeParams,   $location,   authentication,   $rootScope,   $window,   $scope) {
    var vm = this;
    vm.clickThru = false;

    var windowEl = angular.element($window);
    $scope.scrolledLow = (windowEl.scrollTop() + windowEl.innerHeight()>= $('footer').position().top);

    vm.podcast = [];
    vm.isOwner = (function() {
      if (vm.podcast[0]){
        return vm.podcast[0]._owner._id == $rootScope.currentUser._id;
      }
    })();
    vm.subscribed = function(podcast) {
      if (podcast){
        return podcast.subscribers.includes($rootScope.currentUser._id);
      }
      else {
        return false;
      }
    };

    windowEl.on('scroll', function(){
      $scope.scrolledLow = (windowEl.scrollTop() + windowEl.innerHeight()>= $('footer').position().top);
      $scope.$apply();
    });

    vm.createBroadcast = function(){
      $http({
        method: 'POST',
        url: '/api/broadcasts',
        data: {podcastId: $routeParams.id},
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function(res){
        vm.podcast[0].latestBroadcast = res.data;
        vm.isLive = vm.podcast[0].latestBroadcast.active;
      }, function(err) {
        console.log("error creating broadcast,", err);
      });
    }

    vm.endBroadcast = function(){
      $http({
        method: 'PUT',
        url: `/api/broadcasts/${vm.podcast[0].latestBroadcast._id}`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function(res){
        vm.isLive = res.data.active;
        vm.podcast[0].latestBroadcast.active = res.data.active;
      }, function(err) {
        console.log("error ending broadcast,", err);
      });
    }

    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}`
    }).then(function (res) {
      vm.podcast = [res.data];
      if ($rootScope.currentUser){
        vm.isOwner = vm.podcast[0]._owner._id == $rootScope.currentUser._id;
      } else {
        vm.isOwner = false;
      }
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
