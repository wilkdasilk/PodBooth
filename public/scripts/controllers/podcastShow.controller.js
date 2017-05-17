(function() {

  angular
    .module('podBooth')
    .controller('podcastShowCtrl', podcastShowCtrl);

  podcastShowCtrl.$inject = ['$http', '$routeParams', '$location', 'socket'];
  function podcastShowCtrl(   $http,   $routeParams,   $location,   socket ) {
    var vm = this;
    vm.clickThru = false;

    vm.podcast = [];
    vm.messages = [];


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
      socket.emit('room', $routeParams.id);
      socket.on('announcements', function(data) {
        console.log('Got announcement:', data.message);
      });
      socket.emit('event', { message: "Hey it's a message!" });
      socket.on('stats', function(data) {
        console.log('Connected clients:', data.numClients);
      });
      socket.on('message', function(data) {
        console.log('got a message:', data.message);
        vm.messages.push(data.message);
      });
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
