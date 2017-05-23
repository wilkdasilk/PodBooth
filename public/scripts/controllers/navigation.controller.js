(function() {

  angular
    .module('podBooth')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication', '$scope'];
  function navigationCtrl(   $location,   authentication,   $scope) {
    var vm = this;

    vm.dropDownConfig = function() {
      return {
        'inDuration': 300,
        'outDuration': 225,
        'constrain_width': false, // Does not change width of dropdown to that of the activator
        'hover': true, // Activate on click
        'alignment': 'left', // Aligns dropdown to left or right edge (works with constrain_width)
        'gutter': 0, // Spacing from edge
        'belowOrigin': true // Displays dropdown below the button
      };
    };
  }


})();
