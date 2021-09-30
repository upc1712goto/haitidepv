/**
 * API チュートリアル「1. 開発の始め方」のサンプルコードを参考にしています。
 * TextAlive App API basic example
 * https://github.com/TextAliveJp/textalive-app-basic
 * https://developer.textalive.jp/app/
 */

import { Player, stringToDataUrl } from "textalive-app-api";

let lyricsorder = -1;
let changeflag = true; 
let seekbarflag = false;
let deleteflag = true;

const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    var textelements = document.getElementsByClassName("lyricsframe");
    var footer = document.getElementById("phrase")
    var strSelect = document.getElementById("strselect");
    
    if(seekbarflag){
      footer.textContent = unit.parent.text;
      let index = unit.parent.text.indexOf(unit.text);
      footer.textContent = unit.parent.text.substring(0, index);
      console.log(unit.parent.text+", "+unit.text+", "+footer.textContent)
      if(lyricsorder != -1){
        textelements[lyricsorder].textContent = unit.parent.text;
        textelements[lyricsorder].textContent = textelements[lyricsorder].textContent.substring(0, index);
      }
      seekbarflag = false;
      return
    }

    if(unit.text === unit.parent.firstWord.text){
      footer.textContent = unit.text;
      if(textelements.length == 0){return;}
      if(changeflag){
        lyricsorder += 1;
        changeflag = false;
      }
      if(lyricsorder >= textelements.length){lyricsorder = 0;}
      if(deleteflag){
        while(textelements[lyricsorder].firstChild){
          textelements[lyricsorder].removeChild(textelements[lyricsorder].firstChild)
        }
        var new_word = document.createElement("div");
        
        if(strSelect.value == "popup"){
          new_word.style.animation = "popup 1.5s forwards";
        }else if(strSelect.value == "kurukuru"){
          new_word.style.animation = "kurukuru 1.5s forwards";
        }else if(strSelect.value == "slidein"){
          new_word.style.animation = "slidein 1.5s forwards";
        }else if(strSelect.value == "slideup"){
          new_word.style.animation = "slideup 1.5s forwards";
        }
        
        new_word.style.fontWeight = 800;
        new_word.style.display = "inline-block"
        new_word.textContent = unit.text;
        textelements[lyricsorder].appendChild(new_word);
      }
      deleteflag = false;
    }else if (footer.textContent.indexOf(unit.text) === -1 || !(footer.textContent.endsWith(unit.text))){
                footer.textContent += unit.text;
                if(textelements.count == 0){return;}
                changeflag = true;
                deleteflag = true;
                var new_word = document.createElement("div");
                if(strSelect.value == "popup"){
                  new_word.style.animation = "popup 1.5s forwards";
                }else if(strSelect.value == "kurukuru"){
                  new_word.style.animation = "kurukuru 1.5s forwards";
                }else if(strSelect.value == "slidein"){
                  new_word.style.animation = "slidein 1.5s forwards";
                }else if(strSelect.value == "slideup"){
                  new_word.style.animation = "slideup 1.5s forwards";
                }
                new_word.style.fontWeight = 800;
                new_word.style.display = "inline-block"
                new_word.textContent = unit.text;
                textelements[lyricsorder].appendChild(new_word);

    }
  }
};

// TextAlive Player を作る
// Instantiate a TextAlive Player instance
const player = new Player({
  app: {
    token: "ZsXTUU2tmfpHrO8F",
  },
  mediaElement: document.querySelector("#media"),
});

// TextAlive Player のイベントリスナを登録する
// Register event listeners
player.addListener({
  onAppReady,
  onVideoReady,
  onTimerReady,
  onTimeUpdate,
  onPlay,
  onPause,
  onStop,
});

const playBtns = document.querySelectorAll(".play");
const jumpBtn = document.querySelector("#jump");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");
const seekbar = document.querySelector("#seekbar");
const paintedSeekbar = seekbar.querySelector("div");

const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");

