(function() {

  angular
    .module('podBooth')
    .controller('podcastNewCtrl', podcastNewCtrl);

  podcastNewCtrl.$inject = ['$http', '$routeParams', '$location', 'authentication'];
  function podcastNewCtrl(   $http,   $routeParams,   $location,   authentication ) {

    authentication.requireLogin();

    var vm = this;

    vm.newPodcast = {
      name: '',
      description: '',
      website: '',
      image: ''
    };

    vm.createPodcast = function () {
        $http({
          method: 'POST',
          url: '/api/podcasts',
          data: vm.newPodcast,
        }).then(function (res) {
          $location.path(`/podcasts/${res.data._id}`);
        }, function (err) {
          console.log('There was an error posting the data', err);
        });
      }

  }

})();
