(function() {

  angular
    .module('podBooth')
    .controller('streamCtrl', streamCtrl);

  streamCtrl.$inject = ['$http', 'socket'];
  function streamCtrl(   $http,   socket) {

    var vm = this;

  }

})();
