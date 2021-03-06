const proto = require('./proto')
      model = require('./model');

const handle_login = function(username, info) {
  let user_data = model.data_model.findUserData(username);
  const response_message = proto.messageFunc('login_response');
  if (Object.keys(user_data).length > 0) {
    // update
    response_message.setSucess();
    response_message.setUsername(username);
    response_message.setInfo(user_data);
  } else {
    response_message.setStatus('登陆失败，账号不存在！');
  }

  return response_message;
};

const handle_register = function(username, info) {
  let response_message = proto.messageFunc('register_response');
  //check
  let sum = 0;
  Object.keys(info).forEach((key) => {
    if (key != 'name' && key != 'gender') {
      sum += info[key];
    }
  });
  if (sum !== 300) {
    response_message.setStatus('属性分配出错！');
    return response_message;
  }

  let user_data = model.data_model.createUser(username, info);
  if (Object.keys(user_data).length > 0) {
    // update
    response_message.setSucess();
    response_message.setUsername(username);
    response_message.setInfo(user_data); 

    // save
    model.data_model.emit('save_user_data');
    model.data_model.emit('save_unit_data', username);
  } else {
    response_message.setStatus('账号已存在，注册失败！');
  }

  return response_message;
};

const handle_draw = function(username, info) {
  let response_message = proto.messageFunc('draw_response');
  //check
  if (!username) {
    response_message.setStatus('傻逼错误！');
    return response_message;
  }
  let user_data = model.data_model.findUserData(username);
  if (!!user_data['race']) {
    response_message.setStatus('已选择种族！');
    return response_message;
  }
  // create
  const race = model.config_model.getRandomRace();
  //update
  const new_user_data = model.data_model.updateUserData(username, {'race': race});
  response_message.setSucess();
  response_message.setUsername(username);
  response_message.setInfo(new_user_data);
  
  //save
  model.data_model.emit('save_unit_data', username);

  return response_message;
};

const handle_event = function(username, info) {
  let response_message = proto.messageFunc('event_response');
  // check
  const user_data = model.data_model.findUserData(username);
  if(Object.keys(user_data).length == 0) {
    response_message.setStatus('账号出出出出错了！');
    return response_message;
  }

  // create 
  const event = model.config_model.getRandomEvent();
  if(Object.keys(event).length == 0) {
    response_message.setStatus('地球正在毁灭！');
    return response_message;
  }
 
  let attr = event['attr'];
  Object.keys(attr).forEach((key)=>{
    attr[key] = user_data[key] + attr[key];
  });
  const content = event['content'];
  attr['recent_events'] = JSON.parse(JSON.stringify(user_data['recent_events']));
  attr['recent_events'].push(content);
  while (attr['recent_events'].length >= 10) {
    attr['recent_events'].shift();
  }

  // update
  const new_user_data = model.data_model.updateUserData(username, attr);
  response_message.setSucess();
  response_message.setUsername(username);
  response_message.setInfo({'content': content, 'type': info['type'], 'info': new_user_data});
  
  // save
  model.data_model.emit('save_unit_data', username);
  
  return response_message;
};


exports.requset_handler = function(data) {
  let datajson = JSON.parse(data);
  const type = datajson['type'];
  const username = datajson['username'];
  const info = datajson['content'];
  switch (type) {
    case 'login_request':
      return handle_login(username, info);
    case 'register_request':
      return handle_register(username, info);
    case 'draw_request':
      return handle_draw(username, info);
    case 'event_request':
      return handle_event(username, info);
    default:
      console.log('requset_handler error!');
      return proto.messageFunc('');
  }
};

exports.init_data = function() {
  model.data_model.emit('load_all_data');
  console.log('===has loaded all data.===');
};

exports.init_config = function() {
  model.config_model.emit('load_all_config');
  console.log('===has loaded all config.===');
}