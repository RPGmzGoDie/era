const fs = require('fs'),
  events = require('events'),
  crypto = require('crypto')
proto = require('./proto');

const hash_fn = function () {
  const magic_num = BigInt(304250263527209);
  return function (str) {
    let hash = BigInt(crypto.randomInt(1024));
    if (str.length == 0) return '0';
    for (i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      hash += (hash << BigInt(2)) + BigInt(ch - 1);
    }
    hash %= magic_num;
    return hash.toString();
  };
};

const concrete_hash_fn = hash_fn();

// data
class DataModel extends events {
  constructor() {
    super();
    this.user_table = new Array();
    this.user_data = {};
  }

  checkUser(username) {
    return this.user_table.findIndex((element) => element['user'] === username) !== -1;
  }
  
  findUserInfo(username) {
    const index = this.user_table.findIndex((element) => element['user'] === username);
    if (index === -1) {
      return {};
    }
    return this.user_table[index];
  }
  
  findUserData(username) {
    if (!this.checkUser(username)) {
      return {};
    }
    return this.user_data[username];
  }

  createUser(info) {
    const username = info['username'];
    if (this.checkUser(username)) {
      return {};
    }

    const unit_str = concrete_hash_fn(username);
    this.user_table.push({ 'user': username, 'unit': unit_str + '.json' });
    this.user_data[username] = new proto.CharactorData();
    Object.keys(info).forEach((key) => {
      this.user_data[username][key] = info[key];
    });
    return this.user_data[username];
  }

  removeUser(username) {

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

exports.data_model = new DataModel();

exports.data_model.on('load_all_data', function () {
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

exports.data_model.on('save_user_data', function () {
  fs.writeFile('./data/user.json', JSON.stringify(this.user_table), (err) => {
    if (err) throw err;
    console.log('user.json has been saved!');
  });
});

exports.data_model.on('save_unit_data', function (username) {
  const user_info = this.findUserInfo(username);
  const unit = user_info['unit'];
  if (!unit) {return;}
  fs.writeFile('./data/' + unit + '.json', JSON.stringify(this.user_data[username]), (err) => {
    if (err) throw err;
    console.log(`${unit}.json has been saved!`);
  });
});

exports.data_model.once('save_all_data', function () {

});

// config
class ConfigModel extends events {
  constructor() {
    super();
    this.attr_config = {};
    this.events_table = new Array();
  }
  getRandomRace() {
    const index = crypto.randomInt(this.attr_config['race'].length);
    return this.attr_config['race'][index];
  }
  getRandomEvent() {
    const index = crypto.randomInt(this.events_table.length);
    return this.events_table[index]; 
  }
}

exports.config_model = new ConfigModel();

exports.config_model.on('load_all_config', function () {
  fs.readFile('./config/attr.json', (err, data) => {
    if (err) {
      console.log('load attr config error!');
      throw err;
    }

    this.attr_config = JSON.parse(data);
  });

  fs.readFile('./config/events.json', (err, data) => {
    if (err) {
      console.log('load events config error!');
      throw err;
    }

    this.events_table = JSON.parse(data);
  });
});