/**
 * TextAlive App が初期化されたときに呼ばれる
 *
 * @param {IPlayerApp} app - https://developer.textalive.jp/packages/textalive-app-api/interfaces/iplayerapp.html
 */
function onAppReady(app) {
  // TextAlive ホストと接続されていなければ再生コントロールを表示する
  // Show control if this app is launched standalone (not connected to a TextAlive host)
  if (!app.managed) {
    // ---
    // // blues / First Note
    // // https://piapro.jp/t/FDb1/20210213190029
    //
    // player.createFromSongUrl("https://piapro.jp/t/FDb1/20210213190029", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2121525/history
    //     beatId: 3953882,
    //     repetitiveSegmentId: 2099561,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FFDb1%2F20210213190029
    //     lyricId: 52065,
    //     lyricDiffId: 5093,
    //   },
    // });
    //
    // // ---
    // chiquewa / Freedom!
    
    // player.createFromSongUrl("https://piapro.jp/t/N--x/20210204215604", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2121403/history
    //     beatId: 3953761,
    //     repetitiveSegmentId: 2099586,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FN--x%2F20210204215604
    //     lyricId: 52094,
    //     lyricDiffId: 5171,
    //   },
    // });
    //
    // // ---
    // // ラテルネ / その心に灯る色は
    //
    player.createFromSongUrl("http://www.youtube.com/watch?v=bMtYf3R0zhY", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121404/history
        beatId: 3953902,
        repetitiveSegmentId: 2099660,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=bMtYf3R0zhY
        lyricId: 52093,
        lyricDiffId: 5177,
      },
    });
    //
    // // ---
    // // 真島ゆろ / 嘘も本当も君だから
    //
    // player.createFromSongUrl("https://piapro.jp/t/YW_d/20210206123357", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2121405/history
    //     beatId: 3953908,
    //     repetitiveSegmentId: 2099661,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FYW_d%2F20210206123357
    //     lyricId: 52061,
    //     lyricDiffId: 5123,
    //   },
    // });
    
    //
    // // ---
    // // シロクマ消しゴム / 夏をなぞって
    //
    // player.createFromSongUrl("https://piapro.jp/t/R6EN/20210222075543", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2121406/history
    //     beatId: 3953764,
    //     repetitiveSegmentId: 2099662,
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FR6EN%2F20210222075543
    //     lyricId: 52062,
    //     lyricDiffId: 5133,
    //   },
    // });

    // ---
    // 濁茶 / 密かなる交信曲
    
    // player.createFromSongUrl("http://www.youtube.com/watch?v=Ch4RQPG1Tmo", {
    //   video: {
    //     // 音楽地図訂正履歴: https://songle.jp/songs/2121407/history
    //     beatId: 3953917,
    //     repetitiveSegmentId: 2099665,
    // 
    //     // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=Ch4RQPG1Tmo
    //     lyricId: 52063,
    //     lyricDiffId: 5149,
    //   },
    // });

    document.querySelector("#control").style.display = "inline-block";
   
    // 再生ボタン / Start music playback
    playBtns.forEach((playBtn) =>
      playBtn.addEventListener("click", () => {
        player.video && player.requestPlay();
        playBtns[0].textContent = "再開！"
      })
    );

    // 歌詞頭出しボタン / Seek to the first character in lyrics text
    jumpBtn.addEventListener(
      "click",
      () => player.video && player.requestMediaSeek(player.video.firstChar.startTime)
    );

    // 一時停止ボタン / Pause music playback
    pauseBtn.addEventListener(
      "click",
      () => player.video && player.requestPause()
    );

    // 巻き戻しボタン / Rewind music playback
    rewindBtn.addEventListener(
      "click",
      () => player.video && player.requestMediaSeek(0)
    );
  }
}

/**
 * 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
 *
 * @param {IVideo} v - https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
 */
