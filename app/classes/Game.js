import {Loop} from './Loop';

export default class Game {
    constructor(){

        this.bx = 0;
        this.vx = 0.08;
        this.ctx = document.querySelector('canvas').getContext('2d');

        this.loop = new Loop({maxFPS: 60});

        requestAnimationFrame(this.main.bind(this));
    }
    //Get and set
    getLoop(){
        return this.loop;
    }
    //Calculate all
    update(delta){
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
        document.querySelector('#gameFps').textContent = `${Math.round(this.loop.fps)} fps`;
        let ctx = this.ctx
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,500,500);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.bx,40,20,20);
    }

    //Saven when spiral of death
    panic() {
        this.loop.setDelta(0);
        console.log('Panic!');
    }

    //Game loop
    main(timestamp){

        if (timestamp < this.loop.lastFrameTimeMs + (1000 / this.loop.maxFPS)) {
            requestAnimationFrame(this.main.bind(this));
            return;
        }
        this.loop.setDelta(timestamp - this.loop.lastFrameTimeMs);
        this.loop.lastFrameTimeMs = timestamp;

        if(timestamp > this.loop.lastFpsUpdate + 1000) {
            this.loop.fps = 0.25 * this.loop.framesThisSecond + 0.75 * this.loop.fps;
    
            this.loop.lastFpsUpdate = timestamp;
            this.loop.framesThisSecond = 0;
        }
        this.loop.framesThisSecond++;

        let numUpdateSteps = 0;
        while(this.loop.getDelta() >= this.loop.timestep){
            this.update(this.loop.timestep);
            this.loop.setDelta(this.loop.getDelta() - this.loop.timestep);
            if(numUpdateSteps++ >= 240){
                this.panic();
                break;
            }
        }

        this.draw();
        requestAnimationFrame(this.main.bind(this));
    }
}