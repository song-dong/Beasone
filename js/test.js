$(function() {
    
    ///////////////////////////////////////////
    //ダブルクリックで最大化と元のサイズに戻す
    ///////////////////////////////////////////
  $("#share").dblclick(function() {
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


  $("#share").click(function() {
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
  
  
  $("#color").on("click",function(){
      if($(this).text()=="unmute"){
          $(this).children("img").attr('src','img/mute.png')
          $(this).text("mute");
      }else{
          $(this).css('background-image','url(../img/mic.png)')
          $(this).text("unmute");
      }
  });
  
});

