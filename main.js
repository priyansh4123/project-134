song="";
status="";
object=[];
function preload(){
    song = loadSound("alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status:detecting object";
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
}
function gotResults(error,results){
    if (error){
        console.log(error);
    }
console.log(results);
object=results;
}
function draw(){
    image(video,0,0,380,380);
if (status != ""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectdetector.detect(video,gotResults);
    for (i=0 ; i<object.length ; i++){
    document.getElementById("status").innerHTML="Status:object detected";
    fill(r,g,b);
    confidence=floor(object[i].confidence*100);
    text(object[i].label +" "+confidence+"%",object[i].x+15,object[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    if (objectl[i].label=="person"){
        document.getElementById("totalobject").innerHTML="Baby found";
        song.stop();
    }
    else{
        document.getElementById("totalobject").innerHTML="Baby not found";
        song.play();
    }
    }
    if (object.length==0){
        document.getElementById("totalobject").innerHTML="Baby not found";
        song.play();
    }
}
}
