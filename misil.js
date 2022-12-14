class Misil {
    constructor(x, y, w, ctx){
        this.x = x;
        this.y = y;
        this.misilW = w;
        this.misilH = this.misilW;
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = "img/misil.png";
        // this.imgLeft = new Image();
        // this.img.src = "img/misilLeft.png";
        // this.imgRight = new Image();
        // this.img.src = "img/misilRight.png";

        this.vel_x = 10;
        this.vel_y = 10; 
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,          //posicion x de la nave
            this.y,            //posicion y de la nave
            this.misilW,
            this.misilH
        )
    }
    drawLeft() {
        this.ctx.drawImage(
            this.imgLeft,
            this.x,          //posicion x de la nave
            this.y,            //posicion y de la nave
            this.misilW,
            this.misilH
        )
    }
    drawRight() {
        this.ctx.drawImage(
            this.imgRight,
            this.x,          //posicion x de la nave
            this.y,            //posicion y de la nave
            this.misilW,
            this.misilH
        )
    }

    move(){
        this.y -= this.vel_y;
    }
    moveLeft(){
        this.x -= this.vel_x;
    }
    moveRight(){
        this.x += this.vel_x;
    }
}