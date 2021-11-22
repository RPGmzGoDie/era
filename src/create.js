var info = {}
var parent = $("#create");
doNext = function () {
  let name = $("input#name").Text();
  if (name.length <= 0) {
    alert("请输入名字！");
    return;
  }

  info["name"] = name;
  parent.empty();  
  
  changeToAttrDom();
};

changeToAttrDom = function() {
  parent.append('<p>生命力:<span class="hp">0</span></p><button>+</button><button>-</button><br>');
  parent.append('<p>体力:<span class="capacity">0</span></p><button>+</button><button>-</button><br>');
  parent.append('<p>力量:<span class="strength">0</span></p><button>+</button><button>-</button><br>');
  parent.append('<p>魅力:<span class="charm">0</span></p><button>+</button><button>-</button><br>');
  parent.append('<p>财富:<span class="money">0</span></p><button>+</button><button>-</button><br>');
  parent.append('<p>精神:<span class="spirit">0</span></p><button>+</button><button>-</button><br>');
  parent.append('<button id="submit"><button>');
}

submit = function() {
  alert("done!");
}

$("#next").click(doNext);
$("#submit").click(submit);