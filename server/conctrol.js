const proto = require('./proto')
      model = require('./model');

exports.init_data = function() {
  model.model_ev.emit('load_user_data');
  console.log("has loaded data.");
};

const handle_login = function(message_content) {
  const username = message_content;
  
};

const handle_register = function(message_content) {

};

const handle_event = function(message_content) {

};


exports.requset_handler = function(data) {
  let data_json = JSON.parse(data);
  const message_type = data_json["message_type"];
  const message_content = data_json["message_content"];
  switch (message_type) {
    case "login_request":
      handle_login(message_content); break;
    case "register_request":
      handle_register(message_content); break;
    case "event_request":
      handle_event(message_content); break;
    default:
      console.log("requset_handler error!");
  }
};



exports.getinfo = function() {
  return model.model_ev.user_data;
}