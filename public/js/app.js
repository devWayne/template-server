var tsApp=angular.module('tsApp',['ngRoute','tsControllers']);

tsApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
