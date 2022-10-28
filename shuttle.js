class Shuttle{
    constructor(w, h, ctx, keys) {
        this.canvasW = w;
        this.canvasH = h;
        this.ctx = ctx;
        this.keys = keys;
        this.img = new Image();
        this.img.src = "img/naveSprite.png";

        this.x = this.canvasW * 0.45;   //posicion inicial en x
        this.y = this.canvasH * 0.7;   //posicion inicial en y 
        //this.y = this.y0;  // solo si hay gravedad 
        this.img.frames = 3;
        this.img.frameIndex = 0;
        this.accel = 12; //aceleracion inicial
        this.accelNeutral = 12; 
        this.w = 100;
        this.h = this.w * 1.3; // la altura de la nave es 30% mas al ancho de la nave

        this.setListeners()

        this.dy = 0;
        this.dx = 0;

        this.rightLimit =   this.canvasW - this.w;
        this.leftLimit =    this.canvasW * 0.001;
        this.topLimit =     this.canvasH * 0.001;
        this.bottomLimit =  this.canvasH - this.h;

        this.missiles = []
  }
    

    setListeners(){
        document.onkeydown = function(event){
            if (event.keyCode === this.keys.ARROW_UP) { // keyCode esta en desuso, reemplazado por KeyboardEvent.code
                this.dy = 3
                this.accel = 3
            } else if (event.keyCode === this.keys.ARROW_DOWN) {
                this.dy = -3
                this.accel = 18
            } else if (event.keyCode === this.keys.ARROW_RIGHT) { 
                this.dx = -3
                this.accel = 6
            } else if (event.keyCode === this.keys.ARROW_LEFT) { 
                this.dx = 3
                this.accel = 6
            } else if (event.keyCode === this.keys.SPACE) { 
                this.shoot()
            }
        }.bind(this)

        document.onkeyup = function(event){
            if (event.keyCode === this.keys.ARROW_UP) { 
                this.dy = 0
                this.accel = this.accelNeutral
            } else if (event.keyCode === this.keys.ARROW_DOWN) { 
                this.dy = 0
                this.accel = this.accelNeutral
            } else if (event.keyCode === this.keys.ARROW_RIGHT) { 
                this.dx = 0
                this.accel = this.accelNeutral
            } else if (event.keyCode === this.keys.ARROW_LEFT) { 
                this.dx = 0
                this.accel = this.accelNeutral
            }
        }.bind(this)
    }
    
    draw(frameCounter){ //codigo del move del sprite en 1h30m del primer video
        this.ctx.drawImage(
                this.img,
                this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
                0,
                Math.floor(this.img.width / this.img.frames),
                this.img.height,
                this.x,
                this.y,
                this.w,
                this.h,

                
        )
        this.animateImg(frameCounter)

        //clear misiles
        this.missiles = this.missiles.filter((misil) => misil.y > 0 - 50)
        this.missiles.forEach((misil) => {
            misil.draw();
            misil.move();
        }) 
    }

    animateImg(frameCounter){
        if(frameCounter % this.accel === 0){  //el residuo determina el movimiento del sprite
            this.img.frameIndex++;
        }
        if(this.img.frameIndex >= this.img.frames) this.img.frameIndex = 0; // otra manera de declarar if   
    }
    
    move(){
        if (this.x >= this.rightLimit && this.x <= this.leftLimit ||
            this.x < this.rightLimit && this.dx <  0 ||
            this.x > this.leftLimit && this.dx > 0
            ) {
            this.x -= this.dx    
        }
        if (
            this.y >= this.topLimit && this.y <= this.bottomLimit ||
            this.y < this.topLimit && this.dy <  0 ||
            this.y > this.bottomLimit && this.dy > 0
            ){
            this.y -= this.dy
        } 
    }

    shoot() {
        let misil = new Misil(//const(x, y, w, ctx)
            this.x + (this.w * 0.3),
            this.y - (this.y * 0.05),
            40,
            this.ctx
        )
        this.missiles.push(misil)
    }
}