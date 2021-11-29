const fs = require('fs'),
      events = require('events');

exports.model_ev = new events();

exports.model_ev.once('load_user_data', function() {
  fs.readFile('./data/user.json', function (err, data) {
    if (err) {
      console.log('load user data error!');
      throw err;
    }

    this.user_table = JSON.parse(data);
    this.user_data = {};
    this.user_table.forEach(element => {
      fs.readFile('./data/' +  element['data'], function(err, unit_data) {
        if (err) {
          console.log(element['data'] + " doesnt exist!");
          return;
        }

        this.user_data[element['user']] = JSON.parse(unit_data);
      });
    }, this);
  });
});