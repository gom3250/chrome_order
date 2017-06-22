$(function(){
  getValueByArray(["username", "bumen", "noon_auto", "night_auto"], function(result){
      if(result.username != undefined){
         $(".username").val(result.username);
      }

      if(result.bumen != undefined ){
         $(".bumen").val(result.bumen);
      }

      if(result.noon_auto != undefined){
         if(result.noon_auto){
            $(".noon_auto").prop("checked", "checked");
         }
      }

      if(result.night_auto != undefined){
         if(result.night_auto){
            $(".night_auto").prop("checked", "checked");
         }
      }
  });


  $(".save").click(function(){
      username = $(".username").val();
      bumen = $(".bumen").val();
      noon_auto = $(".noon_auto").prop("checked");
      night_auto = $(".night_auto").prop("checked");
      saveObject({
        "username": username,
        "bumen": bumen,
        "noon_auto": noon_auto,
        "night_auto": night_auto
      }, function(){
          $(".message").html("保存成功");
          notification("message", "提示",  "保存成功");
          clear();
      })
  });


  $(".hand2").click(function(){
        noon2(function(){
            $(".message").html("午餐点成功");
            notification("message", "点餐提示",  "午餐点成功");
            clear();
        }, function(){
            $(".message").html("抱歉,不在点餐时间");
            notification("message", "抱歉",  "抱歉,不在点餐时间");
            clear();
        });
        night2(function(){
            $(".message").html("晚餐点成功");
            notification("message", "点餐提示",  "晚餐点成功");
            clear();
        }, function(){
            $(".message").html("抱歉,不在点餐时间");
            notification("message", "抱歉",  "抱歉,不在点餐时间");
            clear();
        });
  });


  $(".view").click(function(){

    getValueByArray(["username"], function(result){
      view(result.username, function(){}, function(data){
          $(".session").hide();
          $(".session2").show();
          jdata = $(data);
          trs = jdata.find(".detail_list tr");
          for(var i = 0 ; i < trs.size() ; i++){
              tr = trs.eq(i);
              if(tr.html().indexOf(result.username) != -1){
                 tr.addClass("redBg");
                 break;
              }
          }
          $(".whos").html(jdata.find(".detail_list").html());
      });
    });

  });

  $(".back").click(function(){
      $(".session").show();
      $(".session2").hide();
  });

  function clear(){
    var ticker = setTimeout(function(){
          $(".message").html("");
          clearTimeout(ticker);
    }, 5000)
  }
});
