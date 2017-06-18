(function() {

  angular
    .module('podBooth')
    .controller('toastCtrl', toastCtrl);

  toastCtrl.$inject = ['$scope', '$rootScope', '$timeout'];
  function toastCtrl(   $scope,   $rootScope,   $timeout) {
    var vm = this;

    vm.listening = false;

    $scope.$watch(
      function() {
        return $rootScope.userAlerts;
      },
      function(){
        if ($rootScope.userAlerts.length >0) {
          $rootScope.userAlerts.forEach(function(alert){
            Materialize.toast(alert, 3000);
            if (!vm.listening) {
              $('#toast-container').on('click', '.toast', function(e){
                // there's weird DOM behavior where removing an element and clicking the one before acts as clicking the same element
                // var clicks = $.data(this,"clicks");
                // if (!clicks) {
                //   clicks = 0;
                // }
                // $.data(this,"clicks", clicks + 1);
                // console.log(clicks + 1);
                $(this).addClass('hide-toast');
              });
              vm.listening=true;
            }
          });
          $rootScope.userAlerts = [];
        }
    }, true);

  }


})();
