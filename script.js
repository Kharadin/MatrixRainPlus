const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;





let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);



gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');
// to apply gradient, it's applied to fillstyle of strokeStyle properties...

class Symbol {
     constructor (x, y, fontSize, canvasHeight){
          this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙♚♛♜♝♞♟♪♫';
          this.x = x;
          this.y = y;
          this.fontSize = fontSize;
          this.character = '';
          this.canvasHeight = canvasHeight;
          this.demoString = ['K', 'H', 'A', 'R','A','D','I','N'];
          this.demoStringIndex = 0;
          this.demoStringFlag = false; 



     } 

     draw (context) {

          if ( (this.demoStringFlag == false) &&  (Math.random()> 0.99) )
          {
           this.demoStringFlag = true;
           }
          
          if (this.demoStringFlag == false) {
               this.character = this.characters.charAt(Math.floor(Math.random()*this.characters.length))
              
                    ctx.font = effect.fontSize + 'px monospace';
               ctx.fillStyle = '#0aff0a'; // gradient; '#0aff0a';// 
               context.fillText(this.character, this.x * this.fontSize, this.y * this.fontSize);
          } else {

               this.character = this.demoString[this.demoStringIndex];
               this.demoStringIndex ++;
              
                      ctx.font = (effect.fontSize + 2 ) + 'px monospace';
               ctx.fillStyle = gradient;
              context.fillText("█", this.x * this.fontSize, this.y * this.fontSize);
              ctx.fillStyle =  '#0aff0a'; // gradient; '#0aff0a';// 
              context.fillText(this.character, this.x * this.fontSize, this.y * this.fontSize);

               
           
          }

         

          if (this.demoStringIndex ==  this.demoString.length) {       
               this.demoStringFlag = false;
               this.demoStringIndex = 0;
          }

      
          //изменение координат и проверка достижения низа полотна (наоборот)
          if (this.y * this.fontSize > this.canvasHeight && Math.random()> 0.98) {
               this.y=0;
          } else { 
               this.y +=1;
          }
     }
}
class Effect {
     constructor(canvasWidth, canvasHeight) {
          this.canvasWidth = canvasWidth;
          this.canvasHeight = canvasHeight;
          this.fontSize = 20;
          this.columns = this.canvasWidth/this.fontSize;

          this.symbols = [];
          //this array has all the individual symbol objects
          this.initialize();

     }
     initialize () {
         

          for (let i = 0; i < this.columns; i++) {
               this.symbols[i] = new Symbol (i, 1, this.fontSize, this.canvasHeight);
          }
     }
     resize (width, height) {
          this.canvasWidth = width;
          this.canvasHeight = height;
          this.columns = this.canvasWidth / this.fontSize;
          this.symbols = [];
          this.initialize();

     }
}

const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 15;
const mscPerFrame = 1000/fps;
// the amount of milliseconds to wait until triggering next frame
let timer = 0;
  




// animation loop
function animate (timeStamp) {
     // timeStamp : because requestAnimationFrame has in-built feature
     // it automatically passes a timestamp argument to the method it calls.

     const deltaTime = timeStamp - lastTime;

     lastTime = timeStamp;

     
     // for (let i = 0; i< 10; i++) {

     if (timer > mscPerFrame) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0,0, canvas.width, canvas.height);

          ctx.textAlign = 'center';
//          ctx.fillStyle = gradient;// '#0aff0a';// ;
//          ctx.font = effect.fontSize + 'px monospace';

          effect.symbols.forEach(symbol => symbol.draw(ctx));
          // lets call each element, for example, "symbol"
     
          timer = 0;
     } else {
          timer += deltaTime;
     }


    requestAnimationFrame(animate);
     // }
}

animate (0);
// 0 is for the timestamp input. for the fist loop.

window.addEventListener('resize', function(){
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     effect.resize(canvas.width, canvas.height);

     gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width/2);


     gradient.addColorStop(0, 'red');
     gradient.addColorStop(0.2, 'yellow');
     gradient.addColorStop(0.4, 'green');
     gradient.addColorStop(0.6, 'cyan');
     gradient.addColorStop(0.8, 'blue');
     gradient.addColorStop(1, 'magenta');

})
