(function() {

  angular
    .module('podBooth')
    .controller('podcastNewCtrl', podcastNewCtrl);

  podcastNewCtrl.$inject = ['$http', '$routeParams', '$location', 'authentication', 'Upload'];
  function podcastNewCtrl(   $http,   $routeParams,   $location,   authentication,   Upload ) {

    authentication.requireLogin();

    var vm = this;

    vm.newPodcast = {
      name: '',
      description: '',
      website: '',
      image: ''
    };

    vm.createPodcast = function () {
      vm.fileSelected = function(files) {
        if (files && files.length) {
          vm.newPodcast.image = files[0];
        }
      }
      console.log(vm.newPodcast);
      Upload.upload({
        url: '/api/podcasts',
        data: vm.newPodcast,
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function (res) {
        $location.path(`/podcasts/${res.data._id}`);
      }, function (err) {
        console.log('There was an error posting the data', err);
      });
    }

  }

})();
