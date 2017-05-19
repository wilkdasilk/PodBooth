(function() {

  angular
    .module('podBooth')
    .controller('podcastShowCtrl', podcastShowCtrl);

  podcastShowCtrl.$inject = ['$http', '$routeParams', '$location', 'socket', 'authentication'];
  function podcastShowCtrl(   $http,   $routeParams,   $location,   socket,   authentication ) {
    var vm = this;
    vm.clickThru = false;

    vm.podcast = [];
    vm.comments = [];
    vm.newComment = {
      time: Date.now(),
      body: '',
      user: {
         _id: authentication.currentUser()._id,
        name: authentication.currentUser().name
      }
    }
    vm.sendComment = function() {
      vm.newComment.time = Date.now();
      socket.emit('event', { message: vm.newComment });
      vm.comments.push(angular.copy(vm.newComment));
      vm.newComment.body = '';
    }


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
      socket.on('loadComments', function(data) {
        console.log('got saved comments:', data.comments);
        data.comments.forEach(function(comment) {
          vm.comments.push(data.comment);
        });
      });
      socket.on('announcements', function(data) {
        console.log('Got announcement:', data.message);
      });
      socket.on('stats', function(data) {
        console.log('Connected clients:', data.numClients);
      });
      socket.on('message', function(data) {
        console.log('got a message:', data.message);
        vm.comments.push(data.message);
      });
    }, function (err) {
      console.log('There was an error getting the data', err);
    });

  }

})();
