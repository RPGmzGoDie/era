const socket = new WebSocket('ws://localhost:7770');

$('button#register').click(function () {
  const username = $('input#username').val();
  if (!username) {
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
  if (!username) {
    alert('请输出账号!');
    return;
  }

  if (username.length >= 20) {
    alert('你太长了');
    return;
  }
  
  // send
  let request_message = messageFunc("login_requset");
  request_message.setUsername(username);
  socket.send(request_message.stringify());  
});

socket.addEventListener('message', function (event) {
  const datajson = JSON.parse(event.data);
  let response_message = messageFunc('login_response');
  response_message.init(datajson);
  if (response_message.isSucess()) {
    sessionStorage.setItem('user_data', response_message.getInfo());
    window.location.href = `game.html?u=${response_message.getUsername()}`;
  } else {
    if (!response_message.status) {
      alert('协议出错！');
    } else {
      alert(response_message.status);
    }
  }
});