var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gost_1, gost_img_1,gost_img_2,gost_img_3,gost_img_4;
var gostgroup;
var score = 0;
var bullet_left = 50;
var bullets, bullet_img, bulletgroup;
var life = 3;
var heart1, heart2, heart3;
var heart_img1, heart_img2, heart_img3;
var obstacle, obsticle_img;
var border_right,border_left,border_up,border_down;
// var gameState = Instructions;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  gost_img_1 = loadImage("assets/gost_1.png");
  gost_img_2 = loadImage("assets/gost_2.png");
  gost_img_3 = loadImage("assets/gost_3.png");
  gost_img_4 = loadImage("assets/gost_4.png");
  bullet_img = loadImage("assets/bullet.png");
  heart_img1 = loadImage("assets/heart_1.png");
  heart_img2 = loadImage("assets/heart_2.png");
  heart_img3 = loadImage("assets/heart_3.png");
//  obsticle_img = loadImage("asstes/rock_1.png")

  bgImg = loadImage("assets/bg.jpeg")

  bulletgroup = new Group();
  gostgroup = new Group();


}

function setup() {

  
  createCanvas(displayWidth-20,displayHeight-100);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(400, 500, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   border_right = createSprite(1430, displayHeight/2, 10, displayHeight); 
   border_left = createSprite(60, displayHeight/2, 10, displayHeight);
   border_up = createSprite(displayWidth/2, 20, displayWidth, 10);
   border_down = createSprite(displayWidth/2, 600, displayWidth, 10);

   heart1 = createSprite(100, 40, 20, 20);
   heart2 = createSprite(150, 40, 20, 20);
   heart3 = createSprite(170, 40, 20, 20);

   heart1.addImage(heart_img1);
   heart2.addImage(heart_img2);
   heart3.addImage(heart_img3);

  heart1.scale = 0.25;
  heart2.scale = 0.25;
  heart3.scale = 0.25;
   
   

   border_up.visible = false;
   border_down.visible = false;
   border_right.visible = false;
   border_left.visible = false;
   




}

function draw() {
  background(0);
  
  player.collide(border_up);
  player.collide(border_down);
  
  if(frameCount%50===0){
    spawn_gosts();
  }

  if(gostgroup.collide(bulletgroup)){
    // gostgroup.destroy();
    bullets.destroy();
    score = score + 1;
  
  }




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y -(10 + (score * 1));
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y + (10 + (score * 1));
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  spawn_bullets();
  bullet_left = bullet_left - 1;
 
}

if(gostgroup.isTouching(player) || bullet_left === 0){
  life = life-1;
}

console.log("life = " + life);

if(life === 3){
  heart3.visible = true;
  heart2.visible = false;
  heart1.visible = false;
}

if(life === 2){
  heart3.visible = false;
  heart2.visible = true;
  heart1.visible = false;
}

if(life === 1){
  heart3.visible = false;
  heart2.visible = false;
  heart1.visible = true;
}

if(life === 0){
  heart3.visible = false;
  heart2.visible = false;
  heart1.visible = false;
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();
fill("black");
textSize(25);
stroke("red");
text(mouseX+","+mouseY, mouseX, mouseY );
text("score = " + score,1000, 40);
text("bullets left = " + bullet_left, 1200, 40);




}

function spawn_gosts(){
  var gost_y = Math.round( random (30,600));
  gost_1 = createSprite(1400, gost_y,  60, 60);
  gost_1.velocityX = -10 - ( score * 1.5);
  var gost_random = Math.round( random(1,4));
  switch(gost_random){
    case 1 : gost_1.addImage(gost_img_1);
    break;
    case 2 : gost_1.addImage(gost_img_2);
    break;
    case 3 : gost_1.addImage(gost_img_3);
    break;
    case 4 : gost_1.addImage(gost_img_4);

    break;
    default:break;

  }

  gost_1.lifetime = 120;
  gost_1.scale = 2;
  gostgroup.add(gost_1);
}

function spawn_bullets(){
  bullets = createSprite(player.x, player.y, 20,20);
  bullets.addImage(bullet_img);
  bullets.scale = 0.5;
  bullets.velocityX = 40;
  bullets.lifeTime = 100;
  bulletgroup.add(bullets);
}
