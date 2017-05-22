(function() {

  angular
    .module('podBooth')
    .directive('comment', comment);

  function comment() {
    return {
      restrict: 'E',
      templateUrl: '/templates/comment',
      controller: 'commentCtrl as commentvm'
    };
  }

})();
