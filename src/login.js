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
  let request_message = message_func("login_requset");
  console.log(request_message);
  request_message.setInfo({'username': username})
  socket.addEventListener('open', function (event) {
      socket.send(message_.stringify());
  });

  socket.addEventListener('message', function (event) {
    const datajson = JSON.parse(event.data);
    sessionStorage.setItem('user_data', datajson);
    console.log(datajson);
    window.location.href = `game.html?u=${username}`;
  });
});