function onVideoReady(v) {
  // メタデータを表示する
  // Show meta data
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;

  // 定期的に呼ばれる各単語の "animate" 関数をセットする
  // Set "animate" function
  let w = player.video.firstWord;
  while (w) {
    w.animate = animateWord;
    w = w.next;
  }
  var showf = document.getElementById("showf")
  if(showf.childElementCount == 1){
    var index = 0;
    var img = document.createElement('img');
    img.src = imglist[index].currentSrc; // 画像パス
    img.className = "imgs";
    img.id = ids[index]; 
    img.height = 100;
    img.width = 100;
    img.style.position = "relative";
    img.style.left = -145;
    img.style.top = -15;
    img.classList.add("bound")
    img.classList.add("sample")
    
    // 指定した要素にimg要素を挿入
    showf.appendChild(img);
  }
}

/**
 * 音源の再生準備が完了した時に呼ばれる
 *
 * @param {Timer} t - https://developer.textalive.jp/packages/textalive-app-api/interfaces/timer.html
 */
function onTimerReady(t) {
  // ボタンを有効化する
  // Enable buttons
  if (!player.app.managed) {
    document
      .querySelectorAll("button")
      .forEach((btn) => (btn.disabled = false));
  }

  // 歌詞がなければ歌詞頭出しボタンを無効にする
  // Disable jump button if no lyrics is available
  jumpBtn.disabled = !player.video.firstChar;
}

/* 再生位置の情報が更新されたら呼ばれる */
let b, beat;
function onTimeUpdate(position) {
  //console.log("onTimeUpdate")
  // 現在のビート情報を取得
  beat = player.findBeat(position);
  if (b !== beat) {
    if (beat) {
      animateImage();
    }
    b = beat;
  }
  // シークバーの表示を更新
  paintedSeekbar.style.width = `${
    parseInt((position * 1000) / player.video.duration) / 10
  }%`;
  // 歌詞情報がなければこれで処理を終わる
  if (!player.video.firstChar) {
    return;
  }
}

/**
 * 動画の再生位置が変更されたときに呼ばれる（あまりに頻繁な発火を防ぐため一定間隔に間引かれる）
 *
 * @param {number} position - https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html#onthrottledtimeupdate
 */


// 再生が始まったら #overlay を非表示に
// Hide #overlay when music playback started
function onPlay() {
  document.querySelector("#overlay").style.display = "none";
}

// 再生が一時停止・停止したら歌詞表示をリセット
// Reset lyrics text field when music playback is paused or stopped
function onPause() {
  //document.querySelector("#text").textContent = "-";
}
function onStop() {
  //document.querySelector("#text").textContent = "-";
}


// オブジェクト生成ボタン
const createBtn = document.querySelector("#createb");
const prevBtn = document.querySelector("#prevb");
const nextBtn = document.querySelector("#nextb");
const revBtn = document.querySelector("#revb");
const prerevBtn = document.querySelector("#prerevb");
const helpBtn = document.querySelector("#helpb");
const releaseBtn = document.querySelector("#releaseb");
const deleteBtn = document.querySelector("#deleteb");
const overlayplayBtn = document.getElementsByClassName("play");
const forwardBtn = document.querySelector("#forwardb");
//const uiBtn = document.querySelector("#uib");
const uisBtn = document.getElementById("uis");
const uihBtn = document.getElementById("uih");
const imglist = document.querySelectorAll("img");
const new_image_area = document.getElementById("new_image_area");
const bgSelect = document.getElementById("bgselect");
const songSelect = document.getElementById("songselect");

