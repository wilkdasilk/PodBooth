(function() {

  angular
    .module('podBooth')
    .controller('streamControlsCtrl', streamControlsCtrl);

  streamControlsCtrl.$inject = ['$http', 'socket', '$scope', '$location'];
  function streamControlsCtrl(   $http,   socket,   $scope,   $location) {

    var vm = this;

    navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var gainNode = audioCtx.createGain();

    navigator.getUserMedia(
      { audio: true },
      function(stream){
        console.log("inside successful stream callback");
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        $scope.$on('$locationChangeStart', function(event) {
          var track = stream.getTracks()[0];  // only one media track
            track.stop();
        });
      },
      function(err) {
        console.log('The following gUM error occured: ' + err);
      }
    );

  }

})();
