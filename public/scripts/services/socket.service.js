(function () {

  angular
    .module('podBooth')
    .factory('socket', socketFactory);

  socketFactory.$inject = ['$rootScope'];
  function socketFactory(   $rootScope ) {
    var socket = io.connect('/');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },
      // off: function (eventName, callback) {
      //   socket.off(eventName, function() {
      //     var args = arguments;
      //     $rootScope.$apply(function() {
      //       if (callback) {
      //       callback.apply(socket, args);
      //       }
      //     });
      //   });
      // },
      emit: function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };

  }

})();
