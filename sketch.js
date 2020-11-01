var towerimg, tower, doorimg, door, doorsGroup, climberimg, climber, climberGroup, ghostimg, ghostimg2, ghost, sound, gameState = "play"

function preload() {
  towerimg = loadImage("tower.png")
  doorimg = loadImage("door.png")
  climberimg = loadImage("climber.png")
  ghostimg = loadImage("ghost-standing.png")
  ghostimg2 = loadImage("ghost-jumping.png")
  sound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600)
  sound.loop()
  tower = createSprite(300, 300, 600, 600)
  ghost = createSprite(300, 300, 50, 50)
  ghost.addImage(ghostimg)
  ghost.scale = 0.4
  tower.addImage(towerimg)
  tower.velocityY = 2
  doorsGroup = new Group()
  climberGroup = new Group()
  ghost.setCollider("rectangle", 0, 100, 50, 100)
  ghost.debug = true
}

function draw() {
  background("black")
  if (gameState == "play") {
    if (tower.y > 600) {
      tower.y = 300
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 5
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 5
    }
    ghost.velocityY = ghost.velocityY + 0.5
    if (keyDown("space")) {
      ghost.velocityY = -10
      ghost.addImage(ghostimg2)
    }
    if (keyWentUp("space")) {
      ghost.addImage(ghostimg)
    }
    if (ghost.y > 600) {
      ghost.destroy()
      gameState = "end"
    }
    if (ghost.isTouching(climberGroup)) {
      ghost.velocityY = 0
    }
    SpawnDoors()
    drawSprites()
  }
  if (gameState == "end") {
    stroke("black")
    fill("white")
    textSize(20)
    text("Game Over", 250, 300)
  }
}

function SpawnDoors() {
  if (frameCount % 200 == 0) {
    door = createSprite(300, -50, 10, 10)
    door.x = Math.round(random(120, 400))
    door.addImage(doorimg)
    door.velocityY = 2
    doorsGroup.add(door)
    door.lifetime = 330
    climber = createSprite(300, 10, 10, 10)
    climber.x = door.x
    climber.addImage(climberimg)
    climber.velocityY = 2
    climberGroup.add(climber)
    climber.lifetime = 330
    door.depth = ghost.depth
    climber.depth = ghost.depth
    ghost.depth = ghost.depth + 1
  }
}