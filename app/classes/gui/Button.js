import guiUnit from './guiUnit';

export default class Button extends guiUnit {
    constructor({x, y, w, h, visible = true, background, onClick = null, onMouseenter = null, onMouseleave = null}){
        super(x,y,w,h,visible, background);
        
        this.onClick = onClick;
        this.onMouseenter = onMouseenter;
        this.onMouseleave = onmouseleave;
    }
    draw(){
        let rt = [
            this.drawground.drawImage(this.background, this.x1, this.y1, this.w, this.h)
        ];
        return rt;
    }
}