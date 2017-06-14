(function() {

  angular
    .module('podBooth')
    .controller('commentCtrl', commentCtrl);

  commentCtrl.$inject = ['$http', 'socket', 'authentication', '$scope', 'charactersFilter'];
  function commentCtrl(   $http,   socket,   authentication,   $scope,   charactersFilter) {

    var vm = this;
    vm.user = authentication.currentUser()._id;

    vm.showBody = charactersFilter($scope.comment.body, 100, false);
    vm.truncated = (vm.showBody != $scope.comment.body);
    vm.showMore = false;

    vm.toggleShowMore = function(e) {
      e.preventDefault();
      vm.showMore= !vm.showMore;
    }

    vm.upvote = function(comment) {
      socket.emit('upvote', {upvote: { comment: comment._id, user: vm.user }});
      console.log("upvote sent");
    };

    vm.unvote = function(comment) {
      socket.emit('unvote', {unvote: { comment: comment._id, user: vm.user }});
      console.log("unvote sent");
    };

    vm.upvoted = function(comment) {
      return comment.upvoters.includes(`${vm.user}`);
    };
  }

})();
