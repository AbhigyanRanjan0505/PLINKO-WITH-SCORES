const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var particles = [], plinkos = [], divisions = [], divisionHeight = 300, score = 0, count = 0, gameState = "start";

function setup() {
  var canvas = createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }
  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");

  fill("white");
  textSize(35);
  text("Score : " + score, 20, 40);


  fill("green");
  text("500", 10, height - 275);
  text("500", 90, height - 275);
  text("500", 170, height - 275);
  text("500", 250, height - 275);

  fill("orange");
  text("100", 330, height - 275);
  text("100", 410, height - 275);
  text("100", 490, height - 275);

  fill("yellow");
  text("200", 570, height - 275);
  text("200", 650, height - 275);
  text("200", 730, height - 275);

  Engine.update(engine);
  ground.display();

  if (count >= 5) {
    gameState = "end";
    textSize(100);
    text("GameOver", 150, 250);
  }

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].display();

    if (particles[i].body.position.x < 300 && particles[i].body.position.y > 760) {
      score = score + 500;
      particles.pop();
    }
    else if (particles[i].body.position.x < 600 && particles[i].body.position.x > 301 && particles[i].body.position.y > 760) {
      score = score + 100;
      particles.pop();
    }
    else if (particles[i].body.position.x < 900 && particles[i].body.position.x > 601 && particles[i].body.position.y > 760) {
      score = score + 200;
      particles.pop();
    }
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
}
function mousePressed() {
  if (gameState !== "end") {
    count++;
    particles.push(new Particle(mouseX, 10, 10, 10));
  }
}