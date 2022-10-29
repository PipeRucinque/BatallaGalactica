class Enemy {
    constructor(w, h, ctx) {
        this.ctx = ctx;
        this.canvasW = w;
        this.canvasH = h;
        
        this.x = Math.floor(Math.random() * this.canvasW);
        this.y = -100;
       
        this.img = new Image();
        this.img.src = `img/ovni${Math.floor(Math.random()* 5 + 1)}.png`;
        
        //tamaño de los enemigos
        this.w = 70;
        this.h = this.w * 1.3;

        this.dy = 0.9;// velocidad del enemigo 
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
  
    }

    move() {
        this.y += this.dy;
    }
}