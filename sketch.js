var cloud,cloudI;
var trex ,trex_running;
var ground,ground_image,iground;
var ob1,ob2,ob3,ob4,ob5,ob6;
var gS="play";
var oG,cG;
var tc;
var go,rs;
var score=0;
var jump,die,checkPoint;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
ground_image=loadImage("ground2.png")
cloudI=loadImage("cloud.png")
ob1=loadImage("obstacle1.png")
ob2=loadImage("obstacle2.png")
ob3=loadImage("obstacle3.png")
ob4=loadImage("obstacle4.png")
ob5=loadImage("obstacle5.png")
ob6=loadImage("obstacle6.png")
tc=loadAnimation("trex_collided.png")
go=loadImage("gameOver.png")
rs=loadImage("restart.png")
jump=loadSound("jump.mp3")
die=loadSound("die.mp3")
checkPoint=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200)
  ground=createSprite(30,150,1,1)
  ground.addImage ("bbb",ground_image)
  trex = createSprite(30,145,1,1)
  trex.addAnimation ("trex dor rha hai",trex_running)
  trex.addAnimation("trex",tc)
  trex.scale = 0.5
  iground=createSprite(300,160,600,10)
  console.log("Vaibhav Raj")
  cG=createGroup();
  oG=createGroup(); 
  trex.setCollider("circle",0,0,40)
  trex.debug=false;
  rS=createSprite(250,100)
  rS.addImage(rs)
  rS.scale=0.7;
  gO=createSprite(270,40)
  gO.addImage(go)
}

function draw(){
  background("white");
  

  
  text("Score:"+score,500,20)
  
  
  if(gS=="play"){
    trex.changeAnimation("trex dor rha hai",trex_running)
      ground.velocityX=-4;
    pObstacles();
    pClouds();
  if(keyDown("space")&&trex.y>110){
    trex.velocityY=-11;  
    jump.play();
  }
    
 if(ground.x<0){
    ground.x=300;  
  }
  trex.velocityY=trex.velocityY+1;
    if(trex.isTouching(oG)){
      gS="end";
   die.play(); }
    
     rS.visible=false;
    gO.visible=false;
    score=score+1;
    
if(score%200==0){
  checkPoint.play();
} 
}
  
  
  if(gS=="end"){
    ground.velocityX=0;
    oG.setVelocityXEach(0);
    cG.setVelocityXEach(0);
    cG.setLifetimeEach(-1)
    oG.setLifetimeEach(-1)
      trex.velocityY=trex.velocityY+1;
      trex.changeAnimation("trex",tc)
    rS.visible=true;
    gO.visible=true;
    
  if(mousePressedOver(rS)){
    restart();
  }
  }
   
  trex.collide(iground);
  iground.visible=false;
  drawSprites();
  
}

function pClouds(){
  if(frameCount%60==0){
  cloud=createSprite(550,random(20,90),10,10)
  cloud.velocityX=-10;
  cloud.addImage("cloud",cloudI)
  cloud.scale=0.8
  cloud.lifetime=200;
  cG.add(cloud);
}
}

function pObstacles(){
  if(frameCount%28==0){
    ob=createSprite(600,135,30,30);
   ob.velocityX=-10;
  var t= Math.round(random(1,6));
    switch(t){
      case 1 :ob.addImage(ob1)
        break
      case 2 :ob.addImage(ob2)
        break
      case 3 :ob.addImage(ob3)
        break
      case 4 :ob.addImage(ob4)
        break
      case 5 :ob.addImage(ob5)
        break
      case 6 :ob.addImage(ob6)
        break
    }
        ob.scale=0.550
        ob.lifetime=200;
     oG.add(ob); 
 }
}

function restart() {
  gS="play";
  oG.destroyEach();
  cG.destroyEach();
}

