var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('cookieController', function ($scope, $interval) {

    $scope.cookie_count = 0;
    $scope.click_value = 1;
    $scope.total_clicks = 0;
    $scope.achievemnentsCounter = 0;

    $scope.cursor_level = 0;
    $scope.grandma_level = 0;
    $scope.autoclicker_level = 0;

    $scope.next_cursor_cost = 10;
    $scope.next_grandma_cost = 30;
    $scope.next_autoclicker_cost = 100;

    $scope.cookies_clicked = 0;
    $scope.cookies_self_clicked = 0;
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


    var audioSuccess = new Audio('success.wav');
    var audioClick = new Audio('click.wav');
    var audioDing = new Audio('ding.wav');
    var audioPeep = new Audio('peeppeep.wav');

    $scope.incrementCookieCount = function (e, increment_size) {
        if (++$scope.total_clicks % 3 == 0) {
            audioDing.play();
            $('#clone').css('color',"yellow");
            
            } else {
            audioClick.play();
            $('#clone').css('color',"white");
            };

        var obj = $("#clone").clone();
        $("body").append(obj);

        obj.html("+" + increment_size);

        if (e !== null) {
            obj.offset({ left: e.pageX - 10, top: e.pageY - 25 });
            $scope.cookies_self_clicked += increment_size;
        } else {
            var position = $("#cookie").position();
            var img = document.getElementById('cookie');
            var width = img.clientWidth;
            var height = img.clientHeight;
            obj.offset({
                left: position.left + width / 2 + 20,
                top: position.top + height / 2 + 20
                 
        
        })
                       
        }
        
        
        obj.animate({
            "top": "-=100px",
            "opacity": 0.10,
            "left": "+=20px"
        }, 1000, "linear", function () {
            $(this).remove();
        });
        
        $scope.cookie_count += increment_size;
        $scope.cookies_clicked += increment_size;
        addToTotal(increment_size);

        if($scope.cookie_count - $scope.next_cursor_cost > $scope.click_value - 3) {
            $("#cursorText").css('animationName',"cursorText");
            $("#cursorText").css('animationDuration',"2s");

        } else {
            $("#cursorText").css('animationName',"");  

        }
        
        if($scope.cookie_count - $scope.next_grandma_cost > $scope.click_value - 10) {
            $("#grandmaText").css('animationName',"grandmaText");
            $("#grandmaText").css('animationDuration',"2s");

        } else {
            $("#grandmaText").css('animationName',"");  

        }
        
        if($scope.cookie_count - $scope.next_autoclicker_cost > $scope.click_value - 20) {
            $("#clickerText").css('animationName',"clickerText");
            $("#clickerText").css('animationDuration',"2s");

        } else {
            $("#clickerText").css('animationName',"");  

        }
    };

    var canBuy = function (cost) {
        if ($scope.cookie_count >= cost) {
            $scope.cookie_count = $scope.cookie_count - cost;
            return true;
        } else {
            return false;
        }
    };

    $scope.formatDecimal = function (val, clicked) {
        console.log(clicked);
        if (clicked == 0) {
            return (0).toFixed(2);
        }
        return (val / clicked * 100).toFixed(2);
    }

    $scope.cannotBuy = function (cost) {
        if ($scope.cookie_count >= cost) {
            return false;
        } else {
            return true;
        }
    };

    $scope.buyNewCursor = function (next_val) {

        
        if (canBuy(next_val)) {
            if (!$scope.cursor_bought) {
                $scope.cursor_status = "UPGRADE";
                $scope.cursor_bought = true;
                audioSuccess.play();
                Achievements.show('Buy a Cursor');
                $('#a5').css("display", "block");
                $('#a5').text('Buy a Cursor');
                $('#a5').css('font-weight', 'bold');
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
                audioSuccess.play();
                Achievements.show('Buy a Grandma');
                $('#a6').css("display", "block");
                $('#a6').text('Buy a Grandma');
                $('#a6').css('font-weight', 'bold');
                
            }
            $scope.next_grandma_cost = next_val + 2 * $scope.grandma_level;
            $scope.grandma_level += 1;
            grandma_interval -= 100;
            $interval(function () {
                $scope.incrementCookieCount(null, $scope.grandma_level);
                $scope.cookies_baked += $scope.grandma_level;
            }, grandma_interval);
        }
    };


    $scope.buyNewAutoclicker = function (next_val) {
        if (canBuy(next_val)) {
            if (!$scope.autoclicker_bought) {
                $scope.autoclicker_status = "UPGRADE";
                $scope.autoclicker_bought = true;
                audioSuccess.play();
                Achievements.show('Buy an Autoclicker');
                $('#a7').css("display", "block");
                $('#a7').text('Buy a Autoclicker');
                $('#a7').css('font-weight', 'bold');
            }
            $scope.next_autoclicker_cost = next_val + 2 * $scope.autoclicker_level;
            $scope.autoclicker_level += 1;
            autoclicker_interval -= 50;
            $interval(function () {
                $scope.incrementCookieCount(null, $scope.autoclicker_level);
                $scope.cookies_autoclicked += $scope.autoclicker_level;
            }, autoclicker_interval);
        }
    };

    var baked15 = false;
    var baked30 = false;
    var baked75 = false;
    var baked100 = false;
    var baked15warning = false;
    var baked30warning = false;
    var baked75warning = false;
    var baked100warning = false;

    function addToTotal(val) {
        
        if ($scope.cookies_clicked >= 10 && !baked15 && !baked15warning) {
            $('#a1').css("display", "block");
            baked15warning = true;
            audioPeep.play();
        } else if ($scope.cookies_clicked >= 25 && !baked30 && !baked30warning) {
            $('#a2').css("display", "block");
            baked30warning = true;
            audioPeep.play();
        } else if ($scope.cookies_clicked >= 70 && !baked75 && !baked75warning) {
            $('#a3').css("display", "block");
            baked75warning = true;
            audioPeep.play();
        } else if ($scope.cookies_clicked >= 95 && !baked100 && !baked100warning) {
            $('#a4').css("display", "block");
            baked100warning = true;
            audioPeep.play();
        }
        
        if ($scope.cookies_clicked >= 15 && !baked15) {
            baked15 = true;
            Achievements.show('Click 15 cookies');
            audioSuccess.play();
            $('#a1').text('Click 15 cookies');
            $('#a1').css('font-weight', 'bold');
        } else if ($scope.cookies_clicked >= 30 && !baked30) {
            baked30 = true;
            Achievements.show('Click 30 cookies');
            audioSuccess.play();
            $('#a2').text('Click 30 cookies');
            $('#a2').css('font-weight', 'bold');
        } else if ($scope.cookies_clicked >= 75 && !baked75) {
            baked75 = true;
            Achievements.show('Click 75 cookies');
            audioSuccess.play();
            $('#a3').text('Click 75 cookies');
            $('#a3').css('font-weight', 'bold');
        } else if ($scope.cookies_clicked >= 100 && !baked100) {
            baked100 = true;
            Achievements.show('Click 100 cookies');
            audioSuccess.play();
            $('#a4').text('Click 100 cookies');
            $('#a4').css('font-weight', 'bold');
        }
    }

});

