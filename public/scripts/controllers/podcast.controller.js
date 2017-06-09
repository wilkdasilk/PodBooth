(function() {

  angular
    .module('podBooth')
    .controller('podcastCtrl', podcastCtrl);

  podcastCtrl.$inject = ['$http', 'authentication', '$rootScope', '$scope', '$location'];
  function podcastCtrl(   $http,   authentication,   $rootScope,   $scope,   $location ) {
    var vm = this;

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
