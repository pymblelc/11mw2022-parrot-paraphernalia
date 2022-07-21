let startCameraBtn = document.getElementById("startCamera");
let stopCameraBtn = document.getElementById("stopCamera");
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let submitBtn = document.getElementById("submit");
let retakeBtn = document.getElementById("retake");

let canvasCtx = myCanvas.getContext("2d"); // this turns the 2d canvas image into something that can be analysed, aka a 'context'
let locationTxt = document.getElementById("locationTxt");

let retake2Btn = document.getElementById("retake2");
let confirmBtn = document.getElementById("confirm");

let postSubmissionTxt = document.getElementById("postSubmission"); // div. includes a couple lines of stuff
postSubmissionTxt.style.display = "hidden";
let workoutEmbed = document.getElementById("workoutEmbed");
let studyEmbed = document.getElementById("studyEmbed");

// let snapSoundElement = document.getElementById('snapSound');

let webcamClass = new Webcam(myWebcam, "user", myCanvas); // class is like a function but SPECIAL


startCameraBtn.addEventListener("click", function() {
    webcamClass.start()
    .then((result) => {
        console.log("webcam started!");
    })
    .catch((error) => {
        console.log("error sadge");
    });
})

stopCameraBtn.addEventListener("click", function() {
    webcamClass.stop();
})

takePhotoBtn.addEventListener("click", function () {
    var picture = webcamClass.snap(); //what. why is it a variable
    webcamClass.stop();
  });

retakeBtn.addEventListener("click", function() {
    webcamClass.start();
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
})
retake2Btn.addEventListener("click", function() {
  webcamClass.start();
  canvasCtx.clearRect(0,0,canvas.width,canvas.height);
})

  // time to actually send this info to the api
  // canvas -> getcontext ('canvasCtx') -> blob -> api
submitBtn.addEventListener("click", function() {
  postSubmissionTxt.style.display = "visible";
  myCanvas.toBlob(function(blob) {
        ImageAPI.analyseImageBlob(blob, (data) => {
          console.log(data);
          let tags = data.description.tags;
          console.log(tags);

          let workoutBool = tags.includes("outdoor" || "tree" || "road" || "street" || "sidewalk");

          let studyBool = tags.includes("");

          if (workoutBool == true) {
            console.log("searching for playlist...");
            locationTxt.innerHTML += "going on a stroll?";

          } else {
            locationTxt.innerHTML = "Hmm. I'm not sure. Try taking a more relevant photo."
          }
        })
    })
})

confirmBtn.addEventListener("click", function() {
  locationTxt.innerHTML = "Cool! Let me grab your playlist real quick."
  

})

