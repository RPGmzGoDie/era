const socket = new WebSocket('ws://localhost:7770');
const url = new URL(document.location.href);
const username = url.searchParams.get('u');
const total_attr_num = 25;
const updateInfo = function(info) {
  $('span#hp').text(info['hp']);
  $('span#capacity').text(info['capacity']);
  $('span#strength').text(info['strength']);
  $('span#charm').text(info['charm']);
  $('span#appreciation').text(info['appreciation']);
  $('span#spirit').text(info['spirit']);
  $('span#money').text(info['money']);
  $('span#temperament').text(info['temperament']);
  $('span#sanity').text(info['sanity']);
  $('span#mouth').text(info['mouth']);
  $('span#breast').text(info['breast']);
  $('span#breast_sense').text(info['breast_sense']);
  $('span#vagina_sense').text(info['vagina_sense']);
  $('span#sex_exp').text(info['sex_exp']);
  $('span#s_exp').text(info['s_exp']);
  $('span#m_exp').text(info['m_exp']);
  $('span#masturbation').text(info['masturbation']);
  $('span#lust').text(info['lust']);
  $('span#sex_times').text(info['sex_times']);
  $('span#consumed_num').text(info['consumed_num']);
  $('span#technique').text(info['technique']);
  $('span#level').text(info['levels']);
  $('span#score').text(info['score']);
  $('span#quality').text(info['quality']);
};

const execNormalEvent = function(response_message) {
  $('ul#event').append(`<li>${response_message.getInfo()['content']}</li>`);
  updateInfo(response_message.getInfo()['info']);
};

$('button#happen').click(function(){
  // send
  let request_message = messageFunc('event_request');
  request_message.setUsername(username);
  request_message.setInfo({'type': 0});
  socket.send(request_message.stringify());
});

socket.addEventListener('message', function (event) {
  const datajson = JSON.parse(event.data);
  let response_message = messageFunc('event_response');
  response_message.init(datajson);
  if (!response_message.isSucess()) {
    if (!response_message.status) {
      alert('协议出错！');
    } else {
      alert(response_message.status);
    }
    return;
  }

  switch(response_message.getInfo()['type']) {
    case 0:
      execNormalEvent(response_message);
    default:
  }
});

let info = JSON.parse(sessionStorage.getItem('user_data'));
console.log(info);
if (Object.keys(info).length <= 0) {
  alert("没有缓存~");
} else {
  updateInfo(info);
}