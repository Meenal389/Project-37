var dog,dogimg;
var doghappy;
var database;
var foodS;
 var foodStack;
var addFood,feedpet;
var fedTime,lastfed;
var foodObj;
var gameState=0;
var readState;
var bedroom,garden,washroom;
var sadDog;
var foodObject;

function preload(){
dogimg=loadImage("images/Dog.png")
doghappy=loadImage("images/Happy.png")
bedroom=loadImage("images/Bed Room.png")
garden=loadImage("images/Garden.png")
washroom=loadImage("images/Wash Room.png")
sadDog=loadImage("images/deadDog.png")
}

function setup() {
	createCanvas(800, 500);
  dog=createSprite(550,250,50,50)
  dog.addImage(dogimg,'dog')
 //doghappy.addImage(doghappy,"dog")
  dog.scale=0.3;

  foodObject=new Food()
  addFood=createButton("Add Food")
  feedpet=createButton("Feed Pet")
  feedpet.position(1050,100)
  feedpet.mousePressed(feedpet)
  addFood.position(1050,150);
  addFood.mousePressed(addFood)
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState')
 readState.on("value",function(data){
  gameState=data.val()
 })

}


function draw() {  
 background(46,139,47)
  drawSprites();
  dog.changeImage(dogimg)
  fill("white")
  textFont("Times New Roman")
  textSize(20)
  fill("black")
  textFont("Times New Roman")
  textSize(40)
  text("VIRTUAL PET",280,50)
  //Food.display()
  fedTime=database.ref('fedTime')
  fedTime.on("value",function(data){
    lastfed=data.val()
  })

  fill(" black")
  textFont("Times New Roman")
  textSize(25)
  currentTime=hour()
  if(lastfed>=12){
    text("Last Fed: "+lastfed%12+" PM" , 20,450)
  }
  else if(lastfed===0){
    text("Last Fed: 12:00 AM",20,450)
  }
  else{
    text("Last Fed: " + lastfed+"AM",20,450)
  }

  if(gameState!="hungry"){
    feedpet.hide()
    addFood.hide()
    dog.remove()
  }
  else{
    feedpet.show()
    addFood.show()
    dog.addImage(sadDog)
  }

  if(currentTime==(lastfed+1)){
    update("playing")
    foodObject.garden()
  }
  else if(currentTime==(lastfed+2)){
  update("sleeping")
  foodObject.bedroom()
  }
  else if(currentTime>(lastfed+2) && currentTime <=(lastFed+4)){
    update("bathing")
    foodObject.washroom()
  }
  else{
    update("hungry")
    foodObject.display()
  }

}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}

function readStock(data){
 foodS=data.val();
}

//text("Last Fed"+ hour(),50,50)

function writeStocks(x){

  if(x<=0){
     x=0;
  }
  else{
    x=x-1
  }
database.ref('/').update({
  Food:x
})
}

function feedpet(){
  dog.addImage(doghappy)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    fedTime:hour()
  })
}

function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
