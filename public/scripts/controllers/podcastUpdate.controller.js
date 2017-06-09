(function() {

  angular
    .module('podBooth')
    .controller('podcastUpdateCtrl', podcastUpdateCtrl);

  podcastUpdateCtrl.$inject = ['$http', '$routeParams', '$location', 'authentication', 'Upload', '$scope'];
  function podcastUpdateCtrl(   $http,   $routeParams,   $location,   authentication,   Upload,   $scope) {

    authentication.requireLogin();

    var vm = this;

    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}`
    }).then(function (res) {
      vm.revisedPodcast = res.data;
    },function(err) {
      console.log("there was an error getting the data", err);
    });

    $scope.$watch('files', function(){
      if ($scope.files != undefined) {
        vm.fileSelected($scope.files)
      }
    });

    vm.fileSelected = function(files) {
      if (files && files.length) {
        vm.revisedPodcast.image = files[0];
      }
    };

    vm.removeFile = function($event){
      $event.preventDefault();
      $scope.files = undefined;
      vm.revisedPodcast.image = undefined;
    }

    vm.updatePodcast = function () {
      Upload.upload({
        url: `/api/podcasts/${$routeParams.id}`,
        data: vm.revisedPodcast,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function (res) {
        $location.path(`/podcasts/${$routeParams.id}`);
      }, function (err) {
        console.log('There was an error udpating the podcast', err);
        $location.path(`/podcasts/`);
        //flash message
      });
    }

  }

})();
