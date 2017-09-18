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

           ////////////////////////////////
           // for DataChannel
           $('#receive').animate({scrollTop: $('#receive')[0].scrollHeight}, 'fast');
           multiparty.on('message', function (mesg) {
               let v = mesg.data;
               var messageElement = "<il><p class='sender_name'>" +
                   v.name + "</p><p class='left_balloon'>" + v.text +
                   "</p><p class='clear_balloon'></p></il>";
               // peerからテキストメッセージを受信
                $("#receive").append(messageElement + "<br>");
                $('#receive').animate({scrollTop: $('#receive')[0].scrollHeight}, 'fast');
           });
           ////////////////////////////////
           // Error handling
           multiparty.on('error', function (err) {
               alert(err);
           });

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

           //////////////////////////////////////////////////////////
           // テキストフォームに入力されたテキストをpeerに送信
        //   $("#message form").on("submit", function (ev) {
            $("#message form").on("keydown", function (ev) {
    
                if (ev.keyCode == 13 && !ev.shiftKey){
　　                ev.preventDefault();
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
                        $('#receive').animate({scrollTop: $('#receive')[0].scrollHeight}, 'fast');
                        // メッセージを接続中のpeerに送信する
                        multiparty.send(data);
                        $text.val("");
                    }
               }else if(ev.keyCode == 13 && ev.shiftKey){
                
                   ev.preventDefault();
                   alert("ev");
                   $(this).val = $(this).val + "<br>"
               }
<<<<<<< HEAD
=======
               $("#receive").append(messageElement + "<br>");
               $('#receive').animate({
                   scrollTop: $('#receive')[0].scrollHeight
               }, 'fast');
               // メッセージを接続中のpeerに送信する
               multiparty.send(data);
               $text.val("");

>>>>>>> 6923d9048196a970823ea47683c6e10236595d1f
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

               if (mute == false) {
                   $(this).css('background-color', ' #e36a27');
                   $("#audio-mute").css('backgroundImage', '(..img/mute.png)');
               } else {

               };


           });

       }

       start();
