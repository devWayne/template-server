var tsControllers=angular.module('tsControllers', ['ngMaterial']);

tsControllers.controller('step1Ctrl', function($scope,$location) {
       $scope.selectTpl=function(){
       	 $location.path('/step2');
       };
});

tsControllers.controller('step2Ctrl', function($scope,$location) {
       $scope.configTpl=function(){
       	 $location.path('/step3');
       };

});

tsControllers.controller('step3Ctrl', function($scope,$location) {
       $scope.makeTpl=function(){
       	 $location.path('/step4');
       };

});

tsControllers.controller('step4Ctrl', function($scope,$mdToast,$animate) {
  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.complexToastIt = function() {
    $mdToast.show({
      controller: 'ToastCtrl',
      templateUrl: 'views/toast/toast-template.html',
      hideDelay: 6000,
      position: $scope.getToastPosition()
    });
  };
});


tsControllers.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});
