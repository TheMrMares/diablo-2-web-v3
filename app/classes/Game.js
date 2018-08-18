import GLOBAL from './../globals/globals';
import {createImage} from './../globals/functions';

import sampleButtonURL from './../textures/gui/menu-button.png';

import Loop from './Loop';
import Button from './gui/Button';
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
        this.activeView = 0;

        document.addEventListener('mousemove', this.mouseMove.bind(this));
        document.addEventListener('click', this.mouseClick.bind(this));
        
        GLOBAL.GAME = this; //bind this for global game object
        this.constructed();
    }
    constructed(){

        this.views.push(
            new View({
                buttons: [new Button({x: {m: 0}, y: {m: 0}, w: 200, h: 50, background: createImage(sampleButtonURL)})]
            })
        );

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

    }
    draw(){
        document.querySelector('#gameFps').textContent = `${Math.round(this.loop.fps)} fps`;
        this.drawground.fillStyle = 'black';
        this.drawground.fillRect(0,0,this.canvas.w,this.canvas.h);

        this.views[this.activeView].buttons.forEach((item , index) => {
            item.draw();
        });
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