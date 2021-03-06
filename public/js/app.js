var tsApp=angular.module('tsApp',['ngRoute','tsControllers','tsServices']);

tsApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/step0', {
      templateUrl: 'views/step0.html',
      controller: 'step0Ctrl'
    }).
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
    when('/upload', {
      templateUrl: 'views/uploadtpl.html',
      controller: 'uploadtpl'
    }).
    otherwise({
      redirectTo: '/step0'
    });
});
