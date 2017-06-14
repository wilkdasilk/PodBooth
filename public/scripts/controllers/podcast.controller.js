(function() {

  angular
    .module('podBooth')
    .controller('podcastCtrl', podcastCtrl);

  podcastCtrl.$inject = ['$http', 'authentication', '$rootScope', '$scope', '$location', 'charactersFilter'];
  function podcastCtrl(   $http,   authentication,   $rootScope,   $scope,   $location,   charactersFilter ) {
    var vm = this;

    vm.clickThruAction = function (){
      if ($location.path() != `/podcasts/${$scope.podcast._id}`) {
        $location.path(`/podcasts/${$scope.podcast._id}`);
      }
    };

    vm.notClickThru = function(e) {
      e.stopPropagation();
    }

    vm.toggleShowMore = function(e) {
      e.preventDefault();
      vm.showMore= !vm.showMore;
    }

    $scope.$watch(
      function(){
        return $scope.podcast;
      },
      function(){
        $('.podcast.hidden').fadeIn(1500);
      }, true);

    vm.showDescription = charactersFilter($scope.podcast.description, 250, false);
    vm.truncated = (vm.showDescription != $scope.podcast.description);
    vm.showMore = false;

    vm.subscribe = function(podcast) {
      $http({
        method: 'POST',
        url: `/api/podcasts/${podcast._id}/subscribe`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }). then(function(res){
        $scope.podcast.subscribers.push($rootScope.currentUser._id);
      }, function(err){
        console.log(err);
      })
    }

    vm.unsubscribe = function(podcast) {
      $http({
        method: 'DELETE',
        url: `/api/podcasts/${podcast._id}/subscribe`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function(res){
        var index = $scope.podcast.subscribers.indexOf($rootScope.currentUser._id);
        if (index > -1) {
          $scope.podcast.subscribers.splice(index,1);
        }
      })
    }

    vm.isLive = function() {
      if ($scope.podcast.latestBroadcast) {
        return $scope.podcast.latestBroadcast.active;
      } else {
        return false;
      }
    }

    vm.subscribed = function(podcast) {
      return podcast.subscribers.includes($rootScope.currentUser._id);
    }

    vm.isOwner = function(podcast) {
      return podcast._owner._id == $rootScope.currentUser._id;
    }

    vm.destroy = function(podcast) {
      $http({
        method: 'DELETE',
        url: `/api/podcasts/${podcast._id}`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function(){
        $location.path('podcasts');
      }, function(err){
        console.log("an error occured while deleting", err);
      })
    }
  }

})();
