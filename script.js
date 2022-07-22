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
postSubmissionTxt.style.display = "none";

let allSpotifyEmbed = document.getElementById("spotifyEmbed");
let choresEmbed = document.getElementById("choresEmbed");
let workoutEmbed = document.getElementById("workoutEmbed");
let studyEmbed = document.getElementById("studyEmbed");
allSpotifyEmbed.style.display = "none";
let otherTxt = document.getElementById("otherTxt");
let contingency = document.getElementById("contingencyTxt");
contingency.style.display = "none";

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
    otherTxt.style.display = "none";
})

stopCameraBtn.addEventListener("click", function() {
    webcamClass.stop();
})

retakeBtn.addEventListener("click", function() {
    webcamClass.start();
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    otherTxt.style.display = "none";
})

takePhotoBtn.addEventListener("click", function() {
  var picture = webcamClass.snap(); 
  webcamClass.stop();
  otherTxt.innerHTML = "";
})

// the 'no' button in the post-submission text
let fail = 0; // if it doesn't work too many times, it allows the user to enter it manually
retake2Btn.addEventListener("click", function() {
  webcamClass.start();
  canvasCtx.clearRect(0,0,canvas.width,canvas.height);
  fail = fail + 1;
  console.log("number of fails: " + fail);
  if (fail = 3) {
    contingency.style.display = "block";
    console.log("too many fails, sad")
  }
  postSubmissionTxt.style.display = "none";
  locationTxt.innerHTML = "are you currently: ";
})

  // submitting the photo taken
submitBtn.addEventListener("click", function() {
  console.log("submitted!");
  postSubmissionTxt.style.display = "block";
  myCanvas.toBlob(function(blob) {
        console.log("blob-ified");
        ImageAPI.analyseImageBlob(blob, (data) => {
          let tags = data.description.tags;
          console.log(tags);
          
          let workoutBool = tags.includes("outdoor" || "tree" || "road" || "street" || "sidewalk");
          let studyBool = tags.includes("table" || "desk" || "computer" || "laptop" || "office");
          let choresBool = tags.includes("kitchenware" || "sink" || "plate" || "kitchen");

          if (workoutBool == true) {
            locationTxt.innerHTML += "going on a stroll?";
          }
          else if  (studyBool == true) {
            locationTxt.innerHTML += "studying?";
          }
          else if (choresBool == true) {
            locationTxt.innerHTML += "washing dishes?";
          }
           else {
            otherTxt.style.display = "block";
            otherTxt.innerHTML = "Hmm. I'm not sure. Try taking a more relevant photo.";
            postSubmissionTxt.style.display = "none";
            fail = fail + 1;
            console.log("number of fails: " + fail);
          }
        })
    })
})

confirmBtn.addEventListener("click", function() {
  otherTxt.innerHTML = "Cool! Let me grab your playlist real quick."
  if (workoutBool == true) {
    workoutEmbed.style.display = "block";
  }
  else if (studyBool == true) {
    studyEmbed.style.display = "block";
  }
  else if (choresBool == true) {
    choresEmbed.style.display = "block";
  }
})



