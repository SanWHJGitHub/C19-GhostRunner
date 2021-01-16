p5.disableFriendlyErrors = true;

var tower,towerImg;
var ghost,ghostImag;
var door,doorImg,doorsGroup;
var climber,climberImg,climberssGroup;
var spookySound;
var invisibleBlock,invisibleBlockGroup;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-jumping.png");
  climberImg = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  spookySound.loop();
  
  tower = createSprite(windowWidth/2,200);
  tower.addImage(towerImg);
  
  ghost = createSprite(windowWidth/2,windowHeight/2,100,80);
  
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw()
{
  background(0);
  
  if(gameState === PLAY)
  {
      tower.velocityY = 3;   
      
      if(keyDown("left_arrow"))
      {
        ghost.x = ghost.x - 8;
      }
    
      if(keyDown("right_arrow"))
      {
        ghost.x = ghost.x + 8;
      }
    
      if(keyDown("space"))
      {
        ghost.velocityY = -10;
      }
    
      ghost.velocityY = ghost.velocityY + 0.5;

      if(tower.y > height-100)
      {
        tower.y = tower.y/2;
      }
  
      spawnDoors();

      if(climbersGroup.isTouching(ghost))
      {
        ghost.velocityY = 0;
      }
      
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > height)
      {
        ghost.destroy();
        gameState = END;
      }

      drawSprites();
  }
  else if (gameState === END)
  {
     tower.velocityY = 0;
     
     stroke("yellow");
     fill("yellow");
     textSize(30);
     text("Game Over!",width-750,height-300);
     doorsGroup.destroyEach();
     climbersGroup.destroyEach();
     invisibleBlockGroup.destroyEach();
  }
  
}

function spawnDoors()
{
  
  if(frameCount % 240 === 0)
  {
    var door = createSprite(width-600,height-(height+50));
    var climber = createSprite(200,height-(height-10)); 
    var invisibleBlock = createSprite(200,height-(height-15)); 
    
    door.addImage(doorImg);
    climber.addImage(climberImg);

    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(width-500,height-200));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    invisibleBlock.debug = true;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth +=1;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    door.lifetime = height + 100;
    climber.lifetime = height + 800;
    invisibleBlockGroup.lifetime = height + 800;
  }

}