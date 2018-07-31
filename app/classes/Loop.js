export class Loop {
    constructor({maxFPS = 60} = {}){
        this.maxFPS = maxFPS;
        this.fps = this.maxFPS;
        this.lastFrameTimeMs = 0;
        this.delta = 0;
        this.timestep = 1000 / this.maxFPS;
        this.framesThisSecond = 0;
        this.lastFpsUpdate = 0;
    }
    setDelta(value) {
        this.delta = value;
    }
    getDelta(value){
        return this.delta;
    }
}