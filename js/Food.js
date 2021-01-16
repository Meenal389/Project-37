class Food{
    constructor(){
         this.FoodStock=0;
        this.lastfed;
        this.image=loadImage("js/Milk.png")
    }
    getFoodStock(){
     return this.FoodStock
    }
    updateFoodStock(FoodStock){
      this.FoodStock=FoodStock;
    }
    getFedTime(lastfed){
        this.lastfed=lastfed;
      }
    deductFood(){
      if(this.FoodStock>0){
          this.FoodStock=this.FoodStock-1;
      }
    }

    bedroom(){
      background(bedroom,400,250)
    }

    garden(){
       background(garden,400,250)
    }
    washroom(){
      background(washroom,400,250)
    }

    display(){
       var x=80,y=100;
      imageMode(CENTER)
      image(this.image,720,220,70,70)
      if(this.FoodStock!==0){
          for(var i=0;i<this.foodStock; i++){
                 if(i%10===0){
                     x=80
                     y=y+50
                 }
          }
            this.image(this.image,x,y,50,50)
            x=x+30
          }

      }

    }
