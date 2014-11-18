var tsControllers = angular.module('tsControllers', ['ngMaterial', 'ngAnimate', 'tsServices']);

tsControllers.controller('step0Ctrl', function($scope, $location, $timeout) {
    $scope.list = [];
    var animations = ["toggle",
        "spin-toggle",
        "scale-fade",
        "scale-fade-in",
        "bouncy-scale-in",
        "flip-in",
        "slide-left",
        "slide-right",
        "slide-top",
        "slide-down",
        "bouncy-slide-left",
        "bouncy-slide-right",
        "bouncy-slide-top",
        "bouncy-slide-down",
        "rotate-in"
    ];
    var tips = ['第一步：选择模板', '第二步：填写必要信息', '第三步：预览并确认页面', '第四步：填写FTP信息上传或下载面'];
    addItem = function(animation) {
        for (var i = 0; i < 4; i++) {
            (function(v) {

                $timeout(function() {
                    $scope.animation = animations[parseInt(10 * Math.random())]
                    $scope.list.push({
                        title: tips[v]
                    });
                }, 1000*v);
            })(i)
        };
    }
    addItem();

    $scope.start = function() {
        $location.path('/step1');
    };
});

tsControllers.controller('step1Ctrl', function($scope, $location) {
    $scope.data = {
        selectedIndex: 0,
        secondLocked: false,
        secondLabel: "Item Two"
    };

    $scope.next = function() {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };

    $scope.previous = function() {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
    $scope.selectTpl = function() {
        $location.path('/step2');
    };
});

tsControllers.controller('step2Ctrl', function($scope, $http, $location, $rootScope, validate) {
    $scope.configTpl = function() {
        validate.notNullValidate($scope.config, '标题');
        validate.notNullValidate($scope.config.title, '标题');
        validate.httpValidate($scope.config.webbanner, 'webbannerIMGurl');
        validate.httpValidate($scope.configwebbottom, 'webbottomIMGurl');
        validate.httpValidate($scope.config.link, '标题');
        validate.notNullValidate($scope.config.share, '分享标题');
        validate.notNullValidate($scope.config.share.title, '分享标题');
        validate.httpValidate($scope.config.link, '分享链接');
        validate.httpValidate($scope.config.thumb, '分享thumb');

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

tsControllers.controller('step4Ctrl', function($scope, toastSv, dialogUpload) {
    $scope.toast = toastSv;
    $scope.upload = dialogUpload;
});
