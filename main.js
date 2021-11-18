img = ""
portal = ""
object = [];

function preload(){
      img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(350,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd",loaded);
    document.getElementById("status").innerHTML = "Status : Detecting";
}

function loaded(){
    console.log("cocossd LOADED");
    portal = true;
    object_detector.detect(video,gotResults);
}

function draw(){
    image(video,0,0,350,350);
    if(portal != ""){
        object_detector.detect(video,gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status : Detected";
            document.getElementById("object_count").innerHTML = "Number of objects present: " + object.length;
            fill(r,g,b);
            stroke(r,g,b)
            noFill()
            percent = floor(object[i].confidence * 100);
            text(object[i].label +  "  " + percent + "%", object[i].x + 10, object[i].y + 20);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
            
        }
    }
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results); 
        object = results;  
    }
}