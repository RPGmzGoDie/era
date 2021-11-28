$('button#register').click(function () {
  if ($('input#username').val() == '') {
    alert('请输出账号!');
    return;
  }

  username = $('input#username').val();
  window.location.href = `register.html?u=${username}`;
});

$('button#login').click(function () {
  if ($('input#username').val() == '') {
    alert('请输出账号!');
    return;
  }

  const socket = new WebSocket('ws://localhost:7770');
  socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(info));
  });

  socket.addEventListener('message', function (event) {
      console.log('Message from server: ', event.data);
  });
});
