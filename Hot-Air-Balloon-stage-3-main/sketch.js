var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameOver, gameOverImg
var restart, restartImg

var score = 0;

//game states      
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameOverImg= loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")

coinImg = loadImage("coin.png")

dieSound = loadSound("assets/die.mp3");
jumpSound = loadSound("assets/jump.mp3");
//bg_Sound = loadSound("assets/sound1.mp3");


}

function setup(){

  createCanvas(1000,600)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 2
bg.velocityX= -6;
bg.x=bg.width/18;
//jumpSound.play();
//jumpSound.setVolume(1);

//creating top and bottom grounds
fill("black");
bottomGround = createSprite(200,590,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,400,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug = true;

//initialising groups
topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();

//creating game over and restart sprites
gameOver = createSprite(450,250);
restart = createSprite(450,280);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;
//console.log(gameState)

//coin group
coinGroup = new Group();
}

function draw() {
  
  background("white");
  if(gameState=== PLAY){
  if(bg.x<0){
    bg.x=bg.width/2;

  }
 if(keyDown("space")){
   balloon.velocityY=-12;

 }
 balloon.velocityY=balloon.velocityY+0.5;
 if(topObstaclesGroup.isTouching(balloon)||bottomObstaclesGroup.isTouching(balloon)){
   gameState=END;
  dieSound.play();
 }
   if(coinGroup.isTouching(balloon)){
     score = score +5;
     coinGroup.destroyEach();
   }
   
  }

  else if(gameState === END){
    gameOver.visible=true;
    restart.visible=true;
    bg.velocityX=0;
    balloon.velocityY=0;
    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    topObstaclesGroup.setLifetimeEach(-1);
    bottomObstaclesGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();

    }
  }
    balloon.collide(bottomGround);
    balloon.collide(topGround);
    drawSprites();
    spawnObstaclesBottom();
    spawnObstaclesTop();
    Score(); 
    spawncoin();    
}

function reset()
{
  
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  //balloon.destroy();
  
  score=0;
  gameState = PLAY;
}


function spawnObstaclesTop() 
{
  if(World.frameCount % 60 === 0) {
    obstacleTop = createSprite(1000,50,40,50);

obstacleTop.addImage(obsTop1);

obstacleTop.scale = 0.1;
obstacleTop.velocityX = -6;

//random y positions for top obstacles
obstacleTop.y = Math.round(random(10,100));

//generate random top obstacles
var rand = Math.round(random(1,2));
switch(rand) {
  case 1: obstacleTop.addImage(obsTop1);
          break;
  case 2: obstacleTop.addImage(obsTop2);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleTop.lifetime = 200;

balloon.depth = balloon.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}

function spawnObstaclesBottom() 
{
      if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(1000,550,40,50);
    
    obstacleBottom.addImage(obsBottom1);
    obstacleBottom.debug=true

    
    obstacleBottom.scale = 0.08;
    obstacleBottom.velocityX = -4;
    
    

   //generate random bottom obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleBottom.lifetime = 250;
    
   balloon.depth = balloon.depth + 1;

   bottomObstaclesGroup.add(obstacleBottom);
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
        
          
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(balloon.isTouching(barGroup))
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(22);
        fill("black");
        text("Score: "+ score, 800, 50);
       
  
}

  
function spawncoin(){
  if(World.frameCount % 60 === 0) {
    coin = createSprite(1000,50,40,50);

coin.addImage(coinImg);

coin.scale = 0.3;
coin.velocityX = -7;

//random y positions for top obstacles
coin.y = Math.round(random(50,550));

 //assign lifetime to the variable
coin.lifetime = 200;

balloon.depth = balloon.depth + 1;

coinGroup.add(coin);

  }
}