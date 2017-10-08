$(function(){

// var chrmMenuBar = new chrm.ui.MenuBar();
//       chrmMenuBar.decorate('nav');
//       var chrmLogo = new chrm.ui.Logo('logo');

//       var chrmscroll = new chrm.ui.SmoothScroll('scroll');
//       chrmscroll.init();



  window.___gcfg = { lang: 'en' };
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

    //   var doubleTracker = new gweb.analytics.DoubleTrack('floodlight', {
    //       src: 2542116,
    //       type: 'clien612',
    //       cat: 'chrom0'
    //   });
    //   doubleTracker.track();

    //   doubleTracker.trackClass('doubletrack', true);

var langs =
[['Afrikaans',       ['af-ZA']],
 ['አማርኛ',           ['am-ET']],
 ['Azərbaycanca',    ['az-AZ']],
 ['বাংলা',            ['bn-BD', 'বাংলাদেশ'],
                     ['bn-IN', 'ভারত']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Dansk',           ['da-DK']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-KE', 'Kenya'],
                     ['en-TZ', 'Tanzania'],
                     ['en-GH', 'Ghana'],
                     ['en-NZ', 'New Zealand'],
                     ['en-NG', 'Nigeria'],
                     ['en-ZA', 'South Africa'],
                     ['en-PH', 'Philippines'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Filipino',        ['fil-PH']],
 ['Français',        ['fr-FR']],
 ['Basa Jawa',       ['jv-ID']],
 ['Galego',          ['gl-ES']],
 ['ગુજરાતી',           ['gu-IN']],
 ['Hrvatski',        ['hr-HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['ಕನ್ನಡ',             ['kn-IN']],
 ['ភាសាខ្មែរ',          ['km-KH']],
 ['Latviešu',        ['lv-LV']],
 ['Lietuvių',        ['lt-LT']],
 ['മലയാളം',          ['ml-IN']],
 ['मराठी',             ['mr-IN']],
 ['Magyar',          ['hu-HU']],
 ['ລາວ',              ['lo-LA']],
 ['Nederlands',      ['nl-NL']],
 ['नेपाली भाषा',        ['ne-NP']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['සිංහල',          ['si-LK']],
 ['Slovenščina',     ['sl-SI']],
 ['Basa Sunda',      ['su-ID']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Kiswahili',       ['sw-TZ', 'Tanzania'],
                     ['sw-KE', 'Kenya']],
 ['ქართული',       ['ka-GE']],
 ['Հայերեն',          ['hy-AM']],
 ['தமிழ்',            ['ta-IN', 'இந்தியா'],
                     ['ta-SG', 'சிங்கப்பூர்'],
                     ['ta-LK', 'இலங்கை'],
                     ['ta-MY', 'மலேசியா']],
 ['తెలుగు',           ['te-IN']],
 ['Tiếng Việt',      ['vi-VN']],
 ['Türkçe',          ['tr-TR']],
 ['اُردُو',            ['ur-PK', 'پاکستان'],
                     ['ur-IN', 'بھارت']],
 ['Ελληνικά',         ['el-GR']],
 ['български',         ['bg-BG']],
 ['Pусский',          ['ru-RU']],
 ['Српски',           ['sr-RS']],
 ['Українська',        ['uk-UA']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['हिन्दी',             ['hi-IN']],
 ['ภาษาไทย',         ['th-TH']]];

// for (var i = 0; i < langs.length; i++) {
//   select_language.options[i] = new Option(langs[i][0], i);
// }
// select_language.selectedIndex = 7;
// updateCountry();
// select_dialect.selectedIndex = 6;
// showInfo('info_start');

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

// var create_email = false;
var final_transcript = '';
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
    showInfo('info_speak_now');
//     start_img.src = '/intl/en/chrome/assets/common/images/content/mic-animate.gif';
//   };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
      showInfo('info_no_microphone');
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
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
    // if (create_email) {
    //   create_email = false;
    //   createEmail();
    // }
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
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    trancerat(interim_span.innerHTML);
    // alert("!");
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  };
}

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

// function createEmail() {
//   var n = final_transcript.indexOf('\n');
//   if (n < 0 || n >= 80) {
//     n = 40 + final_transcript.substring(40).indexOf(' ');
//   }
//   var subject = encodeURI(final_transcript.substring(0, n));
//   var body = encodeURI(final_transcript.substring(n + 1));
//   window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
// }

// function copyButton() {
//   if (recognizing) {
//     recognizing = false;
//     recognition.stop();
//   }
//   copy_button.style.display = 'none';
//   copy_info.style.display = 'inline-block';
//   showInfo('');
// }

function emailButton() {
  if (recognizing) {
    // create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    // createEmail();
  }
  // email_button.style.display = 'none';
  // email_info.style.display = 'inline-block';
  showInfo('');
}

function startButton(event) {
  alert(recognizing);
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
//   start_img.src = '/intl/en/chrome/assets/common/images/content/mic-slash.gif';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
//   if (s) {
//     for (var child = info.firstChild; child; child = child.nextSibling) {
//       if (child.style) {
//         child.style.display = child.id == s ? 'inline' : 'none';
//       }
//     }
//     info.style.visibility = 'visible';
//   } else {
//     info.style.visibility = 'hidden';
//   }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
//   copy_button.style.display = style;
//   email_button.style.display = style;
//   copy_info.style.display = 'none';
//   email_info.style.display = 'none';
}

//startbutton event
$("#start_button").on("click",function(e){
//     alert("push");
    startButton(e);
});

}

 // 文字が入力されたらイベント発火
$("#myName").on("keyup",function(){
  var beforeText = $("#myName").val()
  trancerat(beforeText);
});

// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここから翻訳
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊


//受け取るのは文字または音声
function trancerat(t){   
  // alert("get");


//   $("#myName").on("DOMSubtreeModified propertychange",function() {
// $("#myName").on("keyup",function(){

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

// })
}
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ここまで翻訳
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
});