let lyricslider = document.querySelector("#lyricslider");
let imgslider = document.querySelector("#imgslider");
const ids = [
  "uih",
  "bginfo",
  "prev",
  "wak",
  "next",
  "create",
  "prerev",
  "menu",
  "release",
  "rev",
  "delete",
  "forward",
  "miku1",
  "miku2",
  "negi1",    
  "negi2",    
  "lium1",    
  "lium2",    
  "green1",   
  "green2",   
  "yellow1",  
  "yellow2",  
  "pink1",    
  "pink2",    
  "red1",     
  "red2",     
  "blue1",    
  "blue2",    
  "orange1",  
  "orange2",  
  "heart_a1", 
  "heart_a2", 
  "heart_b1", 
  "heart_b2", 
  "onpu_a1",  
  "onpu_a2",  
  "onpu_b1",  
  "onpu_b2",  
  "star1",    
  "star2",
  "lyricsbox",    
];
const preview_ids = [
  "miku1",
  "negi1",    
  "lium1",    
  "green1",   
  "yellow1",  
  "pink1",    
  "red1",     
  "blue1",    
  "orange1",  
  "heart_a1", 
  "heart_b1", 
  "onpu_a1",  
  "onpu_b1",  
  "star1",    
  "lyricsbox",    
];
createBtn.addEventListener("click", () => createObject());
prerevBtn.addEventListener("click", () => prereverseObject());
prevBtn.addEventListener("click", () => prevObject());
nextBtn.addEventListener("click", () => nextObject());
revBtn.addEventListener("click", () => reverseObject());
helpBtn.addEventListener("click", () => showHelp());
playBtns[0].addEventListener("click", () => closeHelp());
overlayplayBtn[0].addEventListener("mouseout", () => mouseoutPlayBtn());
overlayplayBtn[0].addEventListener("mouseover", () => mouseoverPlayBtn());
releaseBtn.addEventListener("click", () => allRelease());
deleteBtn.addEventListener("click", () => deleteImg());
forwardBtn.addEventListener("click", () => forwardImg());
//uiBtn.addEventListener('click', () => toggleUI());
uisBtn.addEventListener('click', () => toggleUI());
uihBtn.addEventListener('click', () => toggleUI());
bgSelect.addEventListener("change", () => changeBackground());
songSelect.addEventListener("change", () => changeSongurl());
//「トリガー」の設定
lyricslider.addEventListener("input", changeFontSize);
imgslider.addEventListener("input", changeImgSize);

