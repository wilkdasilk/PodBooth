(function() {

  angular
    .module('podBooth')
    .controller('podcastsCtrl', podcastsCtrl);

  podcastsCtrl.$inject = ['$http', 'authentication'];
  function podcastsCtrl(   $http,   authentication ) {
    var vm = this;
    vm.clickThru = true;

    vm.podcasts = [];

    $http({
      method: 'GET',
      url: '/api/podcasts'
    }).then(function (res) {
      console.log("got data");
      vm.podcasts = res.data;
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

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
      return podcast.subscribers.includes(authentication.currentUser()._id);
    }

  }

})();
