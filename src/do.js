function modifyText() {
  let mp = parseInt(document.getElementById('mp').innerText);
  document.getElementById('mp').innerText = mp - 1;
  let rdm = Math.floor((Math.random() * 3) + 1);
  if (rdm == 1) {
    let li = document.createElement('li');
    li.innerText = '你好吗';
    document.getElementById('event').appendChild (li);
  }
  else if (rdm == 2){
    let li = document.createElement('li');
    li.innerText = '我不好';
    document.getElementById('event').append(li);
    let hp = parseInt(document.getElementById('hp').innerText);
    document.getElementById('hp').innerText = hp - 1;
  }
  else if (rdm == 3) {
    let li = document.createElement('li');
    li.innerText = '我超市';
    document.getElementById('event').append(li);
    let hp = parseInt(document.getElementById('hp').innerText);
    document.getElementById('hp').innerText = hp + 1;
  }
  
}

document.getElementById('btn').addEventListener('click', modifyText, false);