//オブジェクトの作成
function createObject(){
  var selected = document.getElementById("selected")
  //var index = Math.floor(Math.random() * 2);
  var index = ids.indexOf(selected.textContent);
  var img = document.createElement('img');
  var lyrics = document.createElement('span');
  var frames = document.getElementsByClassName("lyricsframe");
  var sample = document.getElementById("showf").children[1];
  var lyricsize = document.getElementById("lyricsize")

  if(selected.textContent != "lyricsbox"){
    img.src = imglist[index+5].currentSrc; // 画像パス
    img.className = "imgs";
    img.id = ids[index]; 
    if(index == ids.length-1){
      img.height = 600;
      img.width = 600;
    }else if(index < 16){
      img.height = 100;
      img.width = 100;
    }else{
      img.height = 80;
      img.width = 80;
    }
    img.style.position = "absolute";
    img.style.top = "300px";

    if(sample.classList.contains("reverse") == true){
      img.classList.add("reverse")
      img.classList.add("boundrev")
    }else{
      img.classList.add("bound")
    }
    img.style.zIndex = 0;
    // console.log(img)
    // 指定した要素にimg要素を挿入
    new_image_area.appendChild(img);
  }else{
    var array = [];
    for(var i=0; i<frames.length; i++){
      array.push(Number(frames[i].getAttribute("id").replace(/lyrics/, "")))
    }
    for (var i = 0; i<frames.length+1; i++) {
      if (array.indexOf(i) === -1) {
        lyrics.id = "lyrics" + String(i);
        break;
      }
    }
    //console.log(array)
    lyrics.classList.add("lyricsframe");
    lyrics.style.position = "absolute";
    lyrics.style.top = "300px";
    lyrics.textContent = "-----";
    lyrics.classList.add("disselectable")
    lyrics.style.fontSize = lyricsize.textContent + "px";
    //console.log(lyrics)
    new_image_area.appendChild(lyrics);
  }  
}
function prereverseObject(){
  var showf = document.getElementById("showf")
  var img = showf.children[1];

  if(img.id == "lyricsbox"){return;}
  if(img.classList.contains("reverse") == true){
    img.classList.remove("reverse");
    img.classList.remove("boundrev");
    img.classList.add("bound");
  }else{
    img.classList.add("reverse");
    img.classList.add("boundrev");
    img.classList.remove("bound");
  }

}
//作成オブジェクトの候補を前へ
function prevObject(){
  var selected = document.getElementById("selected")
  var index = preview_ids.indexOf(selected.textContent);
  index -= 1;
  if(index < 0){
    index = preview_ids.length - 1;
  }
  selected.textContent = preview_ids[index];

  var showf = document.getElementById("showf")
  var img = document.createElement('img');
  var old = showf.children[1];
  index = ids.indexOf(selected.textContent);
  img.src = imglist[index+5].currentSrc; // 画像パス
  img.className = "imgs";
  img.id = ids[index]; 
  img.height = 100;
  img.width = 100;
  img.style.position = "relative";
  img.style.left = -145;
  img.style.top = -15;
  if(selected.textContent !== "lyricsbox"){
    img.classList.add("bound")
  }
  img.classList.add("sample")
  
  // 指定した要素にimg要素を挿入
  showf.removeChild(old);
  showf.appendChild(img);
}
//作成オブジェクトの候補を次へ
function nextObject(){
  var selected = document.getElementById("selected")
  var index = preview_ids.indexOf(selected.textContent);
  index += 1;
  if(index > preview_ids.length - 1){
    index = 0;
  }
  selected.textContent = preview_ids[index];

  var showf = document.getElementById("showf")
  var img = document.createElement('img');
  var old = showf.children[1];
  index = ids.indexOf(selected.textContent);
  img.src = imglist[index+5].currentSrc; // 画像パス
  img.className = "imgs";
  img.id = ids[index]; 
  img.height = 100;
  img.width = 100;
  img.style.position = "relative";
  img.style.left = -145;
  img.style.top = -15;
  if(selected.textContent !== "lyricsbox"){
    img.classList.add("bound")
  }
  img.classList.add("sample")
  
  // 指定した要素にimg要素を挿入
  showf.removeChild(old);
  showf.appendChild(img);
}
//反転場の上の乗ってるものを反転
function reverseObject(){
  var now_imgs = document.getElementsByClassName("imgs")
  //var revf = document.getElementById("reversef").getBoundingClientRect()
  //var center = {x: 0, y: 0};
  //console.log(selected)
  for(var i=0; i<now_imgs.length; i++){
    if(now_imgs[i].classList.contains("target")){
      if(!(now_imgs[i].classList.contains("reverse"))){
        now_imgs[i].classList.add("reverse");
        now_imgs[i].classList.add("boundrev");
        now_imgs[i].classList.remove("bound");
      }else{
        now_imgs[i].classList.add("bound");
        now_imgs[i].classList.remove("reverse");
        now_imgs[i].classList.remove("boundrev");
      }
    }
  }
}
//画像の入れ替え(アニメーション)
function animateImage(){
  var now_imgs = document.getElementsByClassName("imgs")
  //console.log(now_imgs)
  for(let i=0; i<now_imgs.length; i++){
    if(now_imgs[i].id.includes("1")){
      now_imgs[i].id = now_imgs[i].id.replace("1", "2");
      now_imgs[i].src = imglist[ids.indexOf(now_imgs[i].id)+5].currentSrc;
    }else if(now_imgs[i].id.includes("2")){
      now_imgs[i].id = now_imgs[i].id.replace("2", "1");
      now_imgs[i].src = imglist[ids.indexOf(now_imgs[i].id)+5].currentSrc;
    }
  }
}
/* シークバー */
seekbar.addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    player.requestMediaSeek(
      (player.video.duration * e.offsetX) / seekbar.clientWidth
    );
    seekbarflag = true;
  }
  return false;
});

