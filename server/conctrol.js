const proto = require('./proto')
      model = require('./model');

exports.init_data = function() {
  model.model_ev.emit('load_all_data');
  console.log("has loaded all data.");
};

const handle_login = function(message_content) {
  const username = message_content;
  const user_data = model.model_ev.findUser(username);
  let response_message = proto.message_func("login_response");
  if (user_data.size !== 0) {
    response_message.set(user_data);
  }

  return response_message;
};

const handle_register = function(message_content) {
  const unit_str = model.model_ev.createUser(username);
  if (unit_str != '') {
    model.model_ev.emit('save_user_data');
    model.model_ev.emit('save_unit_data', unit_str);
  }
};

const handle_event = function(message_content) {
  
};


exports.requset_handler = function(data) {
  let data_json = JSON.parse(data);
  const message_type = data_json["message_type"];
  const message_content = data_json["message_content"];
  switch (message_type) {
    case "login_request":
      return handle_login(message_content);
    case "register_request":
      return handle_register(message_content);
    case "event_request":
      return handle_event(message_content);
    default:
      console.log("requset_handler error!");
      return {};
  }
};

exports.getinfo = function() {
  return model.model_ev.user_data;
}