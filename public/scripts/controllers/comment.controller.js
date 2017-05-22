(function() {

  angular
    .module('podBooth')
    .controller('commentCtrl', commentCtrl);

  commentCtrl.$inject = ['$http', 'socket', 'authentication'];
  function commentCtrl(   $http,   socket,   authentication) {

    var vm = this;
    vm.user = authentication.currentUser()._id;

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
