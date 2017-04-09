var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('cookieController', function ($scope, $interval) {

    $scope.cookie_count = 150;
    $scope.click_value = 1;

    $scope.cursor_level = 0;
    $scope.grandma_level = 0;
    $scope.autoclicker_level = 0;

    $scope.next_cursor_cost = 10;
    $scope.next_grandma_cost = 30;
    $scope.next_autoclicker_cost = 100;

    $scope.cookies_clicked = 0;
    $scope.cookies_autoclicked = 0;
    $scope.cookies_baked = 0;

    var grandma_interval = 3000;
    var autoclicker_interval = 1000;

    $scope.cursor_status = "BUY"
    $scope.grandma_status = "BUY"
    $scope.autoclicker_status = "BUY"

    $scope.cursor_bought = false;
    $scope.grandma_bought = false;
    $scope.autoclicker_bought = false;

    $scope.incrementCookieCount = function (e, increment_size) {
        var obj = $("#clone").clone();
        $("body").append(obj);

        obj.html("+" + increment_size);

        if (e !== null) {
            obj.offset({ left: e.pageX - 10, top: e.pageY - 25 });
        } else {
            var position = $("#cookie").position();
            var img = document.getElementById('cookie');
            var width = img.clientWidth;
            var height = img.clientHeight;
            obj.offset({
                left: position.left + width / 2 + 20,
                top: position.top + height / 2 + 20
            });
        }
        obj.css("color: white");
        obj.animate({
            "top": "-=100px",
            "opacity": 0.10,
            "left": "+=20px"
        }, 1000, "linear", function () {
            $(this).remove();
        });

        $scope.cookie_count += increment_size;
    };

    var canBuy = function (cost) {
        if ($scope.cookie_count >= cost) {
            $scope.cookie_count = $scope.cookie_count - cost;
            return true;
        } else {
            return false;
        }
    };

    $scope.buyNewCursor = function (next_val) {
        if (canBuy(next_val)) {
            if (!$scope.cursor_bought) {
                $scope.cursor_status = "UPGRADE";
                $scope.cursor_bought = true;
            }
            $scope.next_cursor_cost = next_val + 2 * $scope.cursor_level;
            $scope.cursor_level += 1;
            $scope.click_value += $scope.cursor_level;
        }
    };

    $scope.buyNewGrandma = function (next_val) {
        if (canBuy(next_val)) {
            if (!$scope.grandma_bought) {
                $scope.grandma_status = "UPGRADE";
                $scope.grandma_bought = true;
            }
            $scope.next_grandma_cost = next_val + 2 * $scope.grandma_level;
            $scope.grandma_level += 1;
            grandma_interval -= 100;
            $interval(function () {
                $scope.incrementCookieCount(null, $scope.grandma_level);
                $scope.cookies_baked += $scope.grandma_level;
                addToTotal($scope.grandma_level);
            }, grandma_interval);
        }
    };


    $scope.buyNewAutoclicker = function (next_val) {
        if (canBuy(next_val)) {
            if (!$scope.autoclicker_bought) {
                $scope.autoclicker_status = "UPGRADE";
                $scope.autoclicker_bought = true;
            }
            $scope.next_autoclicker_cost = next_val + 2 * $scope.autoclicker_level;
            $scope.autoclicker_level += 1;
            autoclicker_interval -= 50;
            $interval(function () {
                $scope.incrementCookieCount(null, $scope.autoclicker_level);
                $scope.cookies_autoclicked += $scope.autoclicker_level;
                addToTotal($scope.autoclicker_level);
            }, autoclicker_interval);
        }
    };

    function addToTotal(val) {
        $scope.cookies_clicked += val;
    }

});
