status1="";
object_name="";
object=[];


function preload(){

}

function setup(){
canvas=createCanvas(350,300);
canvas.center();
video=createCapture(VIDEO);
video.size(350,300);
video.hide();
}

function draw(){
    image(video,0,0,350,300);
    if(status1 != ""){
        objectdetector.detect(video,gotresult);
        for(i=0;i<object.length;i++) {
            fill("blue");
            percent=floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%" ,object[i].x,object[i].y);
            
            noFill();
            stroke("blue");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object_name==object[i].label){
                document.getElementById("object_detect").innerHTML="object found";
            }
            else{
                document.getElementById("object_detect").innerHTML="object not found";
            }
            
        }
    }
}

function start(){
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
    object_name=document.getElementById("object_names").value;
}

function modelloaded(){
    console.log("modelloaded");
    status1="true";
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;

    }
}
