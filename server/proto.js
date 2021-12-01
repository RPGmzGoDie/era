class CharactorData {
  constructor() {
    this.info = {
    'name': '',           // 名称
    'hp': 100,            // 生命
    'capacity': 100,      // 体力
    'strength': 0,        // 力量
    'charm': 0,           // 魅力 
    'appreciation': 0,    // 增值
    'spirit': 0,          // 精神
    'money': 0,           // 金钱
    'race': '',           // 种族
    'temperament': '',    // 性格
    'mouth': '',          // 口上
    'breast': '',         // 胸部大小
    'breast_sense': 0,    // 胸部敏感度
    'vagina_sense': 0,    // 阴道敏感度
    'lust': 0,            // 情欲开发度
    'sex_times': 0,       // 性交次数
    'sex_exp': 0,         // 侍奉经验
    's_exp': 0,           // S经验
    'm_exp': 0,           // M经验
    'masturbation': 0,    // 自慰经验
    'sanity': '',         // 精神状态
    'technique': 0,       // 技巧等级
    'level': 0,           // 等级
    'consumed_num': 0,    // 接待顾客数
    'score': 0,           // 评分
    'quality': []        // 素质
    }
  }
}

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
    return {'type': this.type, 'status': this.status, 'content': this.info};
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
    this.info = new CharactorData();
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
    this.character_init = character_init();
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
    'content': ''
    };
  }
}

// timer

// exports
exports.message_func = function (type) {
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