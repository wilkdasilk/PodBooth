(function(){

  angular
    .module('podBooth')
    .service('podBoothData', podBoothData);

  podBoothData.$inject = ['$http', 'authentication'];
  function podBoothData(   $http,   authentication) {
    var getProfile = function() {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };
    return {
      getProfile : getProfile
    };
  }


})();
