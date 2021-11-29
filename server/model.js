const fs = require('fs'),
      events = require('events');

const hash_fn = function() {
  const magic_num = BigInt(304250263527209);
  return function(str) {
    let hash = BigInt(0);
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      hash += ch << 2 + 1;
    }
    hash %= magic_num;
    return BigInt.asUintN(32, hash);
  }
};

const concrete_hash_fn = hash_fn();

class modelEvents extends events {
  constructor() {
    super();
    this.user_table = null;
    this.user_data = {};
  }

  get checkUser(username) {
    return this.user_table && this.user_table.include(username);
  }

  set createUser(username) {
    if (this.checkUser(username)) {
      return;
    }


  }

  set removeUser(username) {

  }
}

exports.model_ev = new modelEvents();

exports.model_ev.once('load_user_data', function() {
  fs.readFile('./data/user.json', (err, data) => {
    if (err) {
      console.log('load user data error!');
      throw err;
    }

    this.user_table = JSON.parse(data);
    this.user_table.forEach(element => {
      fs.readFile('./data/' +  element['data'], (err, unit_data) => {
        if (err) {
          console.log(element['data'] + " doesnt exist!");
          return;
        }
        
        this.user_data[element['user']] = JSON.parse(unit_data);
      });
    });
  });
});