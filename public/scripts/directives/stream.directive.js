(function() {

  angular
    .module('podBooth')
    .directive('stream', stream);

  function stream() {
    return {
      restrict: 'E',
      templateUrl: '/templates/stream',
      controller: 'streamCtrl as streamvm'
    };
  }

})();
