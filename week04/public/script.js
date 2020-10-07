var socket = io.connect();
socket.on('connect', function() {
console.log("Connected");
});
window.addEventListener("load", function(){

  let video = document.getElementById("myvideo");
  let canvas = document.getElementById("mycanvas");
  let context = canvas.getContext("2d");

  let constraints = { audio: false, video: true };

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
	 video.srcObject = stream;

	 video.onloadedmetadata = function(e) {
		   video.play();
       socket.emit('video', video);
       draw();
	 };
  })
  .catch(function(err) {
	/* Handle the error */
	 alert(err);
  });

  function draw(){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // socket.emit('image', canvas.toDataURL());
    window.setTimeout(draw,1000);
  }

  socket.on('image', function(data) {
    console.log("I got image");
    var oldCanvas = document.getElementById('oldCanvas');
    var newImage = new Image(); // HTML5 Image object
    newImage.src = data; // Attach the data to it


    let newCanv = document.createElement("CANVAS");
    newCanv.id = "newCanvas";
    newCanv.height = oldCanvas.height;
    newCanv.width = oldCanvas.width;
    document.body.appendChild(newCanv);

    var newCanvas = document.getElementById("newCanvas");
      var newContext = newCanvas.getContext("2d");
      newContext.drawImage(newImage, 0, 0, canvas.width, canvas.height); //draws background image
      // newContext.drawImage(canvas, 0, 0); //draws original canvas on top of background
      cscreen = newCanvas.toDataURL(); //generates PNG of newly created canvas
      document.body.removeChild(newCanv); // removes new canvas

    // var imgContainer = document.getElementById('myimage');
    // imgContainer.src = data;
  });

  // socket.on("video", function(data){
  //   console.log("i got video");
  //    var oldCanvas = document.getElementById('oldCanvas');
  //    var oldContext = oldCanvas.getContext("2d");
  //    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
  //    data.srcObject = stream;
  //
  //    data.onloadedmetadata = function(e) {
  //       data.play();
  //       context.drawImage(data, 0, 0, oldCanvas.width, oldCanvas.height);
  //    };
  //    })
  //    .catch(function(err) {
  //   /* Handle the error */
  //    alert(err);
  //    });
  //
  // });

});
