status="";
video="";
objects=[];
function preload(){

}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
video.size(480,380);
video.hide();
}
function draw(){
image(video,0,0,480,380);
if(status=!""){
    for(i=0;1<objects.length;i++){
        percentage= floor(objects[i].confidence*100);
        label=objects[i].label;
        x=objects[i].x;
        y=objects[i].y;
        height=objects[i].height;
        width=objects[i].width;
        text(label+" "+percentage+"%",x,y,);
        fill();
        nofill();
        stroke("#FF0000");
        rect(x,y,width,height);
        if(objects[i].label==input){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML="Status: Object Mentioned Found."
            synth = window.speechSynthesis;
             utterThis = new SpeechSynthesisUtterance(label + "Found");
              synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML="Status: Object Mentioned  Not Found."
        }
    }
}
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects."
    input=document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function gotResult(results,error){
if(error){
    console.log(error);
}else{
    console.log(results);
    objects=results;
}
}