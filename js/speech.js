
"use strict"

$(function() {
  
//   window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
// var recognition = new webkitSpeechRecognition();
// recognition.lang = 'ja';
 
// // 録音終了時トリガー
// recognition.addEventListener('result', function(event){
//     alert(event.results.item(0).item(0).transcript)
// }, false);
 
// // 録音開始
// recognition.start();

// //配列１
// var results = event.results;
// for(var i = 0; i < results.length; i++){
//     //配列２
//     var result = results.item(i);
//     for(var j = 0; j < result.length; j++){
//         var alternative = result.item(j);
//         alert(alternative.transcript);
//     }
// }

    
//  テスト用   
// 音声認識機能
var recognition;
var nowRecognition = false;

// 確定した結果を表示する場所
var $finalSpan = document.querySelector('#final_span');

// 音声認識中の不確かな情報を表示する場所
var $interimSpan = document.querySelector('#interim_span');

// 音声認識開始のメソッド
function start () {
    recognition = new webkitSpeechRecognition();
    recognition.lang = document.querySelector('#select2').value;
    // 以下2点がポイント！！
    // 継続的に処理を行い、不確かな情報も取得可能とする.
    recognition.continuous = true;
    recognition.interimResults = true;
    // 音声結果を取得するコールバック
    recognition.onresult = function (e) {
        var finalText = '';
        var interimText = '';
        for (var i = 0; i < e.results.length; i++) {
            // isFinalがtrueの場合は確定した内容
            // 仕様書では「final」という変数名だが、Chromeでは「isFinal」のようです.
            if (e.results[i].isFinal) {
                finalText += e.results[i][0].transcript;
            } else {
                interimText += e.results[i][0].transcript;
            }
        }
        $interimSpan.textContent = interimText;
        $finalSpan.textContent = finalText;
    };
    recognition.start();
    nowRecognition = true;
};

// 音声認識を止めるメソッド
function stop () {
    recognition.stop();
    nowRecognition = false;
}

// ボタンアクションの定義
document.querySelector('#start_button').onclick = function () {
  // $('#btn2').on("click",function () { 
    // unsupported.
    if (!'webkitSpeechRecognition' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }
    alert(nowRecognition);

    if (nowRecognition) {
        stop();
        this.value='音声認識を継続的に行う';
        this.className = '';
        $("#select2").text("音声認識を継続的に行う")
    } else {
        start();
        this.value = '音声認識を止める';
        this.className = 'select';
        $("#select2").text("音声認識を止める")
    }
}
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここまで音声認識//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊


// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここから翻訳
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

 // 文字が入力されたらイベント発火

  $(".myName").change(function() {

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
      const text = $(".myName").val();
      const response = $.ajax({
          url: 'https://api.microsofttranslator.com/v2/http.svc/Translate',
          type: 'GET',
          data: {
            'appid': key,
            'Accept': 'application/xml',
            'text': text,
            'to': 'en',
          },
          async: false,
        })

// Translator テキスト APIを通じて取得したデータから、翻訳語が含まれるプロパティを取得
// replace関数でタグを除去し、翻訳データのみを抽出して表示する

      const data = response.responseText;
      const translation = data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      $("#japanese").text(translation);
        // alert(translation);
  })

})
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここまで翻訳
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

});