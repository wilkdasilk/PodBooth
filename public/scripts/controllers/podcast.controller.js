(function() {

  angular
    .module('podBooth')
    .controller('podcastCtrl', podcastCtrl);

  podcastCtrl.$inject = ['$http', 'authentication', '$rootScope', '$scope'];
  function podcastCtrl(   $http,   authentication,   $rootScope,   $scope ) {
    var vm = this;

    vm.subscribe = function(podcast) {
      $http({
        method: 'POST',
        url: `/api/podcasts/${podcast._id}/subscribe`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }). then(function(res){
        if (res.status == 204) {
          $scope.podcast.subscribers.push($rootScope.currentUser._id);
        }
      })
    }

    vm.unsubscribe = function(podcast) {
      $http({
        method: 'DELETE',
        url: `/api/podcasts/${podcast._id}/subscribe`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }). then(function(res){
        var index = $scope.podcast.subscribers.indexOf($rootScope.currentUser._id);
        if (index > -1) {
          $scope.podcast.subscribers.splice(index,1);
        }
      })
    }

    vm.subscribed = function(podcast) {
      return podcast.subscribers.includes($rootScope.currentUser._id);
    }

  }

})();
