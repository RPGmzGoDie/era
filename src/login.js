$("button#register").click(function(){
  if ($("input#username").val() == "") {
    alert("请输出账号!");
  }

  window.location.href="register.html";
});

$("button#login").click(function(){
  if ($("input#username").val() == "") {
    alert("请输出账号!");
  }
});