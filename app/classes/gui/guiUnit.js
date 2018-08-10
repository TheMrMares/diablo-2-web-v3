import GLOBALS from './../../globals/globals';

export default class guiUnit {
    constructor(x,y,w,h,visible, background) {

        this.background = background;
        this.drawground = GLOBALS.CTX;
        this.w = w;
        this.h = h;
        this.visible = visible;
        
        if(typeof(x) === 'object'){
            this.x1 = (GLOBALS.GGO.getCanvasWidth()/2 - this.w/2) + x.m;
        } else if(typeof(x) === 'number'){
            this.x1 = x;
        } 
        if(typeof(y) === 'object'){
            this.y1 = (GLOBALS.GGO.getCanvasWidth()/2 - this.h/2) + y.m;
        } else if(typeof(y) === 'number'){
            this.y1 = y;
        }

        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
    }
    get(fieldname){
        return this[fieldname];
    }
    set(fieldname, value){
        this[fieldname] = value;
    }
    refreshCoordinates(){
        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
    }
    
}