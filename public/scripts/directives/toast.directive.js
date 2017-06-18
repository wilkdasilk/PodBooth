(function() {

  angular
    .module('podBooth')
    .directive('toast', toast);

  function toast() {
    return {
      restrict: 'E',
      controller: 'toastCtrl as toastvm'
    };
  }

})();
