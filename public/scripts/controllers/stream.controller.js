(function() {

  angular
    .module('podBooth')
    .controller('streamCtrl', streamCtrl);

  streamCtrl.$inject = ['$http', 'socket', '$scope'];
  function streamCtrl(   $http,   socket,   $scope) {

    var vm = this;

    //for reference see https://stackoverflow.com/questions/20475982/choppy-inaudible-playback-with-chunked-audio-through-web-audio-api
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var delayTime = 0;
    var init = 0;
    var audioStack = [];
    var nextTime = 0;

    socket.on('liveStream', handoffAudio);

    $scope.$on('$destroy', function(){
      audioCtx.close();
    });

    function handoffAudio(data) {
      var currentChunk = data.liveStream;
      audioCtx.decodeAudioData(currentChunk).then(function(buffer) {
        console.log("we made it inside the success callback");
        audioStack.push(buffer);
        if ((init!=0) || (audioStack.length > 2)) {
          init++;
          scheduleBuffers();
        }
      }, function(err) {
        console.log("Error decoding audio data", err);
      });
    }

    //major help via https://stackoverflow.com/questions/21288726/web-audio-playing-back-in-chrome-but-not-firefox
    function scheduleBuffers() {
      while (audioStack.length) {
        console.log(audioStack);
        var chunk = audioStack.shift();
        console.log(audioCtx);
        var source = audioCtx.createBufferSource();

        source.buffer = chunk;
        source.connect(audioCtx.destination);
        if (nextTime == 0) {
          nextTime = audioCtx.currentTime + 0.05;
        }
        source.start(nextTime);
        nextTime += source.buffer.duration;
        console.log(nextTime);
      };
    }

  }

})();
