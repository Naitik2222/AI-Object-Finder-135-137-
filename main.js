video="";
Status="";
object =[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name = document.getElementById("input_box").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    Status = true;

}
function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw(){
  image(video , 0 ,0 , 380 , 380);

  if(Status != ""){
    objectdetector.detect(video , gotResult);
    for(i=0 ; i<object.length ; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected ";
        
        
        fill("#FF0000");
        percent = floor(object[i].confidence*100);
        text(object[i].label+ " " +percent+"%" , object[i].x+15 , object[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
    }

    if(object[i].label == object_name ){
        document.getElementById("object_detected").innerHTML = object_name+"found";
        video_webcamLiveView.stop();
        objectDetector.detect(gotResult);
        synth = window.speechSynthesis;
        utter_This = new speechSynthesisUtterance(speak_data);
        speak_data = object_name+"found";
        synth.speak(utter_This);

    }else{
        document.getElementById("object_detected").innerHTML = object_name+" notfound";
    }
}
}