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
        F_BUTTON: 70,
        J_BUTTON: 74,
    }, 

    init: function(){
        console.log("cargado")
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.start()

        let countdown = document.querySelector("#countdown");

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
                console.log("destruido");
            }
            if(this.misilCollisionLeft()){
                console.log("destruido");
            }
            if(this.misilCollisionRight()){
                console.log("destruido");
            }
            
            if(this.reachBottom()) {
                this.gameOver()
            }
            
        }, 1000 / this.fps);
    },
    
    stop: function() {
        clearInterval(this.interval)
    },

    gameOver: function(){
        this.stop();
        if (confirm("Game Over, vuelves a jugar?")) {
            this.reset();
            this.start();
        }
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
    

    generateEnemies: function(){
        this.enemies.push(
            new Enemy(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    explote: function(){//x, y, w, ctx
        new Explotion()
    },
    
    clearEnemies: function(){
        this.enemies = this.enemies.filter((enemy) => enemy.y <= this.canvas.height)
    },
    
    reachBottom: function(){
        return this.enemies.some(ovni => {
            return ovni.y + (ovni.h * 0.75) >= this.canvas.height
        })
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


    misilCollision: function () { // colision de misil que dispara hacia arriba
        return this.enemies.some(ovni => {
            return this.shuttle.missiles.some(misil => {
                let result = (
                    misil.y <= ovni.y + (ovni.h*0.5) && // la principal
                    misil.x <= ovni.x + ovni.w &&
                    misil.x + misil.misilW >= ovni.x &&
                    misil.y + misil.misilH >= ovni.y
                )
                if(result) {
                    this.enemies = this.enemies.filter(o => o !== ovni)
                    this.shuttle.missiles = this.shuttle.missiles.filter(m => m !== misil)
                }
                return result
            })
        })
    },
    misilCollisionLeft: function () { // colision de misil que dispara por la izquierda
        return this.enemies.some(ovni => {
            return this.shuttle.missilesLeft.some(misil => {
                let result = (
                    misil.y <= ovni.y + (ovni.h * 0.8) &&
                    misil.x <= ovni.x + (ovni.w*0.5) && // la principal
                    misil.x + misil.misilW >= ovni.x &&
                    misil.y + misil.misilH >= ovni.y
                )
                if(result) {
                    this.enemies = this.enemies.filter(o => o !== ovni)
                    this.shuttle.missilesLeft = this.shuttle.missilesLeft.filter(m => m !== misil)
                }
                return result
            })
        })
    },
    misilCollisionRight: function () { // colision de misil que dispara por la derecha
        return this.enemies.some(ovni => {
            return this.shuttle.missilesRight.some(misil => {
                let result = (
                    misil.y <= ovni.y + (ovni.h * 0.8) &&
                    misil.x <= ovni.x + ovni.w &&
                    misil.x + (misil.misilW*0.4) >= ovni.x && // la principal
                    misil.y + misil.misilH >= ovni.y
                )
                if(result) {
                    this.enemies = this.enemies.filter(o => o !== ovni)
                    this.shuttle.missilesRight = this.shuttle.missilesRight.filter(m => m !== misil)
                }
                return result
            })
        })
    },



    enemyDeath: function(){
        this.enemies = this.enemies.filter((enemy) => enemy.src = "img/explotion.png")
    },

    destroy: function(){
        console.log("Ovni destruido")
    }
}