// fontサイズ
const spacePadding = function(val, len){
  val = val.replace("&nbsp;", "")
  for(let i=val.length; i<len; i++){
    val = " " + val;
  }
  return val;
}
function changeFontSize(e) {
  var textelements = document.getElementsByClassName("lyricsframe");
  var lyricsize = document.getElementById("lyricsize");
  for(var i=0; i<textelements.length; i++){
    textelements[i].style.fontSize = e.target.value +"px";
  }
  lyricsize.textContent = spacePadding(e.target.value, 3);
}
function changeImgSize(e) {
  var targetimgsize = document.getElementById("targetimgsize");
  var target = document.getElementsByClassName("target")
  targetimgsize.textContent = spacePadding(e.target.value, 3);
  for(var i=0; i<target.length; i++){
    target[i].style.width = e.target.value + "px";
    target[i].style.height = e.target.value + "px";
  }
}
function showHelp(){
  var overlay = document.querySelector("#overlay")
  //console.log(playBtns)
  if(overlay.style.display == "none"){
    overlay.style.display = "";
  }
}
function closeHelp(){
  var overlay = document.querySelector("#overlay")
  //console.log(playBtns)
  if(overlay.style.display == ""){
    overlay.style.display = "none";
  }
}
function mouseoutPlayBtn(){
  overlayplayBtn[0].style.backgroundColor = "#cfdfd3"
  var overlayl = document.getElementById("overlayl")
  var overlayr = document.getElementById("overlayr")
  overlayl.src = imglist[ids.indexOf("miku2")+5].currentSrc;
  overlayr.src = imglist[ids.indexOf("miku2")+5].currentSrc;
}
function mouseoverPlayBtn(){
  overlayplayBtn[0].style.backgroundColor = "#73f894"
  var overlayl = document.getElementById("overlayl")
  var overlayr = document.getElementById("overlayr")
  overlayl.src = imglist[ids.indexOf("miku1")+5].currentSrc;
  overlayr.src = imglist[ids.indexOf("miku1")+5].currentSrc;
}
function allRelease(){
  var imgelements = document.getElementsByClassName("imgs");
  var lyricselements = document.getElementsByClassName("lyricsframe");
  //console.log(imgelements)
  for(var i=0; i<imgelements.length; i++){
    if(imgelements[i].classList.contains("target")){
      imgelements[i].classList.remove("target")
    }
  }
  for(var i=0; i<lyricselements.length; i++){
    if(lyricselements[i].classList.contains("target")){
      lyricselements[i].classList.remove("target")
    }
  }
}
function deleteImg(){
  var imgelements = document.getElementsByClassName("imgs");
  var lyricselements = document.getElementsByClassName("lyricsframe");
  var itargets = [];
  var etargets = [];
  let deletecount = 0;
 
  for(var i=0; i<imgelements.length; i++){
    if(imgelements[i].classList.contains("target")){
      itargets.push(i);
    }
  }  
  for(var i=0; i<lyricselements.length; i++){
    if(lyricselements[i].classList.contains("target")){
      etargets.push(i);
    }
  }
  for(var i=0; i<itargets.length; i++){
    new_image_area.removeChild(imgelements[itargets[i]-deletecount]);
    deletecount += 1;
  }
  deletecount = 0;
  for(var i=0; i<etargets.length; i++){
    new_image_area.removeChild(lyricselements[etargets[i]-deletecount]);
    deletecount += 1;
  }
  //new_image_area.removeChild(imgelements[i]);
}
function forwardImg(){
  var imgelements = document.getElementsByClassName("imgs");
  //console.log(imgelements)
  for(var i=0; i<imgelements.length; i++){
    if(imgelements[i].classList.contains("target")){
      imgelements[i].style.zIndex += 1;
    }
  }

}
function toggleUI(){
  var ui = document.getElementsByClassName("ui");
  var showfield = document.getElementById("showfield");
  var panel = document.getElementById("panel");
  var control = document.getElementById("control");
  var phrase = document.getElementById("phrase");
  var bginfo = document.getElementById("bginfo");
  var bgselect = document.getElementById("bgselect");
  var menu = document.getElementById("menu");
  var help = document.getElementById("helpb");
  var strinfo = document.getElementById("strinfo");
  var strselect = document.getElementById("strselect");

  ui[0].style.display = (ui[0].style.display == "none") ? "inline" : "none";
  ui[1].style.display = (ui[1].style.display == "none") ? "inline" : "none";
  showfield.style.display = (showfield.style.display == "none") ? "inline" : "none";
  panel.style.display = (panel.style.display == "none") ? "inline-block" : "none";
  control.style.display = (control.style.display == "none") ? "inline-block" : "none";
  phrase.style.display = (phrase.style.display == "none") ? "inline-block" : "none";
  bginfo.style.display = (bginfo.style.display == "none") ? "inline-block" : "none";
  bgselect.style.display = (bgselect.style.display == "none") ? "inline-block" : "none";  
  menu.style.display = (menu.style.display == "none") ? "inline-block" : "none";
  help.style.display = (help.style.display == "none") ? "inline-block" : "none";
  strinfo.style.display = (strinfo.style.display == "none") ? "inline-block" : "none";
  strselect.style.display = (strselect.style.display == "none") ? "inline-block" : "none";
  
}
function changeBackground(){
  var bgpattern = document.getElementById("bgselect");
  var bg = document.getElementById("background");
  bg.className = "";
  bg.classList.add(bgpattern.value);
}
function changeSongurl(){
  var targetsong = document.getElementById("songselect");
  //console.log(targetsong.value)
  //console.log(player.mediaElement)

  if(targetsong.value == "sfirst"){
    player.createFromSongUrl("https://piapro.jp/t/FDb1/20210213190029", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121525/history
        beatId: 3953882,
        repetitiveSegmentId: 2099561,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FFDb1%2F20210213190029
        lyricId: 52065,
        lyricDiffId: 5093,
      },
    });
  }else if(targetsong.value == "ssecond"){ 
    player.createFromSongUrl("https://piapro.jp/t/N--x/20210204215604", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121403/history
        beatId: 3953761,
        repetitiveSegmentId: 2099586,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FN--x%2F20210204215604
        lyricId: 52094,
        lyricDiffId: 5171,
      },
    });
  }else if(targetsong.value == "sthird"){ 
    player.createFromSongUrl("http://www.youtube.com/watch?v=bMtYf3R0zhY", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121404/history
        beatId: 3953902,
        repetitiveSegmentId: 2099660,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=bMtYf3R0zhY
        lyricId: 52093,
        lyricDiffId: 5177,
      },
    });
  }else if(targetsong.value == "sfourth"){ 
    player.createFromSongUrl("https://piapro.jp/t/YW_d/20210206123357", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121405/history
        beatId: 3953908,
        repetitiveSegmentId: 2099661,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FYW_d%2F20210206123357
        lyricId: 52061,
        lyricDiffId: 5123,
      },
    });
  }else if(targetsong.value == "sfifth"){ 
    player.createFromSongUrl("https://piapro.jp/t/R6EN/20210222075543", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121406/history
        beatId: 3953764,
        repetitiveSegmentId: 2099662,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FR6EN%2F20210222075543
        lyricId: 52062,
        lyricDiffId: 5133,
      },
    });
  }else if(targetsong.value == "ssixth"){     
    player.createFromSongUrl("http://www.youtube.com/watch?v=Ch4RQPG1Tmo", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2121407/history
        beatId: 3953917,
        repetitiveSegmentId: 2099665,
    
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=Ch4RQPG1Tmo
        lyricId: 52063,
        lyricDiffId: 5149,
      },
    });
  }
}
document.addEventListener("click",  function(){
  //要素の取得
  var imgelements = document.getElementsByClassName("imgs");
  var textelements = document.getElementsByClassName("lyricsframe");
  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;  var y;
  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for(var i = 0; i < imgelements.length; i++) {
    if(imgelements[i].classList.contains("sample")){continue;}
    imgelements[i].addEventListener("mousedown", mdown, false);
    imgelements[i].addEventListener("touchstart", mdown, false);
  }
  for(var i = 0; i < textelements.length; i++) {
    if(textelements[i].classList.contains("sample")){continue;}
    textelements[i].addEventListener("mousedown", mdown, false);
    textelements[i].addEventListener("touchstart", mdown, false);
  }
  
  //マウスが押された際の関数
  function mdown(e) {
      //console.log("clicked")
      //クラス名に .drag を追加
      if(e.type === "mousedown"){
        this.classList.add("drag");
      }
      //console.log(this)

      //タッチデイベントとマウスのイベントの差異を吸収
      if(e.type === "mousedown") {
          var event = e;
      } else {
          var event = e.changedTouches[0];
      }

      //要素内の相対座標を取得
      x = event.pageX - this.offsetLeft;
      y = event.pageY - this.offsetTop;

      //ムーブイベントにコールバック
      document.body.addEventListener("mousemove", mmove, false);
      document.body.addEventListener("touchmove", mmove, false);
  }


  //マウスカーソルが動いたときに発火
  function mmove(e) {
    //console.log("mouse moving")
    //ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];
    
    if(typeof drag !== "undefined"){
      //同様にマウスとタッチの差異を吸収
      if(e.type === "mousemove") {
          var event = e;
      } else {
          var event = e.changedTouches[0];
      }

      //フリックしたときに画面を動かさないようにデフォルト動作を抑制
      e.preventDefault();

      //マウスが動いた場所に要素を動かす
      drag.style.top = event.pageY - y + "px";
      drag.style.left = event.pageX - x + "px";

      //マウスボタンが離されたとき、またはカーソルが外れたとき発火
      drag.addEventListener("mouseup", mup, false);
      document.body.addEventListener("mouseleave", mup, false);
      drag.addEventListener("touchend", mup, false);
      document.body.addEventListener("touchleave", mup, false);
    }
  }

  //マウスボタンが上がったら発火
  function mup(e) {
      //console.log("mouse up")
      var x = e.clientX;
      var y = e.clientY;

      var drag = document.getElementsByClassName("drag")[0];
      //console.log(recyclezone)
      if(typeof drag !== "undefined"){
        //ムーブベントハンドラの消去
        drag.removeEventListener("mouseup", mup, false);
        drag.removeEventListener("touchend", mup, false);
        //クラス名 .drag も消す
        drag.classList.remove("drag");
        document.body.removeEventListener("touchmove", mmove, false);
        document.body.removeEventListener("mousemove", mmove, false);
      }
  }
});

