var tsServices = angular.module('tsServices', []);

tsServices.factory('toastSv', function($mdToast, $animate) {
    var toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    var getToastPosition = function() {
        return Object.keys(toastPosition)
            .filter(function(pos) {
                return toastPosition[pos];
            })
            .join(' ');
    };

    var ToastCtrl = function($scope, $mdToast, text) {
        $scope.closeToast = function() {
            $mdToast.hide();
        }
        $scope.text = text;
    };

    return function(text) {
        $mdToast.show({
            controller: ToastCtrl,
            locals: {
                text: text
            },
            templateUrl: 'views/toast/toast-template.html',
            hideDelay: 6000,
            position: getToastPosition()
        });
    }

});

tsServices.factory('dialogUpload', function($mdDialog, $log) {
    var alert = '';


    return function(ev) {
        $log.debug("dialogAdvanced() preparing to show...");
        $mdDialog.show({
            templateUrl: 'views/dialog/dialog-upload.html',
            targetEvent: ev,
            controller: DialogController,
            onComplete: function() {
                $log.debug("dialogAdvanced() now shown!");
            }
        }).then(function() {
            alert = 'You said the information was.';
	    console.log(alert);
        }, function() {
            alert = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.confirm = function() {
            $mdDialog.hide();
        };
    }
});
