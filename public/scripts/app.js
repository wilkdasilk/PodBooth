console.log("Sanity check, we're connected!");

(function() {

  angular.module('podBooth', ['ngRoute']);

  function config(   $routeProvider,   $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'/templates/home',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/templates/register',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/templates/login',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/templates/profile',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/logout', {
        templateUrl: '/templates/logout',
        controller: 'logoutCtrl',
        controllerAs: 'vm'
      })
      .when('/podcasts', {
        templateUrl: '/templates/podcasts',
        controller: 'podcastsCtrl',
        controllerAs: 'vm'
      })
      .when('/podcasts/:id', {
        templateUrl: '/templates/podcastShow',
        controller: 'podcastShowCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  angular
    .module('podBooth')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
