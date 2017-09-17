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
               // 各peerを指定の画面に配置
               var v = $('video').length;
               for (var i = 0; i < v; i++) {
                   $(vNode).appendTo("#peerVideo" + (i + 1));
               }
           }).on('ms_close', function (peer_id) {
               // peerが切れたら、対象のvideoノードを削除する
               $("#" + peer_id).remove();
           })

           ////////////////////////////////
           // for DataChannel
           multiparty.on('message', function (mesg,username) {
                 if (username == $("#myName").val()){
                   alert(username);  
                 }else{
                     alert("他の人");
                 }
               
               
               // peerからテキストメッセージを受信
               $("#receive").append(mesg.data + "<br>");
           });
           ////////////////////////////////
           // Error handling
           multiparty.on('error', function (err) {
               alert(err);
           });

           multiparty.start();
           let isScreenShareOn = false
           // Screen share
           $("#screenShare").on("click", function (e) {
               e.preventDefault();
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
           });

           multiparty.on('peer_ss', function (video) {
               // peerのvideoを表示
               var vNode = MultiParty.util.createVideoNode(video);
               vNode.setAttribute("class", "peer-video");
               var v = $('video').length;
               for (var i = 0; i < v; i++) {
                   $(vNode).appendTo("#peerVideo" + i);
               }
           });

           //////////////////////////////////////////////////////////
           // テキストフォームに入力されたテキストをpeerに送信
           $("#message form").on("submit", function (ev) {
               ev.preventDefault(); // onsubmitのデフォルト動作（reload）を抑制
               // テキストデータ取得
               var $text = $(this).find("input[type=text]");
               var data = $text.val();
               var myname = $("#myName").val();//自分の名前を取得
               if (data.length > 0) {
                   data = data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                   $("#receive").append(data + "<br>");
                   // メッセージを接続中のpeerに送信する
                   multiparty.send(data,myname);
                   $text.val("");
                   $("#myName").val("");
               }
           });

           ///////////////////////////////////////////////////
           // handle mute/unmute
           $("#video-mute").on("click", function (ev) {
               var mute = !$(this).data("muted");
               multiparty.mute({
                   video: mute
               });
               $(this).text("video " + (mute ? "unmute" : "mute")).data("muted", mute);
           });

           $("#audio-mute").on("click", function (ev) {
               var mute = !$(this).data("muted");
               multiparty.mute({
                   audio: mute
               });
               $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
           });

       }

       start();
