import GLOBAL from './../globals/globals';

import Loop from './Loop';
import Button from './gui/Button';
import Button from './gui/View';
import View from './gui/View';

export default class Game {
    // ### CONSTRUCTOR ###
    constructor({canvas, mode = 0}){

        this.canvas = canvas;
        this.drawground = canvas.context;
        this.loop = new Loop({maxFPS: 60});
        this.mode = mode;

        this.mx = null;
        this.my = null;

        this.views = [];

        document.addEventListener('mousemove', this.mouseMove.bind(this));
        document.addEventListener('click', this.mouseClick.bind(this));
        
        GLOBAL.GAME = this; //bind this for global game object
        requestAnimationFrame(this.main.bind(this)); //start game loop
    }
    // ### REGULAR FXS ###
    getCanvasWidth() {
        return this.canvas.w;
    }
    getCanvasHeight() {
        return this.canvas.h;
    }
    // ### EVENTS ###
    mouseMove(evt){
        this.mx = evt.clientX;
        this.my = evt.clientY;
    }
    mouseClick(evt){
        console.log(`X: ${evt.clientX} Y: ${evt.clientY}`);
    }
    // ### RELATED TO GAME LOOP ###
    update(delta){
        this.bx += this.vx * delta;
        if(this.bx >= 200){
            this.vx = -0.08;
        }
        if(this.bx <= 50){
            this.vx = 0.08;
        }
    }
    draw(){
        document.querySelector('#gameFps').textContent = `${Math.round(this.loop.fps)} fps`;
    }
    panic() {
        this.loop.delta = 0;
        console.log('Panic!');
    }
    // ### GAME LOOP ###
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