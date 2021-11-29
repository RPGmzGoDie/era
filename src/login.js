$('button#register').click(function () {
  if ($('input#username').val() == '') {
    alert('请输出账号!');
    return;
  }

  username = $('input#username').val();
  window.location.href = `register.html?u=${username}`;
});

$('button#login').click(function () {
  const username = $('input#username').val();
  if (username == '') {
    alert('请输出账号!');
    return;
  }

  const socket = new WebSocket('ws://localhost:7770');
  let message_ = message_func("login_requset");
  message_.set(username)
  socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(message_.stringify()));
  });

  socket.addEventListener('message', function (event) {
      console.log('Message from server: ', event.data);
  });
});
