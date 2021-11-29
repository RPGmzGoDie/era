const proto = require('./proto')
      model = require('./model');

exports.init_data = function() {
  model.model_ev.emit('load_user_data');
  console.log("has loaded data.");
};

exports.requset_handler = function() {

};

exports.getinfo = function() {
  console.log(model.model_ev.__proto__);
  return model.model_ev.user_data;
}