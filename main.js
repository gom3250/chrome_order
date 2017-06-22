$(function(){
  var username = "张凯",
      password = "123456";

  login(username, password, function(cookieStr){
      getValue(["name", "bumen"], function(result){
          order(result.name, result.bumen, "1", cookieStr)
      });
  });
});

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
             callback(cookieStr)
        });
      },
      cache: false
  });
}

function order(username, bumen, o_type, cookieStr){
  $.ajax({
      type: 'POST',
      url: "http://dc.wk2.com/Home/User/order.html",
      data : {'name' : username,
              'bumen' : bumen,
              'o_type' : o_type
      },
      crossDomain: true,
      success: function(data, status, xhr) {
         console.log(data)
         getValue("aaa");
      },
      // beforeSend: function(xhr){xhr.setRequestHeader('Cookie', cookieStr);},
      cache: false
  });
}
