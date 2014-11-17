var tsControllers = angular.module('tsControllers', ['ngMaterial', 'tsServices']);

tsControllers.controller('step1Ctrl', function($scope, $location) {
    $scope.rating = 3;
    $scope.selectTpl = function() {
        $location.path('/step2');
    };
});

tsControllers.controller('step2Ctrl', function($scope, $http, $location, $rootScope) {
    $scope.configTpl = function() {
        $http.post('api/configtpl', $scope.config).success(function(data) {
            $rootScope.tplhtml = data.html;
            $location.path('/step3');
        })
    };

});

tsControllers.controller('step3Ctrl', function($scope, $http, $location, $rootScope) {
    $scope.tplhtml = $rootScope.tplhtml;
    var iframe = window.frames['framename'];
    iframe.document.open();
    iframe.document.write($scope.tplhtml);
    iframe.document.close();
    $scope.makeTpl = function() {
        $http.post('api/maketpl', {
            html: $scope.tplhtml
        }).success(function(data) {
            if (data.code == 200) {
                $location.path('/step4');
            }
        })
    };
});

tsControllers.controller('step4Ctrl', function($scope,toastSv,dialogUpload) {
    $scope.toast = toastSv;
    $scope.upload=dialogUpload;
});



