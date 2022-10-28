const Game = {
    canvas: undefined,
    ctx: undefined, 
    fps: 60,
    keys: {
        SPACE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
    }, 

    init: function(){
        console.log("cargado")
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.start()
    },

    start: function() {

        this.reset();

        this.interval = setInterval(() => {
            this.frameCounter++;
            if (this.frameCounter > 1000) {
                this.frameCounter = 0;
            }

            if (this.frameCounter % (Math.floor(Math.random() * (400 - 200 + 1) + 200   )) === 0) { // cada tantos frames genera un enemigo
                this.generateEnemies()
            }
            
            this.moveAll(); 
            this.drawAll();  
            this.clearEnemies();

            if (this.shuttleColission()) {
                this.gameOver()
            }

            if(this.misilCollision()){
                this.destroy()
            }

            if (this.reachBottom()) {
                this.gameOver()
            }
            
        }, 1000 / this.fps);
    },

    reset: function(){  
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.shuttle = new Shuttle(this.canvas.width, this.canvas.height, this.ctx, this.keys)
        this.enemies = [] //array de los enemigos ovnis
        this.frameCounter = 0
         
    },

    moveAll: function() {
        this.background.move()
        this.shuttle.move()
        this.enemies.forEach(enemy => {
            enemy.move()
        });
    },

    drawAll: function() {
        
        this.background.draw() 
        this.shuttle.draw(this.frameCounter)
        this.enemies.forEach(enemy => {
            enemy.draw()
        });
    },
    
    stop: function() {
        clearInterval(this.interval)
    },

    generateEnemies: function(){
        this.enemies.push(
            new Enemy(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    clearEnemies: function(){
        this.enemies = this.enemies.filter((enemy) => enemy.y <= this.canvas.height)
    },
    
    shuttleColission: function(){
        return this.enemies.some(ovni => {
            return (
                this.shuttle.y <= ovni.y + (ovni.h/2) &&
                this.shuttle.y + (this.shuttle.h/2) >= ovni.y &&
                this.shuttle.x + this.shuttle.w >= ovni.x &&
                this.shuttle.x <= ovni.x + (ovni.w/2)
                )
            })
        },
        
    reachBottom: function(){
        return this.enemies.some(ovni =>{
            return this.canvas.height >= ovni.y
        })
    },

    misilCollision: function () {
        return this.enemies.some(ovni => { //shuttle.misil.
            return (
                this.misil.y <= ovni.y + (ovni.h/2) &&
                this.misil.y + (this.misil.h/2) >= ovni.y &&
                this.misil.x + this.misil.w >= ovni.x &&
                this.misil.x <= ovni.x + ovni.w
            )
        })
    },


    destroy: function(){
        console.log("Ovni destruido")
    },

    gameOver: function(){
        this.stop();
        if (confirm("Game Over, vuelves a jugar?")) {
            this.reset();
            this.start();
        }
    }

}