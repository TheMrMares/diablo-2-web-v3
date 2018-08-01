import GLOBALS from './../globals/globals';

import {Loop} from './Loop';
import {guiUnit} from './gui/guiUnit';

export class Game {
    constructor({canvas} = {}){

        this.canvas = canvas;
        this.drawground = canvas.context;
        this.loop = new Loop({maxFPS: 60});

        GLOBALS.GGO = this;
        requestAnimationFrame(this.main.bind(this));
    }
    // ### REGULAR FXS ###
    getCanvasWidth() {
        return this.canvas.w;
    }
    getCanvasHeight() {
        return this.canvas.h;
    }
    // --- CALCULATE ---
    update(delta){
        this.bx += this.vx * delta;
        if(this.bx >= 200){
            this.vx = -0.08;
        }
        if(this.bx <= 50){
            this.vx = 0.08;
        }
    }
    // --- DRAW ---
    draw(){
        document.querySelector('#gameFps').textContent = `${Math.round(this.loop.fps)} fps`;

    }

    // --- DEATH SPIRAL EMERGENCY ----
    panic() {
        this.loop.delta = 0;
        console.log('Panic!');
    }

    // !!! GAME LOOP 1!!
    main(timestamp){

        if (timestamp < this.loop.lastFrameTimeMs + (1000 / this.loop.maxFPS)) {
            requestAnimationFrame(this.main.bind(this));
            return;
        }
        this.loop.delta = timestamp - this.loop.lastFrameTimeMs;
        this.loop.lastFrameTimeMs = timestamp;

        if(timestamp > this.loop.lastFpsUpdate + 1000) {
            this.loop.fps = 0.25 * this.loop.framesThisSecond + 0.75 * this.loop.fps;
    
            this.loop.lastFpsUpdate = timestamp;
            this.loop.framesThisSecond = 0;
        }
        this.loop.framesThisSecond++;

        let numUpdateSteps = 0;
        while(this.loop.delta >= this.loop.timestep){
            this.update(this.loop.timestep);
            this.loop.delta -= this.loop.timestep;
            if(numUpdateSteps++ >= 240){
                this.panic();
                break;
            }
        }

        this.draw();
        requestAnimationFrame(this.main.bind(this));
    }
}