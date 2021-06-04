
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600,600);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  foodGroup=new Group();
  obstaclesGroup=new Group();
  
  score=0;
  survivalTime=0;
}


function draw() {
  
  background(180);
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survivaltime: "+ survivalTime, 100,50);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if(keyDown("space")&& monkey.y >= 200) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnObstacles();
  spawnFood();
  monkey.collide(ground);
  
  if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = 0;  
        ground.velocityX = 0;
        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
     
        obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0); 
    }
  
  drawSprites();
}

function spawnObstacles(){
    if (frameCount % 300 === 0){
   var obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -6
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    }
}

function spawnFood(){
      if (frameCount % 80 === 0){
   var banana = createSprite(600,random(120,200),10,40);
  banana.velocityX = -5
   banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 300;
    foodGroup.add(banana);
    monkey.depth=banana.depth+1;
    }
}




