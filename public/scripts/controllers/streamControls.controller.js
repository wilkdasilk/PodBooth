(function() {

  angular
    .module('podBooth')
    .controller('streamControlsCtrl', streamControlsCtrl);

  streamControlsCtrl.$inject = ['$http', 'socket', '$scope', '$document', '$timeout'];
  function streamControlsCtrl(   $http,   socket,   $scope,   $document,   $timeout) {

    var vm = this;
    vm.muted = false;
    $scope.myVolume = {volume:100};
    vm.connect = [true, false];


    navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var gainNode = audioCtx.createGain();
    var volumeNode = audioCtx.createGain();

    vm.toggleMute = function() {
      if(vm.muted) {
        gainNode.gain.value = 1; // gain set to 0 to mute sound
        vm.muted = false;
      } else {
        gainNode.gain.value = 0; // gain set to 1 to unmute sound
        vm.muted = true;
      }
    };

    $document.ready(function(){
      angular.element("#nouislider")[0].noUiSlider.on('update', function(values, input) {
          $timeout(function() {
              $scope.myVolume.volume = values;
          });
      });
    });

    $scope.$watch(function(){
      return $scope.myVolume.volume;
    }, function(){
      volumeNode.gain.value = $scope.myVolume.volume/100;
    }, true);


    navigator.getUserMedia(
      { audio: true },
      function(stream){
        var streamDestination = audioCtx.createMediaStreamDestination();
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(gainNode);
        gainNode.connect(streamDestination);
        gainNode.connect(volumeNode);
        volumeNode.connect(audioCtx.destination);
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
            audioCtx.close();
        });
      },
      function(err) {
        console.log('The following gUM error occured: ' + err);
      }
    );

  }

})();
