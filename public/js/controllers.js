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
                }, 1000 * v);
            })(i)
        };
    }
    addItem();

    $scope.start = function() {
        $location.path('/step1');
    };

    $scope.upload = function() {
        $location.path('/upload');
    }
});

tsControllers.controller('step1Ctrl', function($scope, $http, $location, $rootScope) {
    $http.get('api/listtpl').success(function(tplList) {
        $scope.tplList = tplList.nameList;

    })
    $scope.selectedIndex;
    
    $scope.announceSelected = function(tpl) {
	$rootScope.fileName=tpl.fileName
    }

    $scope.confirm = function() {
        $location.path('/step2');
    }
})

tsControllers.controller('step2Ctrl', function($scope, $http, $location, $rootScope, validate) {

    $scope.configContent = {};
    $http.post('api/selecttpl', {
        filename: $rootScope.fileName
    }).success(function(configtpl) {
        $scope.configList = configtpl.config;
    });


    $scope.configTpl = function() {
        /*        validate.notNullValidate($scope.config, '标题');
                validate.notNullValidate($scope.config.title, '标题');
                validate.httpValidate($scope.config.webbanner, 'webbannerIMGurl');
                validate.httpValidate($scope.config.webbottom, 'webbottomIMGurl');
                validate.httpValidate($scope.config.link, '标题');
                validate.notNullValidate($scope.config.share, '分享标题');
                validate.notNullValidate($scope.config.share.title, '分享标题');
                validate.httpValidate($scope.config.share.link, '分享链接');
                validate.httpValidate($scope.config.share.thumb, '分享thumb');*/

        $http.post('api/configtpl', $scope.configContent).success(function(data) {
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

tsControllers.controller('step4Ctrl', function($scope, toastSv) {
    $scope.toast = toastSv;
    $scope.upload = dialogUpload;
});

tsControllers.controller('uploadtpl', function($scope, $http, toastSv) {
    $scope.uploadfile = function() {
        $http.post('api/uploadtpl', $scope.tpl).success(function(data) {
            if (data.code == 200) {
                toastSv('上传成功');
            } else {
                toastSv('上传遇到问题：');
            }
        })
    }
});
