const fs = require('fs'),
  events = require('events'),
  crypto = require('crypto')
  proto = require('./proto');

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

class ModelEvents extends events {
  constructor() {
    super();
    this.user_table = new Array();
    this.user_data = {};
  }

  checkUser(username) {
    return this.user_table
      && this.user_table.findIndex((element) => element['user'] === username) !== -1;
  }

  findUser(username) {
    if (!this.checkUser(username)) {
      return {};
    }
    return this.user_data[username];
  }

  createUser(username) {
    if (this.checkUser(username)) {
      return ['', {}];
    }

    const unit_str = concrete_hash_fn(username);
    this.user_table.push({ 'user': username, 'unit': unit_str + '.json' });
    this.user_data[username] = new proto.CharactorData();
    return [unit_str, this.user_data[username]];
  }

  removeUser(username) {

  }

  findUserData(username) {
    if (!this.checkUser(username)) {
      return {};
    }
    return this.user_data[username];
  }

  updateUserData(username, args) {
    if (!this.checkUser(username)) {
      return {};
    }

    this.user_data[username].forEach((value, key) => {
      value = args[key];
    });

    return this.user_data[username];
  };
}

exports.model_ev = new ModelEvents();

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
  fs.write('./data/user.json', JSon.stringify(this.user_table), (err) => {
    if (err) throw err;
    console.log('user.json has been saved!');
  });
});

exports.model_ev.on('save_unit_data', function (user_unit) {
  fs.write('./data/' + user_unit[1] + '.json', JSon.stringify(this.user_data[user_unit[0]]), (err) => {
    if (err) throw err;
    console.log(`${user_unit[1]}.json has been saved!`);
  });
});

exports.model_ev.once('save_all_data', function () {

});