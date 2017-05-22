(function() {

  angular
    .module('podBooth')
    .controller('commentsCtrl', commentsCtrl);

  commentsCtrl.$inject = ['$http', '$routeParams', '$location', 'socket', 'authentication'];
  function commentsCtrl(   $http,   $routeParams,   $location,   socket,   authentication ) {
    var vm = this;

    vm.comments = [];
    vm.newComment = {
      body: '',
      _owner: {
         _id: authentication.currentUser()._id
      },
      podcast: {
        _id: $routeParams.id
      }
    };
    vm.sendComment = function() {
      socket.emit('event', { message: vm.newComment });
      vm.newComment._owner.name = authentication.currentUser().name;
      var now = new Date();
      vm.newComment.created_at = now.toISOString();
      vm.comments.push(angular.copy(vm.newComment));
      vm.newComment.body = '';
    }


    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}/comments`,
      headers: {
        Authorization: 'Bearer ' + authentication.getToken()
      }
    }).then(function(comments) {
      vm.comments = comments.data;
      }, function(err) {
        console.log("error loading comments", err);
    })
    .then(function(){
      socket.emit('room', $routeParams.id);
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
    });
  }

})();