$(function() {
    getValueByArray(["username", "bumen", "noon_auto", "night_auto", "noon_time", "night_time"],
    function(result) {
        if (result.username != undefined) {
            $(".username").val(result.username);
        }

        if (result.bumen != undefined) {
            $(".bumen").val(result.bumen);
        }

        if (result.noon_auto != undefined) {
            if (result.noon_auto) {
                $(".noon_auto").prop("checked", "checked");
            }
        }

        if (result.night_auto != undefined) {
            if (result.night_auto) {
                $(".night_auto").prop("checked", "checked");
            }
        }

        if (result.noon_time != undefined) {
            $(".noon_time").val(result.noon_time);
        }

        if (result.night_time != undefined) {
            $(".night_time").val(result.night_time);
        }
    });

    $(".save").click(function() {
        username = $(".username").val();
        bumen = $(".bumen").val();
        noon_time = $(".noon_time").val();
        night_time = $(".night_time").val();
        noon_auto = $(".noon_auto").prop("checked");
        night_auto = $(".night_auto").prop("checked");

        saveObject({
            "username": username,
            "bumen": bumen,
            "noon_auto": noon_auto,
            "night_auto": night_auto,
            "noon_time": noon_time,
            "night_time": night_time
        },
        function() {
            message("温馨提醒", "保存成功");
        });
    });

    $(".noon_hand").click(function() {
        noon2();
    });

    $(".night_hand").click(function() {
        night2();
    });

    $(".view").click(function() {
        getValueByArray(["username"],
        function(result) {
            view(result.username,
            function() {},
            function(data) {
                jdata = $(data);
                trs = jdata.find(".detail_list tr");
                if(trs.size() <= 1){
                    message("温馨提醒", "抱歉, 暂时还没有人员点餐。");
                    return;
                }
                $(".session").hide();
                $(".session2").show();
                for (var i = 0; i < trs.size(); i++) {
                    tr = trs.eq(i);
                    if (tr.html().indexOf(result.username) != -1) {
                        tr.addClass("redBg");
                        break;
                    }
                }
                $(".whos").html(jdata.find(".detail_list").html());
            });
        });
    });

    $(".back").click(function() {
        $(".session").show();
        $(".session2").hide();
    });
});
