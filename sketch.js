//Create variables here
var dog, happyDog, database, foodS;
var dogImg;
var milkImage;
var foodObj;
var fedTime, lastFed;

function preload() {
  //load images here
  dogImg = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();

  dog = createSprite(550, 250);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  var foodStock = database.ref("Food");
  foodStock.on("value", function (data) {
    foodS = data.val();
  });

  foodObj = new Food()

  var feed = createButton("Feed the Dog");
  feed.position(550, 10)
  feed.mousePressed(feedDog)

  var addFood1 = createButton("Add Food");
  addFood1.position(650, 10)
  addFood1.mousePressed(addFood)

  var feedTime=database.ref("feedTime");
  feedTime.on("value", function(data){
  lastFed=data.val();
  });
  
}


function draw() {
  background(46, 139, 87);

  foodObj.updateFoodStock(foodS);

  drawSprites();
  textSize(20);
  fill("white");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 25, 20);
  text("Food Remaining: " + foodS, 460, 400)
  //add styles here

  fill(255);
  textSize(15);
  if(lastFed>=12){
    text("Last fed : "+lastFed%12 + " PM",500,100);
  }else if(lastFed==0){
    text("Last fed : 12 AM",500,100);
  }else if(lastFed<=12){
    text("Last fed : "+lastFed + " AM",500,100);
  }


  foodObj.display();

}

function feedDog() {
  dog.addImage(happyDog);
  if (foodObj.getFoodStock() > 0) {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      feedTime: hour()
    })
  }
}
function addFood() {
  console.log("Hello in addFood")
  foodS++;
  database.ref('/').update({
    Food: foodS
  });

}