var tsControllers=angular.module('tsControllers', ['ngMaterial']);

tsControllers.controller('step1Ctrl', function($scope,$location) {
       $scope.selectTpl=function(){
       	 $location.path('/step2');
       };
});

tsControllers.controller('step2Ctrl',function($scope,$http,$location,$rootScope) {
       $scope.configTpl=function(){
	 $http.post('api/submitconfig',$scope.config).success(function(data){
	 $rootScope.tplhtml=data.html;
       	 $location.path('/step3');
	 })
       };

});

tsControllers.controller('step3Ctrl', function($scope,$http,$location,$rootScope) {
	$scope.tplhtml=$rootScope.tplhtml;
	var iframe=window.frames['framename'];
	iframe.document.open();
	iframe.document.write($scope.tplhtml);
	iframe.document.close();
       $scope.makeTpl=function(){
	 $http.post('api/maketpl',{html:$scope.tplhtml}).success(function(data){
 
	if(data.code==200){$location.path('/step4');}
	 })
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
