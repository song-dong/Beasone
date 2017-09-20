       var multiparty;

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
               // peerのvideoを表示
               console.log(video);
               var vNode = MultiParty.util.createVideoNode(video);
               vNode.setAttribute("class", "peer-video");
               $(vNode).appendTo("#peerVideo");
           }).on('ms_close', function (peer_id) {
               // peerが切れたら、対象のvideoノードを削除する
               $("#" + peer_id).remove();
           })

           //////////////////////////////////////////
           // Screen size change
           //           $(document).on('ready', function () {
           //               var $monitorVideo = $('.peer-video');
           //               $(document).on('click', 'video', function (event) {
           //                   if (event.target.id === 'monitorVideo') {
           //                       $('html').removeClass('monitored');
           //                       $monitorVideo.removeAttr('src');
           //
           //                       $monitorVideo.get(0).muted = true;
           //                       $monitorVideo.get(0).volume = 0.0;
           //
           //                       console.log("Video is now muted: " + $monitorVideo.get(0).muted);
           //                       console.log("Video volume is now: " + $monitorVideo.get(0).volume);
           //
           //                       setTimeout(function () {
           //                           $('#monitorContainer').hide();
           //                       }, 210);
           //                       return;
           //                   }
           //                   $('#monitorContainer').show();
           //                   setTimeout(function () {
           //                       $('html').addClass('monitored');
           //                       $monitorVideo.get(0).muted = false;
           //                       $monitorVideo.get(0).volume = 1.0;
           //
           //                       console.log("Video is now muted: " + $monitorVideo.get(0).muted);
           //                       console.log("Video volume is now: " + $monitorVideo.get(0).volume);
           //                   }, 0);
           //
           //                   var remoteId = $(this).attr('id');
           //                   console.log('skyway.js: remote ID is ' + remoteId);
           //                   var remoteStream = existingCalls[remoteId].remoteStream;
           //                   $monitorVideo.attr('src', URL.createObjectURL(remoteStream));
           //               });
           //               var resizeMonitor = function () {
           //                   if ($monitorVideo.get(0).readyState === 0) {
           //                       return;
           //                   }
           //                   var $monitorWrapper = $('#peerVideo');
           //                   var wrapperWidth = $monitorWrapper.width();
           //                   var srcWidth = $monitorVideo.get(0).videoWidth;
           //                   var wrapperHeight = $monitorWrapper.height();
           //                   var srcHeight = $monitorVideo.get(0).videoHeight;
           //                   if (srcWidth / srcHeight > wrapperWidth / wrapperHeight) {
           //                       var videoHeight = wrapperWidth * srcHeight / srcWidth;
           //                       $monitorVideo.css({
           //                           width: '100%',
           //                           height: videoHeight + 'px',
           //                           top: (wrapperHeight - videoHeight) / 2 + 'px'
           //                       });
           //
           //                   } else {
           //                       var videoWidth = wrapperHeight * srcWidth / srcHeight;
           //                       $monitorVideo.css({
           //                           width: videoWidth + 'px',
           //                           height: '100%',
           //                           left: (wrapperWidth - videoWidth) / 2 + 'px'
           //                       });
           //                   }
           //               };
           //       });

           ////////////////////////////////
           // for DataChannel
           $('#receive').animate({
               scrollTop: $('#receive')[0].scrollHeight
           }, 'fast');
           multiparty.on('message', function (mesg) {
               let v = mesg.data;
               var messageElement = "<il><p class='sender_name'>" +
                   v.name + "</p><p class='left_balloon'>" + v.text +
                   "</p><p class='clear_balloon'></p></il>";
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
               $(vNode).appendTo("#peerVideo");
           });

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
               $(this).text("video " + (mute ? "unmute" : "mute")).data("muted", mute);
               if ($(this).text()=="unmute"){
                //   alert("unmuteだよ")
                    $(this).text("mute");
                　  $(this).css('background-color', '#2e2e2e');
               } else {
                    $(this).text("unmute");
                    $(this).css('background-color', '#e36a27');
               };
           });

           $("#audio-mute").on("click", function (ev) {
               var mute = !$(this).data("muted");
               multiparty.mute({
                   audio: mute
               });

              $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
       
               if (mute == false) {
                    $(this).css('background-color', ' #e36a27');
                    $("#mic-img").attr('src',"..img/mute.png")
                    $(this).text("mute");
               } else {
                　  $(this).css('background-color', '#2e2e2e');
                    // $(this).css('background-image','url(../img/mic.png)')
                    $(this).text("unmute");
               };
  //$('img[src="sample1.jpg"]').attr('src','sample3.gif');

           });
           
          $(".close-button").on("click",function(){
              alert("byebye.");
              window.open('about:blank','_self').close();
          })
          

       }

       start();
