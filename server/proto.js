exports.CharactorData = function () {
  this.name = "";           // 名称
  this.hp = 100;            // 生命
  this.capacity = 100;      // 体力
  this.strength = 0;        // 力量
  this.charm = 0;           // 魅力 
  this.appreciation = 0;    // 增值
  this.spirit = 0;          // 精神
  this.money = 0;           // 金钱
  this.race = "";           // 种族
  this.temperament = "";    // 性格
  this.mouth = "";          // 口上
  this.breast = "";         // 胸部大小
  this.breast_sense = 0;    // 胸部敏感度
  this.vagina_sense = 0;    // 阴道敏感度
  this.lust = 0;            // 情欲开发度
  this.sex_times = 0;       // 性交次数
  this.sex_exp = 0;         // 侍奉经验
  this.s_exp = 0;           // S经验
  this.m_exp = 0;           // M经验
  this.masturbation = 0;    // 自慰经验
  this.sanity = "";         // 精神状态
  this.technique = 0;       // 技巧等级
  this.level = 0;           // 等级
  this.consumed_num = 0;    // 接待顾客数    
  this.score = 0;           // 评分
  this.quality = [];        // 素质
};

exports.CharactorData.prototype.set = function (info) {
  this.name = info['name'];
  this.hp = info['hp'];
  this.capacity = info['capacity'];
  this.strength = info['strength'];
  this.charm = info['charm'];
  this.appreciation = info['appreciation'];
  this.spirit = info['spirit'];
  this.money = info['money'];
  this.race = info['race'];
  this.temperament = info['temperament'];
  this.mouth = info['mouth'];
  this.breast = info['breast'];
  this.breast_sense = info['breast_sense'];
  this.vagina_sense = info['vagina_sense'];
  this.lust = info['lust'];
  this.sex_times = info['sex_times'];
  this.sex_exp = info['sex_exp'];
  this.s_exp = info['s_exp'];
  this.m_exp = info['m_exp'];
  this.masturbation = info['masturbation'];
  this.sanity = info['sanity'];
  this.technique = info['technique'];
  this.level = info['level'];
  this.consumed_num = info['consumed_num'];
  this.score = info['score'];
  this.quality = info['quality'];
};

// BaseMessage
class BaseMessage {
  constructor() {
    this.clear();
  }
  setInfo(info) {
    this.info = info;
  }
  getInfo() {
    return this.info;
  }
  setUsername(username) {
    this.username = username;
  }
  getUsername() {
    return this.username;
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = {};
  }
  stringify() {
    return JSON.stringify({ 'type': this.type, 'status': this.status, 'username': this.username, 'content': this.info });
  }
  setSucess() {
    this.status = 'Success';
  }
  isSucess() {
    return this.status === 'Success';
  }
  setStatus(status) {
    this.status = status;
  }
  init(datajson) {
    if (datajson['type'] == this.type) {
      this.status = datajson['status'];
      this.username = datajson['username'];
      this.info = datajson['content'];
    }
  }
};

// LoginRequestMessage
class LoginRequestMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'login_request';
  }
}

// LoginResponseMessage
class LoginResponseMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'login_response';
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = new exports.CharactorData();
  }
}

// RegisterRequestMessage
class RegisterRequestMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'register_request';
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = {
      'hp': 0,
      'capacity': 0,
      'strength': 0,
      'charm': 0,
      'appreciation': 0,
      'spirit': 0,
      'name': '',
      'gender': ''
    };
  }
}

// RegisterResponseMessage
class RegisterResponseMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'register_response';
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = new exports.CharactorData();
  }
}

// DrawRequestMessage
class DrawRequestMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'draw_request';
  }
}

// DrawResponseMessage
class DrawResponseMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'draw_response';
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = new exports.CharactorData();
  }
}

// EventRequestMessage
class EventRequestMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'event_request';
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = {
      'type': 0
    };
  }
}

// EventResponseMessage
class EventResponseMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'event_response';
  }
  clear() {
    this.status = '';
    this.username = '';
    this.info = {
      'type': 0,
      'content': '',
      'info': {}
    };
  }
}

// timer

// exports
exports.messageFunc = function (type) {
  switch (type) {
    case 'login_requset':
      return new LoginRequestMessage();
    case 'login_response':
      return new LoginResponseMessage();
    case 'register_request':
      return new RegisterRequestMessage();
    case 'register_response':
      return new RegisterResponseMessage();
    case 'draw_request':
      return new DrawRequestMessage();
    case 'draw_response':
      return new DrawResponseMessage();
    case 'event_request':
      return new EventRequestMessage();
    case 'event_response':
      return new EventResponseMessage();
    default:
      return new BaseMessage();
  }
};