
/*
Project 1
By: Ryan Su

The adjective I wanted to convey is lost.You are a spaceship lost in the depths of space.
You can use the arrow keys to move the ship back and forth.
You can now use the mouse to shoot the meteors that spawn. Shooting meteors increases
your score. Getting hit by a meteor makes you lose health. Lose all your health and you
get a game over.

*/

var starIndex = 0;
var stars = [];
var exhaustIndex = 0;
var exhaust = [];

var planet;

var spaceShipX = 300;

var playerHealth = 150;

var bullets = [];
var meteors = [];
var meteorIndex = 0;

var explosions = [];

var score = 0;

function setup() 
{ 
  createCanvas(600, 600);
  //Make an array of stars
	while(stars.length < 300)
	{
		stars[starIndex] = new Star();
		starIndex++;
	}
  //Make an array of exhaust
  while(exhaust.length < 3)
  {
  	exhaust[exhaustIndex] = new Exhaust();
    exhaustIndex++;
  }
  
  while(meteors.length < 15)
  {
  	meteors[meteorIndex] = new Meteor(50);
    meteorIndex++;
  }
  
  
  
  
  exhaust[1].y = 550;
  exhaust[2].y = 575;
  exhaust[1].size = 20;
  exhaust[2].size = 10;
  
  //Create a new planet object
  planet = new Planet();
  planet.getseed();

  
	pixelDensity(1);
  
  
} 

function draw() 
{ 
  background(0);
  
  var fps = frameRate();
  print(fps);
  

  
	//Moves the stars
	for(var i = 0; i < stars.length; i++)
	{
		stars[i].move();
		
		if(stars[i].y > 600)
		{
			stars[i].y = random(0,100);
		}
		stars[i].display();
	}
	
  //Move the exhaust
  for(var j = 0; j < exhaust.length; j++)
  {
  	exhaust[j].move();
    exhaust[j].display();
    //exhaust[j].x = spaceShipX;
    
  }
  
  //Move the planet
  planet.move();
  if(planet.y >= 850)
  {
  	planet.x = random(0,600);
    planet.y = -300;
    planet.getseed();
  }
  planet.display();
  
  //Move any bullets
  for(var k = 0; k < bullets.length; k++)
  {
  	bullets[k].move();
    bullets[k].display();
  }
  
  //Check if bullet is out of bounds
  for(var m = 0; m < bullets.lenth; m++)
  {
  	bullets[m].y < 0;
    bullets.splice(m,1);
  }
  
  //move meteors
  for(var l = 0; l < meteors.length; l++)
  {
  	meteors[l].move();
    meteors[l].display();
  }
  
  //Move any explosions
  for(var o = 0; o < explosions.length; o++)
  {
  	explosions[o].move();
    explosions[o].display();
  }
  
	//Checks to see if the spaceship is moving
	if(keyIsDown(LEFT_ARROW) && spaceShipX >= 0) 
	{			
		spaceShipX -= 2;
	}
	else if(keyIsDown(RIGHT_ARROW) && spaceShipX <= 600)
	{
		spaceShipX += 2;
	}
  
  
	
	DrawSpaceship(spaceShipX, 500);
  
  
  //Creates a 2d texture field, currently disabled since it makes the sketch SLOW
  CreateNebula();
  
	DrawHealth();

  //show player score
  fill(255);
  text("Score: " + score, 500, 50);
  
  //GameOver?
  if(playerHealth <= 0)
  {
    text("Game Over", 250, 300);
  }
}


//Draws the spaceship, takes and x and a y to center the ship
function DrawSpaceship(x,y)
{
	rectMode(CENTER);
	fill(225);
	rect(x,y + 20, 25, 50);
	rect(x, y - 25, 20, 40);
	rect(x, y + 40, 20, 20);
	fill(225);
	triangle(x - 40, y + 45, x, y - 10, x , y + 45);
	triangle(x + 40, y + 45, x, y - 10, x , y + 45);
  fill(200);
	rect(x, y + 30, 10, 30);
	fill(255,0,0);
	triangle(x - 10, y - 45, x + 10, y - 45, x, y - 65);
	fill(0,100,255);
	ellipse(x, y - 30, 15, 25);
}


//Star Class
function Star()
{
	this.x = random(0, 600);
	this.y = random(0, 600);
	
	this.move = function()
	{
		this.y += 1;
	}
	
	this.display = function()
	{
		noStroke();
		fill(255);
		ellipse(this.x,this.y,5,5);
	}
}

//Exhaust Class
function Exhaust()
{
	this.x = spaceShipX;
	this.y = 525;
	this.size = 30;
	
	this.move = function()
	{
		this.y += 3;
		this.size -= .9;
    
    if(this.size <= 0)
    {
    	this.y = 525;
      this.size = 30;
      this.x = spaceShipX;
    }
	}
	
	this.display = function()
	{
		fill(255,165,0);
		ellipse(this.x,this.y, this.size,this.size);
    fill(255,1100,0);
    ellipse(this.x, this.y-3, this.size/1.5,this.size/1.5);
	}
	
}

