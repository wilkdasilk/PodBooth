(function() {

  angular
    .module('podBooth')
    .controller('streamControlsCtrl', streamControlsCtrl);

  streamControlsCtrl.$inject = ['$http', 'socket', '$scope'];
  function streamControlsCtrl(   $http,   socket,   $scope) {

    var vm = this;
    vm.muted = false;
    vm.toggleMute = function() {
      if(vm.muted) {
        gainNode.gain.value = 1; // gain set to 0 to mute sound
        vm.muted = false;
      } else {
        gainNode.gain.value = 0; // gain set to 1 to unmute sound
        vm.muted = true;
      }
    };

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
        var streamDestination = audioCtx.createMediaStreamDestination();
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(streamDestination);
        gainNode.connect(audioCtx.destination);
        var mediaRecorder = new MediaStreamRecorder(streamDestination.stream);
        mediaRecorder.mimeType = 'audio/wav';
        mediaRecorder.start(2000);
        mediaRecorder.ondataavailable = function(blob) {
          socket.emit('streamSource', blob);
        };

        $scope.$on('$destroy', function() {
          var track = stream.getTracks()[0];  // only one media track
            mediaRecorder.stop();
            track.stop();
        });
      },
      function(err) {
        console.log('The following gUM error occured: ' + err);
      }
    );

  }

})();
