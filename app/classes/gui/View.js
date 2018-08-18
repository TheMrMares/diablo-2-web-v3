export default class View {
    constructor({name = `View-${Date.now()}`,buttons = [], inputs = [], images = [], visible = true} = {}){
        
        this.buttons = buttons;
        this.inputs = inputs;
        this.images = images;

        this.name = name;
        this.visible = visible;
    }
}