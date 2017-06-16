(function() {

  angular
    .module('podBooth')
    .controller('commentsCtrl', commentsCtrl);

  commentsCtrl.$inject = ['$http', '$routeParams', '$location', 'socket', 'authentication', '$timeout', '$scope'];
  function commentsCtrl(   $http,   $routeParams,   $location,   socket,   authentication,   $timeout,   $scope ) {
    var vm = this;
    vm.sort = '-upvoters.length';
    vm.sortByTime = function(){
      if (vm.sort == '-upvoters.length') {
        vm.sort = '-created_at'
      }
    };
    vm.sortByVote = function(){
      if(vm.sort == '-created_at') {
        vm.sort = '-upvoters.length'
      }
    };

    vm.haveComments = function() {
      return vm.comments.length>0
    };

    vm.comments = [];
    vm.newComment = {
      body: '',
      _owner: {
         _id: authentication.currentUser()._id
      }
    };
    $scope.$watch('podcast', function(podcast) {
      if (!!podcast) {
        vm.newComment.broadcast = {
          _id: podcast.latestBroadcast._id
        }
      }
    });

    vm.sendComment = function() {
      socket.emit('event', { message: vm.newComment });
      vm.newComment.body = '';
    }


    $http({
      method: 'GET',
      url: `/api/podcasts/${$routeParams.id}/comments`,
      headers: {
        Authorization: 'Bearer ' + authentication.getToken()
      }
    }).then(function(comments) {

      if (comments.status != 204) {
        vm.comments = comments.data;
      } else {
        console.log("broadcast has no comments");
      }
      }, function(err) {
        console.log("error loading comments", err);
    })
    .then(function(){
      console.log("scope.podcast is", $scope.podcast.latestBroadcast);
      socket.emit('room', $scope.podcast.latestBroadcast._id);
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
      socket.on('upvote', function(data) {
        var index = vm.comments.findIndex(function(comment) {
          return comment._id == data.upvote._id
        });
        $timeout(function() {
          vm.comments[index] = data.upvote;
        });
      });
      socket.on('unvote', function(data) {
        var index = vm.comments.findIndex(function(comment) {
          return comment._id == data.unvote._id
        });
        $timeout(function() {
          vm.comments[index] = data.unvote;
        });
      });
    });
  }

})();
