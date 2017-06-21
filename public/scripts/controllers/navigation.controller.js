(function() {

  angular
    .module('podBooth')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication', '$scope'];
  function navigationCtrl(   $location,   authentication,   $scope) {
    var vm = this;

  }


})();
