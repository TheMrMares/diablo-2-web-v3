import GLOBAL from './../globals/globals';

export default class Canvas {
    constructor(canvas){

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;

        GLOBAL.CANVAS = this; //bind this canvas context to global
    }
}