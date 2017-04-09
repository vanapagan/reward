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

    var grandma_interval = 5000;
    var autoclicker_interval = 1000;

    $scope.incrementCookieCount = function (increment_size) {
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
            $scope.next_cursor_cost = next_val + 2 * $scope.cursor_level;
            $scope.cursor_level += 1;
        }
    };

    $scope.buyNewGrandma = function (next_val) {
        if (canBuy(next_val)) {
            $scope.next_grandma_cost = next_val + 2 * $scope.grandma_level;
            $scope.grandma_level += 1;
            grandma_interval -= 100;
            $interval(function () {
                $scope.incrementCookieCount($scope.grandma_level);
                $scope.cookies_baked += $scope.grandma_level; 
                addToTotal($scope.grandma_level);
            }, grandma_interval);
        }
    };


    $scope.buyNewAutoclicker = function (next_val) {
        if (canBuy(next_val)) {
            $scope.next_autoclicker_cost = next_val + 2 * $scope.autoclicker_level;
            $scope.autoclicker_level += 1;
            autoclicker_interval -= 50;
            $interval(function () {
                $scope.incrementCookieCount($scope.autoclicker_level);
                $scope.cookies_autoclicked += $scope.autoclicker_level;
                addToTotal($scope.autoclicker_level);
            }, autoclicker_interval);
        }
    };

    function addToTotal(val) {
        $scope.cookies_clicked += val;
    }

});