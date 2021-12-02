$('button#draw').click(function () {
  let username = url.searchParams.get('u');
  const socket = new WebSocket('ws://localhost:7770');
  let request_message = messageFunc("draw_requset");
  
  response_message.setInfo({'username': username});
  
  socket.addEventListener('open', function (event) {
      socket.send(request_message.stringify());
  });

  socket.addEventListener('message', function (event) {
    const datajson = JSON.parse(event.data);
    let response_message = messageFunc('draw_response');
    response_message.init(datajson);
    if (response_message.isSucess()) {
      sessionStorage.setItem('user_data', datajson);
      $('div.draw-div').append('<button id="next">下一步<button>');
    } else {
      if (!response_message.status) {
        alert('未知错误！');
      } else {
        alert(response_message.status);
      }
    }
  });
});

$('div.draw-div').on('click', '#next', function(){
  window.location.href = `game.html?u=${username}`;
});
