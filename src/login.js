$('button#register').click(function () {
  const username = $('input#username').val();
  if (username == '') {
    alert('请输出账号!');
    return;
  }

  if (username.length >= 20) {
    alert('你太长了');
    return;
  }

  window.location.href = `register.html?u=${username}`;
});

$('button#login').click(function () {
  const username = $('input#username').val();
  if (username == '') {
    alert('请输出账号!');
    return;
  }

  if (username.length >= 20) {
    alert('你太长了');
    return;
  }

  const socket = new WebSocket('ws://localhost:7770');
  let message_ = message_func("login_requset");
  message_.set(username)
  socket.addEventListener('open', function (event) {
      socket.send(message_.stringify());
  });

  socket.addEventListener('message', function (event) {
      sessionStorage.setItem('user_data', event.data);
      window.location.href = `game.html?u=${username}`;
  });
});
