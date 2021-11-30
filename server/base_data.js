let character_data = function () {
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

  return function () {
    return {
      "name": this.name,
      "hp": this.hp,
      "capacity": this.capacity,
      "strength": this.strength,
      "charm": this.charm,
      "appreciation": this.appreciation,
      "spirit": this.spirit,
      "money": this.money,
      "race": this.race,
      "temperament": this.temperament,
      "mouth": this.mouth,
      "breast": this.breast,
      "breast_sense": this.breast_sense,
      "vagina_sense": this.vagina_sense,
      "lust": this.lust,
      "sex_times": this.sex_times,
      "sex_exp": this.sex_exp,
      "s_exp": this.s_exp,
      "m_exp": this.m_exp,
      "masturbation": this.masturbation,
      "sanity": this.sanity,
      "technique": this.technique,
      "level": this.level,
      "comsumed_num": this.consumed_num,
      "score": this.score,
      "quality": this.quality
    }
  };
};

exports.character_init = character_data();