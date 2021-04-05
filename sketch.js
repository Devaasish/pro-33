var Engine = Matter.Engine,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;

var gameState = "start";

var rand;
var randA = [100,200,500];
 
var particles = [];
var plinkos = [];
var divisions = [];

var particle;
var count = 0;
var divisionHeight = 300;
var score = 0;
function setup() {
  createCanvas(800, 740);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  rand = Math.round(random(randA[0],randA[2]));

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score: " + score,20,30);
  text("Count: " + count,width-110,30);

  fill("yellow");
  noStroke();
  textSize(15);
  text("Press any where to get random score b/w 100-500 by ball",width-600,30);

  Engine.update(engine);
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].display();
    }

    if (particle != null) {
        particle.display();
        //console.log(particle.body.position.x + " , " + particle.body.position.y);
        if (particle.body.position.y > 700) {
            if (particle.body.position.x > 30) {
                score = score + rand;
                count = count + 1;
                particle = null;

                if (count >= 5) {
                    gameState = "end";
                }
            }
        }
    }

    if (gameState === "end") {
        particle = null;
        fill("white");
        textSize(40);
        text("Game Over", 300, 250);
    }

    for (var j = 0; j < particles.length; j++) {
    
      particles[j].display();
    }
    for (var k = 0; k < divisions.length; k++) {
      
      divisions[k].display();
    }

}

function go() {
  if(frameCount%60===0){
    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    score++;
  }
}

function mousePressed() {

  //console.log("score_mp " + score);
    if (score === 0) {
        console.log("score " + score);
        particle = new Particle(mouseX, 10, 10);
    } else if (score !== 0) {
      particle = new Particle(mouseX, 10, 10);
    }
}