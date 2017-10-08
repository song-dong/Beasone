

       var multiparty;
       var myCount = 0;
       var translation;
       var startMsg = 'Click on the "Space key" and begin speaking for as long as you like.';
       var speechMsg = "Speech now."; 

       function start() {
            
           // MultiParty インスタンスを生成
           multiparty = new MultiParty({
               "key": "1061e0f9-3006-4af2-8266-82ce6c34b677" /* SkyWay key */ ,
               "reliable": true /* Use reliable communication(SCTP) in Data Channel. */ ,
               "room": "groupA",
               "debug": 3
           });
           //
           // var existingCalls = {};

           /////////////////////////////////
           // for MediaStream
           multiparty.on('my_ms', function (video) {

               // 自分のvideoを表示
               var vNode = MultiParty.util.createVideoNode(video);
               vNode.setAttribute("class", "my-video");
               vNode.volume = 0;
               $(vNode).appendTo("#myVideo");
           }).on('peer_ms', function (video) {
               console.log("video received!!")
                myCount=myCount+1;

               // peerのvideoを表示
               console.log(video);
               var vNode = MultiParty.util.createVideoNode(video);
               vNode.setAttribute("class", "peer-video friends-video"+ myCount);

            if(myCount>4){
                // 自分を含めて5名までとする
                // alert("over");
            }else{
                // alert(myCount);
               $(vNode).appendTo("#monitorContainer");   
                $('<div>').attr({
                  id: 'interim_span'+myCount,
                  class: 'interim_span',
                  width: '100px',
                  height: '10px',
                  positian: 'absolute'
                }).appendTo(vNode);
                if(myCount==1){
                    var myWidth =  $("#monitorContainer").width*0.7; 
                    $(".peer-video").css({width:myWidth});
                }else if(myCount==2){
                    var myWidth = $("#monitorContainer").width()/myCount-10;                    
                    $(".peer-video").css({width:myWidth});
                }else if(myCount==3){
                    var myWidth = $("#monitorContainer").width()/myCount-10;
                   $(".peer-video").css({width:myWidth});                  
                }else if(myCount==4){
                    var myWidth = $("#monitorContainer").height()/2-10;
                    // alert("3");
                    // $(".friends-video3").css(top,'50%');
                    // $(".friends-video4").css(top,'50%');
                    $(".peer-video").css({height:myWidth});
                }

            };
               //fullscreenのaボタンをつけたい
               var setTop =$(".peer-video").offset().top; 
               var setTop = 0;
               var setId = $(".peer-video").attr('id');
               var setLeft =$("#" + setId).offset().left;
            //  　$("#" + setId).before("<button class='fullscreen-button'>FullScreen</button>");
            //   $(".fullscreen-button").css("top", setTop); 
            //   $(".fullscreen-button").css("left", setLeft) //+ $(this).outerWidth(); 
              　//ここまでfullscreenのボタン記述場所 
              
           }).on('ms_close', function (peer_id) {
               // peerが切れたら、対象のvideoノードを削除する
               $("#" + peer_id).remove();
               //一人へったらレイアウトを変える
               myCount=myCount-1;
           })
           //mousehoverのアクション
          $(document).on("mouseenter",".peer-video",function(){

          });

           // for DataChannel
           $('#receive').animate({
               scrollTop: $('#receive')[0].scrollHeight
           }, 'fast');
           multiparty.on('message', function (mesg) {
               let v = mesg.data;
 
            //****************************************
            //ここに翻訳言語も引き渡す
            // translate(v.text);
            　var translateMsg = translation;
            　　var translateMsg = v.text;
            //   alert(translation);
               var messageElement = "<il><p class='sender_name'>" +
                   v.name + "</p><p class='left_balloon'>" + translateMsg +
                   "</p><p class='clear_balloon'></p></il>";
             //****************************************
               // peerからテキストメッセージを受信
               $("#receive").append(messageElement + "<br>");
               $('#receive').animate({
                   scrollTop: $('#receive')[0].scrollHeight
               }, 'fast');
           });
           ////////////////////////////////
           // Error handling
           multiparty.on('error', function (err) {
               alert(err);
           });

           //////////////////////////////////
           // Screen Share
           multiparty.start();
           var screen = new SkyWay.ScreenShare({
               debug: true
           });
           let isScreenShareOn = false
           // Screen share
           $("#screenShare").on("click", function (e) {
               e.preventDefault();
               if (screen.isEnabledExtension()) {
                   if (isScreenShareOn) {
                       multiparty.stopScreenShare()
                       isScreenShareOn = false
                       multiparty.startMediaStream_()
                   } else {
                       multiparty.startScreenShare(function (stream) {
                           attachMediaStream($('video.my-video')[0], stream);
                           isScreenShareOn = true
                       }, function (err) {
                           console.log(err)
                           console.log("screen-share failed")
                           // error callback
                       });
                   }
               } else {
                   alert('Please install the following chrome extension.');
                   location.href = 'https://chrome.google.com/webstore/detail/beasone/okgcdiebkminelcmpkghnlgiboimifbd?hl=ja&gl=JP';
               }
           });

           multiparty.on('peer_ss', function (video) {
               // peerのvideoを表示
               var vNode = MultiParty.util.createVideoNode(video);
               vNode.setAttribute("class", "peer-video");
               $(vNode).appendTo("#monitorContainer");
            //   $(vNode).appendTo("#peerVideo");
           });

           //////////////////////////////////////////////////////////
           // テキストフォームに入力されたテキストをpeerに送信
          $("#message form").on("submit", function (ev) {
            // $("#message form").on("keydown", function (ev) {
                      ev.preventDefault();
                // if (ev.keyCode == 13 && !ev.shiftKey){
　　              
                    var $text = $(this).find("input[type=text]");
                    var myname = $(".myName").val(); //自分の名前を取得
                    var data = {
                        text: $text.val(),
                        name: myname
                        };
                    if (data.text.length > 0) {
                       data.text = data.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                       //必ず自分のため右のバルーン
                       var messageElement = "<il><p class='right_balloon'>" + data.text +
                           "</p><p class='clear_balloon'></p></il>";
                       $("#receive").append(messageElement + "<br>");
                       //   var positionY = $("#receive").offset().bottom;
                       $('#receive').animate({
                           scrollTop: $('#receive')[0].scrollHeight
                       }, 'fast');
                       // メッセージを接続中のpeerに送信する
                       multiparty.send(data);
                    $text.val("");
                   }
           });
           ///////////////////////////////////////////////////
           // handle mute/unmute
           $("#video-mute").on("click", function (ev) {
               var mute = !$(this).data("muted");
               multiparty.mute({
                   video: mute
               });
            //  alert($(this).text());
               $(this).data("muted", mute);
               //$(this).text("video " + (mute ? "unmute" : "mute")).data("muted", mute);
               
               if (mute==true){
                    $(this).append($("<img src='../img/video.png'>"));
                    $(this).find(".video-toolbar-itemtext").text("unmute");
                // 　 $(this).text("unmute");
                　  $(this).css('color', 'white');
                　  $(this).css('background-color', '#2e2e2e');
               } else {
                    $(this).append($("<img src='../img/video-mute.png'>"));
                    $(this).find(".video-toolbar-itemtext").text("mute");
                　  $(this).css('color', 'white');
                    $(this).css('background-color', '#e36a27');
               };
           });

           $("#audio-mute").on("click", function (ev) {
               var mute = !$(this).data("muted");
               multiparty.mute({
                   audio: mute
               });
                $(this).data("muted",mute);
            //   $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
       
               if (mute == false) {
                    $(this).css('background-color', ' #e36a27');
                    $("#mic-img").append('src','url(..img/mute.png)')
                    $(this).find(".video-toolbar-itemtext").text("mute");
                　  $(this).css('color', 'white');
               } else {
                　  $(this).css('background-color', '#2e2e2e');
                    $("#mic-img").append('src','url(..img/mic.png)')
                    $(this).find(".video-toolbar-itemtext").text("unmute");
                　  $(this).css('color', 'white');
               };

           });
           
       }

// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここから翻訳
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

//受け取るのは文字または音声//言語とテキストを返す場所も受け取る？
function translate(t){   
    // alert(t);
// 現在の時刻をUNIX Time に変換して取得
    const now = new Date();
    const nowtime = now.getTime();

// 認証トークンを取得するための関数 [getToken] を定義
// http://docs.microsofttranslator.com/oauth-token.html
    const getToken = function() {
    const defer = $.Deferred();

// 現在時刻と、sessionStorageに保存されている時刻を比較
// sessionStorageに保存されているトークンが8分以内に発行されたものであれば、そのまままトークンを返す
// 8分以上経っている場合、もしくはトークンが存在しない場合、新規にトークンを取得。
// 取得したトークン、および取得時間をUNIX Time に変換したデータをJSON [datalist] に格納
// sessionStorage [tdata] にJSONを保存する

      const arr = JSON.parse(sessionStorage.getItem("tdata"));

      if (arr === null || arr.time + 1000 * 60 * 8 < nowtime) {
        $.ajax({
          url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
          type: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/jwt',
            'Ocp-Apim-Subscription-Key': 'd7a8cb966a00401692839662c27e38c5',
          },
          async: false,
        }).done(function(data) {

          const datalist = {
            time: nowtime,
            token: data,
          }
          sessionStorage.setItem('tdata', JSON.stringify(datalist));
        });
      }

// sessionStorage に保存されたデータを変数 arr2 に格納
// JSONを文字列に変換後、トークンデータを引き出して翻訳用の関数にひきわたす

      const arr2 = JSON.parse(sessionStorage.getItem("tdata"));
      const token = arr2.token;
      defer.resolve(token);
      return defer.promise();
    };

