(function(){
    angular.module('gr2tp', [
        // External libs/components
        'ngRoute',
        'tmh.dynamicLocale',
        'pascalprecht.translate',

        // Custom components
        'home',
        'register',
        'dashboard'
    ]).config(function($locationProvider, $routeProvider, $translateProvider){
        $locationProvider.html5Mode(true);

        // Routage des urls
        $routeProvider.otherwise('/home');
        $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl:'src/home/home.part.html',
            controller:'HomeController as hCtrl'
        })
        .when('/register', {
            templateUrl: 'src/register/register.part.html',
            controller: 'RegisterController as rCtrl'
        })
        .when('/connect', {
            templateUrl: 'src/connection/connection.part.html',
            controller: 'Connection as cCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'src/dashboard/dashboard.part.html',
            controller: 'Dashboard as dCtrl'
        });
    });
})();
