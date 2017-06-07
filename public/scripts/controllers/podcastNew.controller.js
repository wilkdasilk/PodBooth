(function() {

  angular
    .module('podBooth')
    .controller('podcastNewCtrl', podcastNewCtrl);

  podcastNewCtrl.$inject = ['$http', '$routeParams', '$location', 'authentication', 'Upload', '$scope'];
  function podcastNewCtrl(   $http,   $routeParams,   $location,   authentication,   Upload,   $scope) {

    authentication.requireLogin();

    var vm = this;

    vm.newPodcast = {
      name: '',
      description: '',
      website: ''
    };

    $scope.$watch('files', function(){
      if ($scope.files != undefined) {
        vm.fileSelected($scope.files)
      }
    });

    vm.fileSelected = function(files) {
      if (files && files.length) {
        vm.newPodcast.image = files[0];
      }
    };

    vm.removeFile = function($event){
      $event.preventDefault();
      $scope.files = undefined;
    }

    vm.createPodcast = function () {
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
