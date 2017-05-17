(function() {

  angular
    .module('podBooth')
    .controller('podcastShowCtrl', podcastShowCtrl);

  podcastShowCtrl.$inject = ['$http', '$routeParams', '$location'];
  function podcastShowCtrl(   $http,   $routeParams,   $location ) {
    var vm = this;
    vm.clickThru = false;

    vm.podcast = [];

    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}`
    }).then(function (res) {
      vm.podcast = [res.data];
      console.log(vm.podcast);
      if (vm.podcast[0] == null) {
        //no podcast found
        $location.path('/podcasts');
      }
      vm.socket = io.connect('/');
      vm.socket.on('connect', function() {
        vm.socket.emit('room', $routeParams.id);
      });
      vm.socket.on('announcements', function(data) {
        console.log('Got announcement:', data.message);
      });
      vm.socket.emit('event', { message: "Hey it's a message!" });
      vm.socket.on('stats', function(data) {
        console.log('Connected clients:', data.numClients);
      });
      vm.socket.on('message', function(data) {
        console.log('got a message:', data.message);
      });
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
