var monkey, monkey_running, bananaimg, obstacleimg;
var backGround, backimg, invisibleGround;
var gameOver, restart, gameoverimg, restartimg;
var PLAY = 3;
var END = 2;
var YOUWIN = 1;
var gameState = PLAY;
var ObstaclesGroup,BananasGroup;
var Survival_Time, Bananas_Collected;

function preload(){
  
  backimg=loadImage("jungle.jpg");
  
  monkey_running=loadAnimation("Monkey_01.png",  "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",  "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaimg=loadImage("Banana.png");
  obstacleimg=loadImage("stone.png");
  
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  
  backGround=createSprite(210,10,600,300);
  backGround.addImage(backimg);
  
  monkey=createSprite(150,235,300,150);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  invisibleGround = createSprite(200,270,400,10);
  invisibleGround.visible = false;

  ObstaclesGroup = new Group();
  BananasGroup = new Group();

  gameOver = createSprite(300,130);
  gameOver.addImage(gameoverimg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300,170);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;
  
  Survival_Time = 0;
  Bananas_Collected = 0;

textFont("Georgia");
textStyle(BOLD);

}
  
function draw() {
background(250);
  
  display();

  //console.log(gameState);
  
  if(gameState === PLAY){
    
    Survival_Time = Survival_Time + Math.round(getFrameRate()/60);
    
    if(keyDown("space")){
      monkey.velocityY = -12 ;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
    
    BananaCollected();
    
    spawnObstacles();
    
    spawnbananas();
    
    if(ObstaclesGroup.isTouching(monkey)){
    monkey.scale=0.1;
    gameState = END;
    }
  }
  
  else if(gameState === END) {

    gameOver.visible = true;
    restart.visible = true;
 
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);
  
    monkey.pause();
      
    if (mousePressedOver(restart)){
    monkey.play();
    gameState=PLAY;
    ObstaclesGroup.destroyEach();
    BananasGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
    Survival_Time=0;
    Bananas_Collected=0;
    }
  }
  
  //console.log(monkey.y);
  
  monkey.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 80 === 0) {
    var obstacle = createSprite(605,240,10,40);
    obstacle.velocityX = - (6 + 3*Survival_Time/100);
    obstacle.addImage(obstacleimg);
    
    obstacle.scale = 0.15;
    obstacle.lifetime = 90;
    
    ObstaclesGroup.add(obstacle);
  }
}

function spawnbananas() {
  if (World.frameCount % 100 === 0) {
    var bananas = createSprite(610,120);
    bananas.y=Math.round(random(120,180))
    bananas.velocityX = - (6 + 3*Survival_Time/100);
    bananas.addImage(bananaimg);
    
    bananas.scale=0.05;
    bananas.lifetime = 90;
    
    BananasGroup.add(bananas);
  }

}


function display(){
  stroke("white");
  textSize(18);
  textFont("Georgia");
  fill("green");
  text("Survival Time: "+ Survival_Time, 225, 100);  
  text("Bananas Collected: "+ Bananas_Collected, 0, 100);
}

function BananaCollected(){
    
    if (BananasGroup.isTouching(monkey)){
    Bananas_Collected=Bananas_Collected+1;
    BananasGroup.destroyEach();
    }
  
    switch(Bananas_Collected){
    case 2:monkey.scale=0.2;
           monkey.velocityY=monkey.velocityY+1
    break;  
    
    case 4:monkey.scale=0.3;
           monkey.velocityY=monkey.velocityY+1
    break;  
    
    case 6:monkey.scale=0.4;
           monkey.velocityY=monkey.velocityY+1
    break;   
    
    case 8:monkey.scale=0.5;
           monkey.velocityY=monkey.velocityY+1
    break;    
    
    case 10:monkey.scale=0.6;
           monkey.velocityY=monkey.velocityY+1
    break;    
        
    case 12:monkey.scale=0.7;
           monkey.velocityY=monkey.velocityY+1
    break;    
    
    case 14:monkey.scale=0.8;
           monkey.velocityY=monkey.velocityY+1
    break;    
    
    case 15:monkey.scale=0.9;
           monkey.velocityY=monkey.velocityY+1
    break;    
    
    default:break;
    }
}