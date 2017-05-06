(function() {

  angular
    .module('podBooth')
    .directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: '/templates/navigation',
      controller: 'navigationCtrl as navvm'
    };
  }

})();
