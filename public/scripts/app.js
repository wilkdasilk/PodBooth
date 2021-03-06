(function() {

  angular.module('podBooth', ['ngRoute', 'ngFileUpload', 'angularMoment', 'ui.materialize', 'infinite-scroll', 'truncate']);

  function config(   $routeProvider,   $locationProvider,  $provide) {
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
      .when('/updateaccount', {
        templateUrl: '/templates/registerUpdate',
        controller: 'registerUpdateCtrl',
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
      .when('/podcast/new', {
        templateUrl: '/templates/podcastNew',
        controller: 'podcastNewCtrl',
        controllerAs: 'vm'
      })
      .when('/podcasts/:id', {
        templateUrl: '/templates/podcastShow',
        controller: 'podcastShowCtrl',
        controllerAs: 'vm'
      })
      .when('/podcasts/:id/update', {
        templateUrl: '/templates/podcastUpdate',
        controller: 'podcastUpdateCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $provide.decorator('nouisliderDirective', function($delegate){
      var directive = $delegate[0];
      angular.extend(directive.scope, {
        connect: '=?'
      });
      return $delegate;
    });
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
      $rootScope.podcastIndex = ($location.path() === '/podcasts');

    });

    $rootScope.currentUser = authentication.currentUser();
    if ($rootScope.currentUser) {
      $rootScope.isLoggedIn = true;
    }

    $rootScope.userAlerts = [];
}

  angular
    .module('podBooth')
    .config(['$routeProvider', '$locationProvider', '$provide', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