// 関数 [getToken] 実行後、取得したトークンを 受け取る
// フォームから入力したデータとともに、 Microsoft Translator テキストAPIへ送信

    $.when(getToken()).done(function(token) {
      const key = 'Bearer ' + token;
      // const text = $("#myName").val();
      const text = t;
      const to = translateLang.value;
      const response = $.ajax({
          url: 'https://api.microsofttranslator.com/v2/http.svc/Translate',
          type: 'GET',
          data: {
            'appid': key,
            'Accept': 'application/xml',
            'text': text,
            'to': to,
          },
          async: false,
        })

// Translator テキスト APIを通じて取得したデータから、翻訳語が含まれるプロパティを取得
// replace関数でタグを除去し、翻訳データのみを抽出して表示する

      const data = response.responseText;
      translation = data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');

  }) 

}

// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここまで翻訳
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここからspeech
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

//   window.___gcfg = { lang: 'en' };
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

// showInfo('info_start');


// var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  // start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  
  recognition.onstart = function() {
    recognizing = true;
    // showInfo('info_speak_now');
//     start_img.src = '/intl/en/chrome/assets/common/images/content/mic-animate.gif';
//   };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
    //   showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
    //   showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
    // if (!final_transcript) {
    //   showInfo('info_start');
      return;
    // }
    // showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }

  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    
    for (var i = event.resultIndex; i < event.results.length; ++i) {
    //   if (event.results[i].isFinal) {
    //     final_transcript += event.results[i][0].transcript;
    //   } else {
        interim_transcript += event.results[i][0].transcript;
        // alert(event.results[i][0].transcript);
        // alert(interim_transcript);
        
    //   }
    }

// Speechした内容をText化＆Translate関数へ引き渡す
    // final_transcript = capitalize(final_transcript);
    // before_word.innerHTML = linebreak(final_transcript);
    // alert(interim_transcript);
    $("#before_word").val(linebreak(interim_transcript));
    translate($("#before_word").val());
    final_span.innerHTML=translation;
    // if (final_transcript || interim_transcript) {
    //   showButtons('inline-block');
    // }
  };
};

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    $("#info_start").text(startMsg);
    return;
  }
//   alert(recognizing);
//   final_transcript = '';
//   recognition.lang = select_dialect.value;
//   recognition.lang = "ja-JP";
  recognition.lang = myLang.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  $("#info_start").text(speechMsg);
//   buf_span.innerHTML = '';
//   start_img.src = '/intl/en/chrome/assets/common/images/content/mic-slash.gif';
//   showInfo('info_allow');
//   showButtons('none');
  start_timestamp = event.timeStamp;
}

//startbutton event
$("#start_button").on("click",function(e){
    // alert("s");
    startButton(e);
});


//スペースキーでspeech＆翻訳開始
//chatのマイクはミュートにする？

//押している間だとわかりにくいので、on/off切り替えにする
$(window).keydown(function (e) {
  if (e.keyCode === 32) {
        startButton(e);
  }
});


// // キーボードの入力状態を記録する配列
// var input_key_buffer = new Array();

// // ------------------------------------------------------------
// // キーボードを押したときに実行されるイベント
// // ------------------------------------------------------------
// document.onkeydown = function (e){
// 	if(!e) e = window.event; // レガシー

// 	input_key_buffer[e.keyCode] = true;
// };

// // ------------------------------------------------------------
// // キーボードを離したときに実行されるイベント
// // ------------------------------------------------------------
// document.onkeyup = function (e){
// 	if(!e) e = window.event; // レガシー

// 	input_key_buffer[e.keyCode] = false;
// };

// // ------------------------------------------------------------
// // ウィンドウが非アクティブになる瞬間に実行されるイベント
// // ------------------------------------------------------------
// window.onblur = function (){
// 	// 配列をクリアする
// 	input_key_buffer.length = 0;
// };

// // ------------------------------------------------------------
// // キーボードが押されているか調べる関数
// // ------------------------------------------------------------
// function KeyIsDown(key_code){

// 	if(input_key_buffer[key_code])	return true;

// 	return false;
// }


// // ------------------------------------------------------------
// // 一定の時間隔で実行する
// // ------------------------------------------------------------
// setInterval(function (){


// 	// スペースキーが押されているか調べる
// 	if(KeyIsDown(32)){
// 	    var e = $.now()
//         startButton(e);
 
// 	}else{
// 	   // alert("離れている");
//         // recognition.stop();
// 	}

// },1000/60);




}

// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここまでspeech
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

 // 自身でspeechした単語を翻訳して調べる
 // 文字が入力されたらイベント発火
$("#before_word").on("keyup",function(){
    var beforeText = $("#before_word").val()
    translate(beforeText);
    $("#final_span").text(translation);
});



$("#trans_word_copy").on("click",function(){
    const transCopy = $("#final_span").text();
    $(".message-text").val(transCopy);
    transClear();
})

function transClear(){
    $("#before_word").val("");
    $("#final_span").val("");
}


start();
