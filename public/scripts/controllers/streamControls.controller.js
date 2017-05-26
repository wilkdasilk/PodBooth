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
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        $scope.$on('$destroy', function() {
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
