navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var SKYWAY_API_KEY = '1061e0f9-3006-4af2-8266-82ce6c34b677';
var peer =null;
var selfId = null;
var localStream = null;

function initializePeer(callback) {
  peer = new Peer({ key: SKYWAY_API_KEY });
  peer.on('open', function(id) {
    selfId = id;
    callback();
  });
  peer.on('call', function(mediaConnection) {
    mediaConnection.answer(localStream);
    settingMediaConnection(mediaConnection);
  });
  peer.on('close', function(){
    peer.destroy();
  });
  peer.on('error', function(err){
    console.error(err);
  });
}

function initializeMedia(callback) {
  navigator.getUserMedia(
    { audio: true, video: true },
    function(stream) {
      localStream = stream;
      var video = document.getElementById('my-video');
      video.src = URL.createObjectURL(stream);
      video.play();
      callback();
    },
    function(err) {
      console.error(err);
    }
  );
}

function callRemoteAll() {
  peer.listAllPeers(function(remoteIds) {
    for (var i = 0; i < remoteIds.length; i++ ) {
      var remoteId = remoteIds[i];
      var mediaConnection = peer.call(remoteId, localStream);
      settingMediaConnection(mediaConnection);
    }
  });
}

function settingMediaConnection(mediaConnection) {
  var remoteId = mediaConnection.peer;
  var remoteStream = null;
  var video = null;
  mediaConnection.on('stream', function(stream) {
    video = document.createElement('video');
    video.src = URL.createObjectURL(stream);
    video.play();
    var parent = document.getElementById('peer-video');
    parent.appendChild(video);
  });
  mediaConnection.on('close', function(){
    URL.revokeObjectURL(video.src);
    video.parentNode.removeChild(video);
  });
  mediaConnection.on('error', function(err){
    console.error(err);
  });
}

function initialize() {
  initializeMedia(function() {
    initializePeer(function() {
      callRemoteAll();
    });
  });
}

window.addEventListener('load', initialize);