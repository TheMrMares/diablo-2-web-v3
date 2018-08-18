import GLOBAL from './../globals/globals';

export default class Canvas {
    constructor(canvas){

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.w = this.canvas.width;
        this.h = this.canvas.height;

        GLOBAL.CANVAS = this; //bind this canvas context to global
    }
}