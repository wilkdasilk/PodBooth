(function() {

  angular
    .module('podBooth')
    .directive('streamControls', streamControls);

  function streamControls() {
    return {
      restrict: 'E',
      templateUrl: '/templates/streamControls',
      controller: 'streamControlsCtrl as streamControlsvm'
    };
  }

})();
