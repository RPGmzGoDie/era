exports.CharactorData = function() {
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

// BaseMessage
class BaseMessage {
  constructor() {
    this.type = '';
    this.status = '';
    this.clear();
  }
  setInfo(info) {
    this.info = info;
  }
  getInfo() {
    return this.info;
  }
  clear() {
    this.info = {};
  }
  stringify() {
    return JSON.stringify({'type': this.type, 'status': this.status, 'content': this.info});
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
    if(datajson['type'] == this.type) {
      this.status = datajson['status'];
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
  clear() {
    this.info = {'username': ''};
  }
}

// LoginResponseMessage
class LoginResponseMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'login_response';
  }
  clear() {
    this.info = new exports.CharactorData();
  }
}

// RegisterRequestMessage
class RegisterRequestMessage extends BaseMessage{
  constructor(){
    super();
    this.type = 'register_request';
  }
  clear() {
    this.info = {
    'hp': 0,
    'capacity': 0,
    'strength': 0,
    'charm': 0,
    'appreciation': 0,
    'spirit': 0,
    'username': '',
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
    this.info = new exports.CharactorData();
  }
}

// DrawRequestMessage
class DrawRequestMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'draw_request';
  }
  clear() {
    this.info = {
    'type': 0,
    'content': ''
    };
  }
}

// DrawResponseMessage
class DrawResponseMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'draw_response';
  }
  clear() {
    this.info = new CharactorData();
  }
}

// EventRequestMessage
class EventRequestMessage extends BaseMessage {
  constructor() {
    super();
    this.type = 'event_request';
  }
  clear() {
    this.info = {
    'type': 0,
    'content': ''
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
    case 'event_request':
      return new EventRequestMessage();
    case 'event_response':
      return new EventResponseMessage();
    default:
      return new BaseMessage();
  }
};