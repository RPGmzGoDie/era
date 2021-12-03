const socket = new WebSocket('ws://localhost:7770');

$('button#draw').click(function () {
  let url = new URL(document.location.href);
  let username = url.searchParams.get('u');
  let request_message = messageFunc("draw_request");
  
  // send
  request_message.setInfo({'username': username});
  socket.send(request_message.stringify());
});

$('div.draw-div').on('click', '#next', function(){
  let url = new URL(document.location.href);
  let username = url.searchParams.get('u');
  window.location.href = `game.html?u=${username}`;
});

socket.addEventListener('message', function (event) {
  const datajson = JSON.parse(event.data);
  let response_message = messageFunc('draw_response');
  response_message.init(datajson);
  if (response_message.isSucess()) {
    sessionStorage.setItem('user_data', datajson);
    $('div.draw-div').append('<button id="next">下一步</button>');
  } else {
    if (!response_message.status) {
      alert('协议出错！');
    } else {
      alert(response_message.status);
    }
  }
});