(function() {

  angular
    .module('podBooth')
    .directive('comments', comments);

  function comments() {
    return {
      restrict: 'E',
      templateUrl: '/templates/comments',
      controller: 'commentsCtrl as commentsvm'
    };
  }

})();
