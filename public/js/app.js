var tsApp=angular.module('tsApp',['ngRoute','tsControllers']);

tsApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/step1', {
      templateUrl: 'views/step1.html',
      controller: 'step1Ctrl'
    }).
    when('/step2', {
      templateUrl: 'views/step2.html',
      controller: 'step2Ctrl'
    }).
    when('/step3', {
      templateUrl: 'views/step3.html',
      controller: 'step3Ctrl'
    }).
    when('/step4', {
      templateUrl: 'views/step4.html',
      controller: 'step4Ctrl'
    }).
    otherwise({
      redirectTo: '/step1'
    });
});
