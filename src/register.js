var info = {};
var parent = $('div.attr');
var total = parseInt($('span.total').text());


const doRandom = function () {

};

const checkSubmit = function(info) {
  this.sum = 0;
  Object.keys(info).forEach((key) => {
    if (key != 'username' && key != 'name' && key != 'gender') {
      this.sum += info[key];
    }
  });

  return this.sum === 300;
};

const doSubmit = function () {
  let url = new URL(document.location.href);
  let username = url.searchParams.get('u');
  info['username'] = username;
  info['name'] = $('input.name').val();
  info['gender'] = $('input:radio[name=gender]:checked').val();
  if (!checkSubmit(info)) {
    alert('正确正确属性！');
    return;
  }

  const socket = new WebSocket('ws://localhost:7770');
  socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(info));
  });

  socket.addEventListener('message', function (event) {
      console.log('Message from server: ', event.data);
  });
};

parent.on('click', '.hp.plus', function () {
  let hp = parseInt($('span.hp').text());
  if (total < 1) return;
  --total; ++hp;
  info['hp'] = hp;
  $('span.total').text(total);
  $('span.hp').text(hp);
});
parent.on('click', '.hp.plus-five', function () {
  let hp = parseInt($('span.hp').text());
  if (total < 5) return;
  total -= 5; hp += 5;
  info['hp'] = hp;
  $('span.total').text(total);
  $('span.hp').text(hp);
});
parent.on('click', '.hp.minus', function () {
  let hp = parseInt($('span.hp').text());
  if (hp < 1) return;
  ++total; --hp;
  info['hp'] = hp;
  $('span.total').text(total);
  $('span.hp').text(hp);
});

parent.on('click', '.capacity.plus', function () {
  let capacity = parseInt($('span.capacity').text());
  if (total < 1) return;
  --total; ++capacity;
  info['capacity'] = capacity;
  $('span.total').text(total);
  $('span.capacity').text(capacity);
});
parent.on('click', '.capacity.plus-five', function () {
  let capacity = parseInt($('span.capacity').text());
  if (total < 5) return;
  total -= 5; capacity += 5;
  info['capacity'] = capacity;
  $('span.total').text(total);
  $('span.capacity').text(capacity);
});
parent.on('click', '.capacity.minus', function () {
  let hp = parseInt($('span.capacity').text());
  if (hp < 1) return;
  ++total; --hp;
  info['capacity'] = hp;
  $('span.total').text(total);
  $('span.hp').text(hp);
});

parent.on('click', '.strength.plus', function () {
  let strength = parseInt($('span.strength').text());
  if (total < 1) return;
  --total; ++strength;
  info['strength'] = strength;
  $('span.total').text(total);
  $('span.strength').text(strength);
});
parent.on('click', '.strength.plus-five', function () {
  let strength = parseInt($('span.strength').text());
  if (total < 5) return;
  total -= 5; strength += 5;
  info['strength'] = strength;
  $('span.total').text(total);
  $('span.strength').text(strength);
});
parent.on('click', '.strength.minus', function () {
  let strength = parseInt($('span.strength').text());
  if (strength < 1) return;
  ++total; --strength;
  info['strength'] = strength;
  $('span.total').text(total);
  $('span.strength').text(strength);
});

parent.on('click', '.charm.plus', function () {
  let charm = parseInt($('span.charm').text());
  if (total < 1) return;
  --total; ++charm;
  info['charm'] = charm;
  $('span.total').text(total);
  $('span.charm').text(charm);
});
parent.on('click', '.charm.plus-five', function () {
  let charm = parseInt($('span.charm').text());
  if (total < 5) return;
  total -= 5; charm += 5;
  info['charm'] = charm;
  $('span.total').text(total);
  $('span.charm').text(charm);
});
parent.on('click', '.charm.minus', function () {
  let charm = parseInt($('span.charm').text());
  if (charm < 1) return;
  ++total; --charm;
  info['charm'] = charm;
  $('span.total').text(total);
  $('span.charm').text(charm);
});

parent.on('click', '.appreciation.plus', function () {
  let appreciation = parseInt($('span.appreciation').text());
  if (total < 1) return;
  --total; ++appreciation;
  info['appreciation'] = appreciation;
  $('span.total').text(total);
  $('span.appreciation').text(appreciation);
});
parent.on('click', '.appreciation.plus-five', function () {
  let appreciation = parseInt($('span.appreciation').text());
  if (total < 5) return;
  total -= 5; appreciation += 5;
  info['appreciation'] = appreciation;
  $('span.total').text(total);
  $('span.appreciation').text(appreciation);
});
parent.on('click', '.appreciation.minus', function () {
  let appreciation = parseInt($('span.appreciation').text());
  if (appreciation < 1) return;
  ++total; --appreciation;
  info['appreciation'] = appreciation;
  $('span.total').text(total);
  $('span.appreciation').text(appreciation);
});

parent.on('click', '.spirit.plus', function () {
  let spirit = parseInt($('span.spirit').text());
  if (total < 1) return;
  --total; ++spirit;
  info['spirit'] = spirit;
  $('span.total').text(total);
  $('span.spirit').text(spirit);
});
parent.on('click', '.spirit.plus-five', function () {
  let spirit = parseInt($('span.spirit').text());
  if (total < 5) return;
  total -= 5; spirit += 5;
  info['spirit'] = spirit;
  $('span.total').text(total);
  $('span.spirit').text(spirit);
});
parent.on('click', '.spirit.minus', function () {
  let spirit = parseInt($('span.spirit').text());
  if (spirit < 1) return;
  ++total; --spirit;
  info['spirit'] = spirit;
  $('span.total').text(total);
  $('span.spirit').text(spirit);
});

parent.on('click', '#random', doRandom);
parent.on('click', '#submit', doSubmit);