//Planet Class
function Planet()
{
	this.x = random(0, 600);
	this.y = -250;
  this.red = 0;
  this.green = 0;
  this.blue = 0;
  
  this.getseed = function()
  {
     this.red = random(0,150);
     this.green = random(0,150);
     this.blue = random(100,255);
  }
  
  this.update = function()
  {
    this.red += map(noise(this.red), 0, 1, -1, 1);
    this.green +=  map(noise(this.green), 0, 1, -1, 1);
    this.blue += map(noise(this.blue), 0, 1, -1, 1);
  }

	this.move = function()
	{
		this.y += .5;
	}
	
  //Plan: Make planet generate randomly. Random color, perlin noise to texture it.
	this.display = function()
	{
		noStroke();
    this.update();
		fill(this.red,this.green,this.blue);
		ellipse(this.x,this.y,250,250);
	}
}

//Bullet Class
function Bullet()
{
	this.x = spaceShipX;
  this.y = 450;
  this.index = 0;
  
  this.move = function()
  {
  	this.y -= 3;
    
  }
  
  this.display = function()
  {
  	noStroke();
    fill(255,200,0);
    rectMode(CENTER);
    rect(this.x,this.y, 10,10);
  }
}

//Shoot bullets from the spaceship
function mouseReleased()
{
   var numBullets = bullets.length;
   if(numBullets === 0)
   {
  	 bullets[0] = new Bullet(); 
   }
   else
   {
   	 bullets[numBullets] = new Bullet();
     bullets[numBullets].index = numBullets;
   }
}

//Creates meteors that move in a random direction. The plan is to give these meteors collision
//and allow players to get hit and destroy them.
function Meteor(mSize)
{
  this.x = random(0,600);
  this.y = -random(100, 700);
  this.velocityX = random(-1, 1);
  this.velocityY = random(1, 5);
  this.rotation = random(0,360);
  this.size = mSize;
  
  this.move = function()
  {
    this.rotation += 0.1;
  	this.x += this.velocityX;
    this.y += this.velocityY;
    if(this.x < -100 || this.x > 700)
    {
    	this.x = random(0,600); 
    }
    if(this.y > 800)
    {
    	this.y = -random(100, 700);
    }
    
    //Check bullet collision
    for(var i = 0; i < bullets.length; i++)
    {
      //check x collision
    	if(bullets[i].x <= this.x + 25 && bullets[i].x >= this.x - 25)
      {
      	 //check y collision
      		if(bullets[i].y <= this.y + 25 && bullets[i].y >= this.y - 25)
          {
            explosions[explosions.length] = new Explosion(this.x,this.y);
          	this.y = -random(100, 700);
            bullets.splice(i,1);
            score += 10;
            meteors[meteors.legnth] = new Meteor(50);
          }
      }
    }
    
    //Check Ship collision
    if(this.x <= spaceShipX + 50 && this.x >= spaceShipX - 50)
    {
    	if(this.y <= 550 && this.y >= 400)
      {
  				explosions[explosions.length] = new Explosion(this.x,this.y);
        	this.y = -random(100,700);
        	playerHealth -= 10;
          score -= 5;
      }
    }
        
  }
  
  this.display = function()
  {
    //rotate the meteors to make it look like they have a more random path.
    push();
    //angleMode(DEGREES);
    //rotate(this.rotation);
    fill(200);
  	ellipse(this.x, this.y, this.size, this.size);
	  fill(100);
  	ellipse(this.x + 10, this.y + 10, 15, 15); 
    ellipse(this.x + 5, this.y - 10, 10, 10);
    ellipse(this.x - 15, this.y + 5, 15, 15);
    pop();
  }
    
}

//This object is the explosions that will play when a meteor is destroyed.
function Explosion(xPos,yPos)
{
  this.x = xPos;
  this.y = yPos;
  this.size = 25;
  this.alpha = 255;
  
  this.move = function()
  {
  	this.size++; 
    this.alpha -= 5;
  }
  
  this.display = function()
  {
    fill(255,165,0, this.alpha);
    ellipse(this.x,this.y,this.size,this.size);
    fill(255,255,0, this.alpha);
    ellipse(this.x,this.y,this.size/2,this.size/2);
  }
  
}

//Creates a nebula by manipulating the pixels array which will change as the 
//player moves around. 
function CreateNebula()
{
  //A seed value that changes over time
  var seed = map(planet.y, -300, 600, 1, 5);
  //loadPixels();
  var yoff = seed;
  //Loop though the pixels, I only need to adjust the alpha
  for(var i = 0; i < width; i+=20)
  {
    var xoff = seed;
  	for(var j = 0; j < height; j+=20)
    {
    		var index = (i + j * width) * 4;
     	  var noiseNum = noise(xoff, yoff) * 255;
        /*
      	pixels[index] = noiseNum;
        pixels[index+1] = 0;
        pixels[index+2] = noiseNum;
        pixels[index+3] = 255;
        */
        rectMode(CORNER);
        fill(noiseNum,0,noiseNum, noiseNum);
        rect(i,j,20,20);
        xoff += 0.03;
    }
    yoff += 0.03;
  }
  
  //updatePixels();
}

function DrawHealth()
{
	//Create the player's health bar
	textSize(18);
  fill(255);
  text("Health", 25, 545);
  rectMode(CORNER);
  fill(150);
  rect(25,550, 150, 15);
  fill(255,0,0);
  rect(25,550, playerHealth, 15);
}