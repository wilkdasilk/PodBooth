(function() {

  angular
    .module('podBooth')
    .directive('podcast', podcast);

  function podcast() {
    return {
      restrict: 'E',
      templateUrl: '/templates/podcast',
      controller: 'podcastsCtrl as podcastvm'
    };
  }

})();