$(document).ready(function () {
    Achievements.initialize('myGame');
    Achievements.register('Buy a Cursor');
    Achievements.register('Buy a Grandma');
    Achievements.register('Buy an Autoclicker');
    Achievements.register('Click 15 cookies');
    Achievements.register('Click 30 cookies');
    Achievements.register('Click 75 cookies');
    Achievements.register('Click 100 cookies');
});

Achievements = function () {
    var array = {},
        _localStorageKey,

        initialize = function (localStorageKey) {
            _localStorageKey = localStorageKey;

            if (window.localStorage)
                if ((typeof (window.localStorage[_localStorageKey]) != "undefined") && (window.localStorage[_localStorageKey] != null) && (window.localStorage[_localStorageKey] != "")) array = JSON.parse(window.localStorage[_localStorageKey]);
        },

        register = function (text, description, icon) {
            if ((typeof (text) !== "string") || (text === "")) return;

            array[text] = { active: false };
            if (typeof (description) !== "undefined") array[text]["description"] = description;
            if (typeof (icon) !== "undefined") array[text]["icon"] = icon;
        },

        getCount = function () {
            var count = 0;
            for (var i in array) count++;
            return count;
        },

        getUnlockedCount = function () {
            var count = 0;
            for (var i in array) {
                if (array[i]["active"]) count++;
            }
            return count;
        },

        clear = function () {
            for (var i in array) {
                if (array[i]["active"]) array[i]["active"] = false;
            }
        },

        list = function () {
            var result = "";
            for (var i in array) {
                if (array[i]["active"]) result += '<div class="achievement"><span class="title">' + i + '</span><br /><span class="details">' + array[i]["description"] + '</span></div><br /><br />';
                else result += '<div class="achievement locked"><span class="title">' + i + '</span><br /><span class="details">' + array[i]["description"] + '</span></div><br /><br />';
            }

            return result;
        },

        show = function (text) {
            if ((typeof (text) !== "string") || (text === "")) return;

            if (array[text] === "undefined") register(text);

            if (!array[text]["active"]) {
                if ((typeof (array[text].icon) != "undefined") && (array[text].icon != "")) $('#achievement_box').css("background-image", "url(" + array[text].icon + ")");


                $('#status.achievement #text').html(text);
                $('#status.achievement').show();
                $('#status.achievement').css({ opacity: 0.0 });

                $('#status.achievement').animate({ opacity: 1.0, bottom: '8px' }, 750);

                setTimeout(function () {
                    $('#status.achievement').animate({ opacity: 0.0, bottom: '-120px' }, 750, "linear", function () { $('#status.achievement').hide(); });
                }, 5000);

                array[text].active = true;
            }

            if (window.localStorage) window.localStorage[_localStorageKey] = JSON.stringify(array);
        };

    return {
        initialize: initialize,
        getCount: getCount,
        getUnlockedCount: getUnlockedCount,
        clear: clear,
        list: list,
        register: register,
        show: show
    };
}();