document.oncontextmenu = function(){return false;}
document.addEventListener("contextmenu",  function(e){
  //要素の取得
  var imgelements = document.getElementsByClassName("imgs");
  var lyricselements = document.getElementsByClassName("lyricsframe");
  var lyricsize = document.getElementById("lyricsize");
  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for(var i = 1; i < imgelements.length; i++) {
      //imgelements[i].addEventListener("contextmenu", rmdown, true);
      if((imgelements[i].x <= e.clientX && e.clientX <= imgelements[i].x + imgelements[i].width) &&
         (imgelements[i].y <= e.clientY && e.clientY <= imgelements[i].y + imgelements[i].height)){
        rmdown(imgelements[i])
      }
  }
  for(var i = 0; i < lyricselements.length; i++) {
    if((Number(lyricselements[i].style.left.replace("px", "")) <= e.clientX && e.clientX <= Number(lyricsize.textContent*7) + Number(lyricselements[i].style.left.replace("px", ""))) &&
       (Number(lyricselements[i].style.top.replace("px", ""))  <= e.clientY && e.clientY <= Number(lyricsize.textContent)   + Number(lyricselements[i].style.top.replace("px", "")))){
      rmdown(lyricselements[i])
    }
}
  //マウスが押された際の関数
  function rmdown(img) {
    console.log(img)
    if(!(img.classList.contains("target"))){
      img.classList.add("target");
    }else{
      img.classList.remove("target");
    }
  }
});