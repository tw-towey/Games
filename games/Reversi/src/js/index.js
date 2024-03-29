/*
 * @Author: tuWei
 * @Date: 2022-02-05 23:46:58
 * @LastEditors: tuWei
 * @LastEditTime: 2022-10-13 20:19:15
 */
const R = new Reversi(),
  boxTop = document.querySelector("#box-top"),
  Url = document.querySelector("#url"),
  gType = document.querySelector("#g-type"),
  size = document.querySelector("#size"),
  doublePs = document.querySelector("#doublePs"),
  boxUrl = document.querySelector(".boxUrl"),
  boxDouble = document.querySelector(".boxDouble"),
  loadding = document.querySelector(".loadding"),
  weBox = document.querySelector(".weBox");
let flag = false;
function changeTye() {
  R.gameType = gType.value - 0;
  boxUrl.style.display = "none";
  boxDouble.style.display = "none";
  weBox.style.display = "none";
  R.isDouble = false;
  if (R.gameType === 1) {
    boxUrl.style.display = "block";
  } else if (R.gameType === 3) {
    boxDouble.style.display = "block";
    weBox.style.display = "inline-block";
    R.isDouble = true;
  }
}
function openSet() {
  setBox.style.display = "block";
  boxTop.style.display = "none";
}
function changeCor() {
  R.sColorType = color.value - 0;
}
function changeUrl() {
  R.Url = Url.value;
}
function changeSize() {
  R.size = size.value - 0;
}
function changeDoublePs() {
  flag = false;
  R.doublePs = doublePs.value;
  loadding.innerText = "";
}
function startGame() {
  if (R.gameType === 3 && flag) {
    return;
  }
  if (R.gameType === 1 && !R.Url) {
    R.showMessage("请输入服务器地址");
    return;
  }
  if (R.gameType === 3) {
    flag = true;
    loadding.style.display = "block";
    R.gameColor = R.sColorType;
  }
  if (R.gameType === 3 && !(R.doublePs.replace(/\s/g, "").length > 0)) {
    loadding.innerText = "对局密码不可为空";
    return;
  }
  R.colorType = R.sColorType;
  R.gameOver = "";
  R.message = "";
  if (R.gameType === 1) {
    Http.post({
      url: R.Url + "/blackandwhite/openGame",
      type: "POST",
      data: {
        dimension: R.size - 0,
        gameType: 1,
      },
      success: (res) => {
        setBox.style.display = "none";
        boxTop.style.display = "block";
        //获取游戏id
        R.gameId = res.data ? res.data.gameId : "";
        R.initReversi();
      },
      error: () => { },
    });
  }
  // if(R.gameType !== 3){
  setBox.style.display = "none";
  boxTop.style.display = "block";
  // }
  R.initReversi();
}
