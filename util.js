function login(username, password, callback) {
    var cookieId = 'PHPSESSID';
    $.ajax({
        type: 'POST',
        url: "http://dc.wk2.com/Home/User/login.html",
        data: {
            "username": username,
            "password": password
        },
        crossDomain: true,
        success: function(data, status, xhr) {
            chrome.cookies.get({
                "url": "http://dc.wk2.com/Home/User/login.html",
                "name": cookieId
            },
            function(cookie) {
                var cookieStr = cookieId + "=" + cookie.value;
                callback(cookieStr);
            });
        },
        cache: false
    });
}

function view(username, successfn, showfn) {
    var loginusername = "张凯";
    var password = "123456";

    login(loginusername, password,
    function(cookieStr) {
        $.ajax({
            type: 'GET',
            url: "http://dc.wk2.com/Home/Index/index.html",
            crossDomain: true,
            success: function(data, status, xhr) {
                if (data.indexOf(username) != -1) {
                    successfn(data);
                }
                if (showfn) {
                    showfn(data);
                }
            },
            // beforeSend: function(xhr){xhr.setRequestHeader('Cookie', cookieStr);},
            cache: false
        });
    });

}

function order(username, bumen, o_type, cookieStr, successfn) {
    $.ajax({
        type: 'POST',
        url: "http://dc.wk2.com/Home/User/order.html",
        data: {
            'name': username,
            'bumen': bumen,
            'o_type': o_type
        },
        crossDomain: true,
        success: function(data, status, xhr) {
            view(username,
            function(data) {
                saveObject({
                    "success": o_type
                },
                function() {
                    successfn(username, o_type);
                });
            });
        },
        // beforeSend: function(xhr){xhr.setRequestHeader('Cookie', cookieStr);},
        cache: false
    });
}

function order2(o_type, successfn) {
    var username = "张凯",
    password = "123456";

    login(username, password,
    function(cookieStr) {
        getValue(["username", "bumen"],
        function(result) {
            order(result.username, result.bumen, o_type, cookieStr, successfn);
        });
    });
}

function isWeekDay() {
    var date = new Date();
    var day = date.getDay();
    if (day == 6 || day == 0) {
        return false;
    }
    return true;
}

function checkHour(hour) {
    var date = new Date();
    var h = date.getHours();

    if (hour == h) {
        return true;
    }

    return false;
}

function noon() {
    console.log("auto noon run");
    if (checkHour('09') || checkHour('9')) {
        getValue(["success", "noon_time"],
        function(result) {
            var date = new Date();
            var minutes = date.getMinutes();
            if (minutes >= parseInt(result.noon_time) && result.success != 1) {
                order2(1,
                function(username, o_type) {
                    notification("noon", "温馨提醒", username + "：已为您点好午餐.");
                });
            }
        });
    }
}

function noon2() {
    if (checkHour('09') || checkHour('9')) {
        order2(1,
        function(username, o_type) {
            notification("noon", "温馨提醒", username + "：已为您点好午餐.");
        });
        return;
    }
    message("温馨提醒", "抱歉,不在点餐时间");
}

function night2() {
    if (checkHour('14') || checkHour('15')) {
        order2(2,
        function(username, o_type) {
            notification("night", "点餐提示", username + "：已为您点好晚餐.");
        });
    }
    message("温馨提醒", "抱歉,不在点餐时间");
}

function night() {
    console.log("auto night run");
    if (checkHour('14') || checkHour('15')) {
        getValue(["success", "night_time"],
        function(result) {
            var date = new Date();
            var minutes = date.getMinutes();
            var hour = date.getHours();
            if (minutes >= parseInt(result.night_time) && result.success != 2) {
                order2(2,
                function(username, o_type) {
                    notification("night", "点餐提示", username + "：已为您点好晚餐.");
                });
            }
        });
    }
}

function offwork() {
    if (checkHour('19')) {
        var date = new Date();
        var d = date.getDay();
        getValue("offwork",
        function(result) {
            if (result.offwork != d) {
                notification("offwork", "用餐提示", "晚餐时间到请注意用餐！");
                saveObject({
                    "offwork": d
                },
                function() {});
            }
        });
    }
    console.log("offwork run");
}

function saveObject(obj, callback) {
    chrome.storage.local.set(obj, callback);
}

function getValue(key, callback) {
    chrome.storage.local.get(key, callback);
}

function getValueByArray(array, callback) {
    chrome.storage.local.get(array, callback);
}

function notification(id, title, message) {
    chrome.notifications.create(id, {
        type: 'basic',
        iconUrl: 'icon128.png',
        title: title,
        message: message
    },
    function() {});
}

function clear() {
    var ticker = setTimeout(function() {
        $(".message").html("<div class=\"dc_notice\">" + "1、点餐时间，中餐 9:00-10:00， 晚餐14：00-15:30<br>" + "2、周六周日暂时不提供午晚餐<br>" + "3、取消点餐，请联系人事部<br>" + "4、好米、好油、好菜、好厨艺；乐厨让你吃饭无忧<br><br></div>");
        clearTimeout(ticker);
    },
    8000);
}

function message(title, msg) {
    $(".message").html(msg);
    clear();
    notification("message", title, msg);
}
