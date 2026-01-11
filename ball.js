const INITIAL_VELOCITY = 0.03
const VELOCITY_INCREASE = 0.00001

export default class Ball{
    constructor(ballElem){
    this.ballElem = ballElem
    this.reset()
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }
    set x(value){
        this.ballElem.style.setProperty("--x", value)
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }
    set y(value){
        this.ballElem.style.setProperty("--y",value)
    }
    
    rect(){
        return this.ballElem.getBoundingClientRect()
    }
    
    reset(){
        this.x = 50
        this.y = 50
        this.direction = {x : 0}
        while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9){
            const heading = randomNumberBeetwen(0, 2 * Math.PI)
            this.direction = {x : Math.cos(heading), y : Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY

    }

    update(delta , paddleRects){
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        const rect = this.rect()
        this.velocity += VELOCITY_INCREASE * delta

        if(rect.bottom >= window.innerHeight || rect.top <= 0){         // bouncing in the top and bottom of the screen 
            this.direction.y *= -1
        }

        // if(rect.right >= window.innerWidth || rect.left <= 0){       // bouncing in the left and right of the screen 
        //     this.direction.x *= -1
        // }

        if(paddleRects.some(r => isCollision(r, rect))){                //changing the direction after collision with the paddles
            this.direction.x *= -1
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue + 10 )
        }
    }
    

}
function isCollision(rect1 , rect2){
    return (
        rect1.right >= rect2.left &&
        rect1.left <= rect2.right && 
        rect1.top <= rect2.bottom && 
        rect1.bottom >= rect2.top
        )
}

function randomNumberBeetwen(min,max){
    return Math.random() * (max - min) + min;

}

