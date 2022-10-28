class Explotion{
    constructor(x, y, w, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = this.w;
        this.ctx = ctx;
        
        this.img = new Image();
        this.img.src = "img/explosion.png";

        this.img.frames = 7;
        this.img.frameIndex = 0; 
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
    }

    animateImg(frameCounter){
        if(frameCounter % 10 === 0){  //el residuo determina el movimiento del sprite
            this.img.frameIndex++;
        }
        if(this.img.frameIndex >= this.img.frames) this.img.frameIndex = 0; // otra manera de declarar if   
    }
}