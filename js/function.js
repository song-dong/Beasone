$(window).load(function () {

    
        $(".close-button").on("click",function(){
          alert("bye-bye.");
          window.open('about:blank','_self').close();
        })
  
        $("#url").val(location.href); 
        
        
        $(".url-copy").on("click",function(){
            var urltext = $("#url");
            urltext.select();
            document.execCommand("copy");
        })
        
        $("#chat-close-button").on("click",function(){
            $(".messages-wrapper").hide(1000); 
            $("#chat-show-button").show(1000);
            var w = $(".room-wrapper").width();
            $("#monitorContainer").animate({width:w},1500);
        })
        
        $("#chat-show-button").on("click",function(){

            $("#chat-show-button").hide(1000);   
            $(".messages-wrapper").show(1000);
            var d = $("#monitorContainer").width()*0.79;
            $("#monitorContainer").animate({width:d},1000);        
        })
        


     ///////////////////////////////////////////
    //ダブルクリックで最大化と元のサイズに戻す
    ///////////////////////////////////////////
   $(document).on('dblclick', 'video', function(event) {
    if (this.webkitRequestFullScreen) {
      this.webkitRequestFullScreen();
    } else if (this.mozRequestFullScreen) {
      this.mozRequestFullScreen();
    } else if (this.msRequestFullscreen) {
      this.msRequestFullscreen();
    } else {
      this.requestFullScreen();
    }
  });


   $(document).on('dblclick', 'video', function(event) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  });
  ///////////////////////////////////////////
  //ここまでダブルクリック
  ///////////////////////////////////////////           





///////////////////////////////////////////
//国等のセレクトボックス
//////////////////////////////////////////

// var langs =
// [['Afrikaans',       ['af-ZA']],
// ['አማርኛ',           ['am-ET']],
// ['Azərbaycanca',    ['az-AZ']],
// ['Bahasa Indonesia',['id-ID']],
// ['Bahasa Melayu',   ['ms-MY']],
// ['Català',          ['ca-ES']],
// ['Čeština',         ['cs-CZ']],
// ['Dansk',           ['da-DK']],
// ['Deutsch',         ['de-DE']],
// ['English',         ['en-US']],
// ['México',         ['es-MX']],
// ['Euskara',         ['eu-ES']],
// ['Filipino',        ['fil-PH']],
// ['Français',        ['fr-FR']],
// ['Basa Jawa',       ['jv-ID']],
// ['Galego',          ['gl-ES']],
// ['ગુજરાતી',           ['gu-IN']],
// ['Hrvatski',        ['hr-HR']],
// ['IsiZulu',         ['zu-ZA']],
// ['Íslenska',        ['is-IS']],
// ['Italiano',        ['it-IT']]
// ['ಕನ್ನಡ',             ['kn-IN']],
// ['ភាសាខ្មែរ',          ['km-KH']],
// ['Latviešu',        ['lv-LV']],
// ['Lietuvių',        ['lt-LT']],
// ['മലയാളം',          ['ml-IN']],
// ['मराठी',             ['mr-IN']],
// ['Magyar',          ['hu-HU']],
// ['ລາວ',              ['lo-LA']],
// ['Nederlands',      ['nl-NL']],
// ['नेपाली भाषा',        ['ne-NP']],
// ['Norsk bokmål',    ['nb-NO']],
// ['Polski',          ['pl-PL']],
// ['Română',          ['ro-RO']],
// ['සිංහල',          ['si-LK']],
// ['Slovenščina',     ['sl-SI']],
// ['Basa Sunda',      ['su-ID']],
// ['Slovenčina',      ['sk-SK']],
// ['Suomi',           ['fi-FI']],
// ['Svenska',         ['sv-SE']],
// ['ქართული',       ['ka-GE']],
// ['Հայերեն',          ['hy-AM']],
// ['తెలుగు',           ['te-IN']],
// ['Tiếng Việt',      ['vi-VN']],
// ['Türkçe',          ['tr-TR']],
// ['Ελληνικά',         ['el-GR']],
// ['български',         ['bg-BG']],
// ['Pусский',          ['ru-RU']],
// ['Српски',           ['sr-RS']],
// ['Українська',        ['uk-UA']],
// ['한국어',            ['ko-KR']],
// ['普通话 (中国大陆)', ['cmn-Hans-CN']],
// ['日本語',           ['ja-JP']],
// ['हिन्दी',             ['hi-IN']],
// ['ภาษาไทย',         ['th-TH']]];

// var select = $('.custom-select sources');
// var selectBox = {
//   langs
// };

// for ( var i in langs ) {
//   $('#sources').append('<option value="' + i + '">' + langs[i]["0"]+ '</option>');
// }


// for (var i = 0; i < langs.length; i++) {
//   $(".select_language").options[i] = new Option(langs[i][0], i);
// }
// select_language.selectedIndex = 7;
// updateCountry();
// select_dialect.selectedIndex = 6;


// function updateCountry() {
//   for (var i = select_dialect.options.length - 1; i >= 0; i--) {
//     select_dialect.remove(i);
//   }
//   var list = langs[select_language.selectedIndex];
//   for (var i = 1; i < list.length; i++) {
//     select_dialect.options.add(new Option(list[i][1], list[i][0]));
//   }
//   select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
// }


//************************************************



       })