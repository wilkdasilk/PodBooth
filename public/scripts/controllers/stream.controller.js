(function() {

  angular
    .module('podBooth')
    .controller('streamCtrl', streamCtrl);

  streamCtrl.$inject = ['$http', 'socket', '$scope', '$document', '$timeout'];
  function streamCtrl(   $http,   socket,   $scope,   $document,   $timeout) {

    var vm = this;
    $scope.myVolume = {volume:100};
    vm.connect = [true, false];

    //for reference see https://stackoverflow.com/questions/20475982/choppy-inaudible-playback-with-chunked-audio-through-web-audio-api
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var delayTime = 0;
    var init = 0;
    var audioStack = [];
    var nextTime = 0;
    var volumeNode = audioCtx.createGain();

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


    socket.on('liveStream', handoffAudio);

    $scope.$on('$destroy', function(){
      audioCtx.close();
    });

    function handoffAudio(data) {

      //better solution, wrap socket off in socket service, call on 'liveStream'
      if (audioCtx.state != "closed") {

        var currentChunk = data.liveStream;
        audioCtx.decodeAudioData(currentChunk).then(function(buffer) {
          audioStack.push(buffer);
          if ((init!=0) || (audioStack.length > 2)) {
            init++;
            scheduleBuffers();
          }
        }, function(err) {
          console.log("Error decoding audio data", err);
        });
      }

    }

    function scheduleBuffers() {
      while (audioStack.length) {
        var chunk = audioStack.shift();
        var source = audioCtx.createBufferSource();

        source.buffer = chunk;
        source.connect(volumeNode);
        volumeNode.connect(audioCtx.destination);

        if (nextTime == 0) {
          nextTime = audioCtx.currentTime + 0.05;
        }
        source.start(nextTime);
        nextTime += source.buffer.duration;
      };
    }

  }

})();
