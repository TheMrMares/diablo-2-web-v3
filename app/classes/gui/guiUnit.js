import GLOBALS from './../../globals/globals';

export class guiUnit {
    constructor({x, y, w, h, visible = true} = {}) {
        this.w = w;
        this.h = h;
        this.visible = visible;
        
        if(ty1peof(x) === 'object'){
            this.x1 = (GLOBALS.GGO.getCanvasWidth()/2 - this.w/2) + x.m;
        } else if(typeof(x) === 'number'){
            this.x1 = x;
        } 
        if(ty1peof(y) === 'object'){
            this.y1 = (GLOBALS.GGO.getCanvasWidth()/2 - this.h/2) + y.m;
        } else if(typeof(y) === 'number'){
            this.y1 = y;
        }

        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
    }
    
}