$(function() {
    getValueByArray(["password", "dingding_auto", "webhook", "link", "msg", "username", "bumen", "noon_auto", "night_auto", "noon_time", "night_time"],
    function(result) {
        if (result.password != undefined) {
            $(".password").val(result.password);
        }

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

        if (result.webhook != undefined) {
            $(".webhook").val(result.webhook);
        }

        if (result.link != undefined) {
            $(".link").val(result.link);
        }

        if (result.msg != undefined) {
            $(".msg").val(result.msg);
        }

        if (result.dingding_auto != undefined) {
            if (result.dingding_auto) {
                $(".dingding_auto").prop("checked", "checked");
            }
        }

    });

    $(".test").click(function(){
        password = $(".password").val();
        username = $(".username").val();

        saveObject({
            "password": password,
            "username": username
        },
        function() {
            message("温馨提醒", "正在测试连接性...");
            test();
        });
    });

    $(".send").click(function(){
        dingding_auto = $(".dingding_auto").val();
        link = $(".link").val();
        msg = $(".msg").val();
        webhook = $(".webhook").val();

        saveObject({
            "link": link,
            "msg": msg,
            "webhook": webhook,
            "dingding_auto": dingding_auto
        },
        function() {
            message("温馨提醒", "正在发送...");
            dingding2(0, function(){
                message("温馨提醒", "发送成功");
            });
        });

    });

    $(".save2").click(function() {
      dingding_auto = $(".dingding_auto").prop("checked");
      link = $(".link").val();
      msg = $(".msg").val();
      webhook = $(".webhook").val();

      saveObject({
          "link": link,
          "msg": msg,
          "webhook": webhook,
          "dingding_auto": dingding_auto
      },
      function() {
          message("温馨提醒", "保存成功");
      });
    });

    $(".save").click(function() {
        username = $(".username").val();
        bumen = $(".bumen").val();
        noon_time = $(".noon_time").val();
        night_time = $(".night_time").val();
        noon_auto = $(".noon_auto").prop("checked");
        night_auto = $(".night_auto").prop("checked");
        password = $(".password").val();
        saveObject({
            "username": username,
            "password": password,
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
                    getValueByArray("s_view", function(result){
                        if(result.s_view == undefined){
                            message("温馨提醒", "抱歉, 暂时还没有人员点餐。");
                            return;
                        }
                        jdata = $(result.s_view);
                        trs = jdata.find(".detail_list tr");

                        if(trs.size() <= 1){
                            message("温馨提醒", "抱歉, 暂时还没有人员点餐。");
                            return;
                        }
                        showMembers(jdata, trs, data);
                    });
                } else{
                   showMembers(jdata, trs, data);
                }
            });
        });
    });

    function showMembers(jdata, trs, data){
      saveObject({"s_view" : data}, function(){

      });
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
    }

    $(".robin").click(function(){
        $(".session").hide();
        $(".session3").show();
    });

    $(".back").click(function() {
        $(".session").show();
        $(".session2").hide();
        $(".session3").hide();
    });
});
