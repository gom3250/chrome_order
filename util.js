function login(username, password,  callback){
  var cookieId = 'PHPSESSID';
  $.ajax({
      type: 'POST',
      url: "http://dc.wk2.com/Home/User/login.html",
      data:{"username": username, "password": password},
      crossDomain: true,
      success: function(data, status, xhr) {
        chrome.cookies.get({"url": "http://dc.wk2.com/Home/User/login.html", "name": cookieId}, function(cookie) {
             var cookieStr = cookieId + "=" + cookie.value;
             callback(cookieStr);
        });
      },
      cache: false
  });
}

function view(username, success, show){
  var loginusername = "张凯";
  var password = "123456";

  login(loginusername, password, function(cookieStr){
    $.ajax({
        type: 'GET',
        url: "http://dc.wk2.com/Home/Index/index.html",
        crossDomain: true,
        success: function(data, status, xhr) {
            if(data.indexOf(username) != -1){
                success(data);
            }
            if(show){
              show(data);
            }
        },
        // beforeSend: function(xhr){xhr.setRequestHeader('Cookie', cookieStr);},
        cache: false
    });
  });

}

function order(username, bumen, o_type, cookieStr, success){
  $.ajax({
      type: 'POST',
      url: "http://dc.wk2.com/Home/User/order.html",
      data : {'name' : username,
              'bumen' : bumen,
              'o_type' : o_type
      },
      crossDomain: true,
      success: function(data, status, xhr) {
         view(username, function(data){
              saveObject({"success": o_type}, function(){
                    success(username, o_type);
              });
         });
      },
      // beforeSend: function(xhr){xhr.setRequestHeader('Cookie', cookieStr);},
      cache: false
  });
}

function order2(o_type, success){
  var username = "张凯",
      password = "123456";

  login(username, password, function(cookieStr){
      getValue(["username", "bumen"], function(result){
          order(result.username, result.bumen, o_type, cookieStr, success);
      });
  });
}

function isWeekDay(){
    var date = new Date();
    var day = date.getDay();
    if(day == 6 || day == 0){
       return false;
    }
    return true;
}

function checkHour(hour) {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    if(hour == h){
      return true;
    }

    return false;
}

function noon(){
   noon2();
   console.log("noon2 run");
}

function noon2(callback, ggcallback){
   if(checkHour('09') || checkHour('9')){
     getValue(["success"], function(result){
        if(result.success != 1){
          order2(1, function(username, o_type){
              notification("noon", "点餐提示", username + "：已为您点好午餐.");
          });
        } else {
          if(callback){
              callback();
          }
        }
     });
   } else {
     if(ggcallback){
         ggcallback();
     }
   }
}

function night2(callback, ggcallback){
   if(checkHour('14') || checkHour('15')){
     getValue("success", function(result){
        if(result.success != 2){
            order2(2, function(username, o_type){
               notification("night", "点餐提示", username + "：已为您点好晚餐.");
            });
        } else{
          if(callback){
              callback();
          }
        }
     });
   } else {
     if(ggcallback){
         ggcallback();
     }
   }
}


function night(){
   night2();
   console.log("night2 run");
}

function offwork(){
   if(checkHour('19')){
     var date = new Date();
     var d = date.getDay();
     getValue("offwork", function(result){
          if(result.offwork != d){
              notification("offwork", "用餐提示", "晚餐时间到请注意用餐！");
              saveObject({"offwork" : d}, function(){});
          }
     });
   }
   console.log("offwork run");
}

function saveObject(obj, callback){
  chrome.storage.local.set(obj, callback);
}

function getValue(key, callback){
  chrome.storage.local.get(key, callback);
}

function getValueByArray(array, callback){
  chrome.storage.local.get(array, callback);
}


function notification(id, title, message){
  chrome.notifications.create(
    id,{
    type: 'basic',
    iconUrl: 'icon128.png',
    title: title,
    message: message
    },

function() {}

);
}
