//  game loop- Init,Draw,Update,

 function init(){
     canvas=document.getElementById('mycanvas');
     pen=canvas.getContext('2d');
     W=canvas.width;
     H=canvas.height;
     game_over=false;

     food_img=new Image();
     food_img.src="images/food.png";

    food=getRandomFood(); 

    score=0;

   snake = {
      init_length:5,
      color:"blue",
      cells:[],
      direction:"right",

      createSnake:function(){
          for(var i=this.init_length-1;i>=0;i--){
              this.cells.push({x:i,y:0});
          }
      },
      drawSnake:function(){
          for(var i=0;i<this.cells.length;i++){
              pen.fillStyle=this.color;
              pen.strokeStyle="black";
              pen.lineWidth=5;
              pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
              pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
          }
      }, 
      updateSnake:function(){
          var headX=this.cells[0].x;
          var headY=this.cells[0].y;
          //Assuming Snake is moving right
          //Insertion at head and deletion from front
        //   nextHeadX=headX+1;
           //this.cells.pop();
        //   this.cells.unshift({x:nextHeadX,y:headY});

        // food eating 
        if(headX==food.x && headY==food.y){
            food=getRandomFood();
            score++;
        }
        else{
            //pop last cell if food not eaten
            this.cells.pop();
        }

        if(this.direction=="right"){
           nextX=headX+1;
           nextY=headY;
        } 
        else if(this.direction=="left"){
            nextX=headX-1;
            nextY=headY;
         }
         else if(this.direction=="down"){
            nextX=headX;
            nextY=headY+1;
         }
         else{
            nextX=headX;
            nextY=headY-1;
         }
     // insert the new cell at the head or front
     this.cells.unshift({x:nextX,y:nextY});

     // find out the last coordinates (boundaries)
     var last_x=Math.round(W/10);
     var last_y=Math.round(H/10);

     if(this.cells[0].y<0 || this.cells[0].x<0 ||this.cells[0].x>last_x || this.cell[0].y>last_y){
         alert("GameOver");
         game_over=true;
     }
    }
};
   snake.createSnake();

   //Add Event listners to our game
   //Listen for keyboard events
   
   function keyPressed(e){
       if(e.key=="ArrowRight"){
           snake.direction="right";
       }
       else if(e.key=="ArrowLeft"){
           snake.direction="left";
       }
       else if(e.key=="ArrowDown"){
        snake.direction="down";
    }
    else {
        snake.direction="up";
    }
}
   document.addEventListener('keydown',keyPressed);

 }

 function draw(){
       pen.clearRect(0,0,W,H);
      //pen.fillStyle="green";
      //pen.fillRect(box.x,box.y,box.w,box.h);
      snake.drawSnake();

      //let us draw the food
     
      pen.fillStyle=food.color;
     // pen.fillRect(food.x*10,food.y*10,10,10);
        pen.drawImage(food_img,food.x*10,food.y*10,10,10);  
      //adding score

      pen.fillStyle="white";
      pen.font="14px Roboto";
      pen.fillText("Score: "+score,10,10);


 }

 function update(){
    // box.x+=box.speed;
    // if(box.x>W){
    //     box.speed*=-1;
    // }
    // if(box.y> )
    snake.updateSnake();
 }

 function gameLoop(){
     draw();
     update();

     if(game_over==true){
         clearInterval(f);
     }
 }

 function getRandomFood(){
     var foodX=Math.round(Math.random()*(W-10)/10);
     var foodY=Math.round(Math.random()*(H-10)/10);

     foodColors=["red","green","aqua","coral","orchid"];
     var i=Math.round(Math.random()*foodColors.length);
    
     var food={
         x:foodX,
         y:foodY,
         color:foodColors[i],
    
         
     };
     return food;
 }

 init();
 // call gameLoop after t time
 var f=setInterval(gameLoop,100);
 //gameLoop();
  