const SPEED = 0.04
const randomValue =  Math.random() * 100
export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem
        this.reset()
    }
    

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }
    set position(value){
        this.paddleElem.style.setProperty("--position", value)
    }
    update(delta, ballHeight, ballLeft, ballDirection){
        if(ballLeft >= window.innerWidth/1.5 && ballDirection >= 0){
        this.position += delta * SPEED * (ballHeight - this.position)
        }
    }
    reset(){
        this.position = 50
    }
    rect(){
        return this.paddleElem.getBoundingClientRect()
    }

}

