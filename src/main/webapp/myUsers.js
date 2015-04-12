angular.module('myApp', [])

    .controller('userCtrl', function ($scope, $http) {

        $scope.count = 0;
        $scope.fName = '';
        $scope.lName = '';
        $scope.passw1 = '';
        $scope.passw2 = '';
        $scope.lastMessage = "-";
        $scope.users = [
            {id: 1, fName: 'Hege', lName: "Pege"},
        ];
        $scope.id = 1;
        $scope.edit = true;
        $scope.error = false;
        $scope.incomplete = false;
        $scope.editUser = function (id) {
            if (id == 'new') {
                $scope.edit = true;
                $scope.incomplete = true;
                $scope.fName = '';
                $scope.lName = '';
            } else {
                $scope.edit = false;
                $scope.fName = $scope.users[id - 1].fName;
                $scope.lName = $scope.users[id - 1].lName;
            }
        };

        $scope.showHelloToUser = function (id) {
            $http.get('http://localhost:8080/greeting?name=' + $scope.users[id - 1].fName).
                success(function (data) {
                    $scope.lastMessage = data.content;
                    $scope.count++;
                });
        }

        $scope.saveUser = function () {
            $scope.id = $scope.id + 1;
            $scope.users.push({
                id: $scope.id,
                fName: $scope.fName,
                lName: $scope.lName
            });

        }
        $scope.$watch('passw1', function () {
            $scope.test();
        });
        $scope.$watch('passw2', function () {
            $scope.test();
        });
        $scope.$watch('fName', function () {
            $scope.test();
        });
        $scope.$watch('lName', function () {
            $scope.test();
        });

        $scope.test = function () {
            if ($scope.passw1 !== $scope.passw2) {
                $scope.error = true;
            } else {
                $scope.error = false;
            }
            $scope.incomplete = false;
            if ($scope.edit && (!$scope.fName.length || !$scope.lName.length || !$scope.passw1.length || !$scope.passw2.length)) {
                $scope.incomplete = true;
            }
        };
    })

    .directive('enablePulsating', function () {
        return {
            link: function (scope, element) {
                scope.$watch('count', function (newVal, oldVal) {
                    console.log("watcher called");
                    if (newVal != oldVal) {
                        if (newVal % 2 == 0) {
                            console.log('counter changed 0');
                            element.addClass("css3-notification");
                        } else {
                            //start the animation!
                            console.log('counter changed 1');
                            element.removeClass("css3-notification");
                        }
                    }
                })
            }
        }
    })

