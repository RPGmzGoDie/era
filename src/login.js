$("button#register").click(function(){
  if ($("input#username").val() == "") {
    alert("请输出账号!");
    return;
  }

  username = $("input#username").val();
  window.location.href="register.html?username=${username}";
});

$("button#login").click(function(){
  if ($("input#username").val() == "") {
    alert("请输出账号!");
    return;
  }
});
