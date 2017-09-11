  // MultiParty インスタンスを生成
  multiparty = new MultiParty( {
    "key": "1061e0f9-3006-4af2-8266-82ce6c34b677",  /* SkyWay keyを指定 */
    "room": 'groupA' /* groupAの人としか繋がらない */
  });
 
  multiparty.on('my_ms', function(video) {
    // 自分のvideoを表示
    var vNode = MultiParty.util.createVideoNode(video);
    $(vNode).appendTo("#myVideo");
  }).on('peer_ms', function(video) {
    // peer1のvideoを表示
    var vNode = MultiParty.util.createVideoNode(video);
    $(vNode).appendTo("#peerVideo1");
    // peer2のvideoを表示
    var vNode = MultiParty.util.createVideoNode(video);
    $(vNode).appendTo("#peerVideo2");
  }).on('ms_close', function(peer_id) {
    // peerが切れたら、対象のvideoノードを削除する
    $("#"+peer_id).remove();
  });
 
  // サーバとpeerに接続
  multiparty.start()