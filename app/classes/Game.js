export default class Game {
    constructor(){

        this.bx = 0;
        this.vx = 0.08;
        this.ctx = document.querySelector('canvas').getContext('2d');

        this.maxFPS = 120;
        this.fps = this.maxFPS;
        this.lastFrameTimeMs = 0;
        this.delta = 0;
        this.timestep = 1000 / this.maxFPS;
        this.framesThisSecond = 0;
        this.lastFpsUpdate = 0;

        requestAnimationFrame(this.main.bind(this));
    }

    //Calculate all
    update(delta){
        //console.log('update');
        this.bx += this.vx * delta;
        if(this.bx >= 200){
            this.vx = -0.08;
        }
        if(this.bx <= 50){
            this.vx = 0.08;
        }
    }

    //Draw objects
    draw(){
        document.querySelector('#gameFps').textContent = `${Math.round(this.fps)} fps`;
        let ctx = this.ctx
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,500,500);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.bx,40,20,20);
    }

    //Saven when spiral of death
    panic() {
        this.delta = 0;
        console.log('Panic!');
    }

    //Game loop
    main(timestamp){

        if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
            requestAnimationFrame(this.main.bind(this));
            return;
        }
        this.delta = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        if(timestamp > this.lastFpsUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
    
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;

        let numUpdateSteps = 0;
        while(this.delta >= this.timestep){
            this.update(this.timestep);
            this.delta -= this.timestep;
            if(numUpdateSteps++ >= 240){
                this.panic();
                break;
            }
        }


        this.draw();
        requestAnimationFrame(this.main.bind(this));
    }
}