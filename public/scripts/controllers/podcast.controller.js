(function() {

  angular
    .module('podBooth')
    .controller('podcastCtrl', podcastCtrl);

  podcastCtrl.$inject = ['$http', 'authentication', '$rootScope'];
  function podcastCtrl(   $http,   authentication, $rootScope ) {
    var vm = this;

    vm.subscribe = function(podcast) {
      $http({
        method: 'POST',
        url: `/api/podcasts/${podcast._id}/subscribe`,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }). then(function(res){
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
      })
    }

    vm.subscribed = function(podcast) {
      return podcast.subscribers.includes($rootScope.currentUser._id);
    }

  }

})();
