$(function() {
    getValue(["username", "bumen"],
    function(result) {
        if (result.username == "" || result.username == undefined || result.bumen == undefined || result.bumen == "0") {
            notification("message", "提示", "点击右上角图标请设置您的信息");
        }
    });

    chrome.alarms.create('e', {
        periodInMinutes: 1
    });

    chrome.alarms.onAlarm.addListener(function() {
        if (!isWeekDay()) {
            console.log("weekday");
            return;
        }
        getValue(["night_auto", "noon_auto"],
        function(result) {
            console.log("alarms run");
            if (result.night_auto) {
                night();
            }
            if (result.noon_auto) {
                noon();
            }
            offwork();
        });
    });
});
