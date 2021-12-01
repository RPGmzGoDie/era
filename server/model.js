const fs = require('fs'),
  events = require('events'),
  crypto = require('crypto')
base_data = require('./base_data');

const hash_fn = function () {
  const magic_num = BigInt(304250263527209);
  return function (str) {
    let hash = BigInt(crypto.randomInt(1023));
    if (str.length == 0) return '0';
    for (i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      hash += (hash << 2) + BigInt(ch - 1);
    }
    hash %= magic_num;
    return hash.toString();
  };
};

const concrete_hash_fn = hash_fn();

class modelEvents extends events {
  constructor() {
    super();
    this.user_table = new Array();
    this.user_data = new Map();
  }

  checkUser(username) {
    return this.user_table
      && this.user_table.findIndex((element) => element['user'] === username) !== -1;
  }

  findUser(username) {
    if (!this.checkUser(username)) {
      return new Map();
    }
    return this.user_data[username];
  }

  createUser(username) {
    if (this.checkUser(username)) {
      return '';
    }

    const unit_str = concrete_hash_fn(username);
    this.user_table.push({ 'user': username, 'unit': unit_str + '.json' });
    this.user_data[username] = base_data.character_init();
    return unit_str;
  }

  removeUser(username) {

  }

  findUserData(username) {
    if (!this.checkUser(username)) {
      return new Map();
    }
    return this.user_data[username];
  }

  updateUserData(username, args) {
    if (!this.checkUser(username)) {
      return new Map();
    }

    this.user_data[username].forEach((value, key) => {
      value = args[key];
    });

    return this.user_data[username];
  };
}

exports.model_ev = new modelEvents();

exports.model_ev.once('load_all_data', function () {
  fs.readFile('./data/user.json', (err, data) => {
    if (err) {
      console.log('load user data error!');
      throw err;
    }

    this.user_table = JSON.parse(data);
    this.user_table.forEach(element => {
      fs.readFile('./data/' + element['unit'], (err, unit_data) => {
        if (err) {
          console.log(element['unit'] + ' doesnt exist!');
          return;
        }

        this.user_data[element['user']] = JSON.parse(unit_data);
      });
    });
  });
});

exports.model_ev.on('save_user_data', function () {

});

exports.model_ev.on('save_unit_data', function (unit_str) {

});

exports.model_ev.once('save_all_data', function () {

});