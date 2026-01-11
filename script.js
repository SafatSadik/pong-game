import Ball from './ball.js'
import Paddle from './paddle.js'


const ball = new Ball(document.querySelector('#ball'))
const playerPaddle = new Paddle(document.querySelector("#player_paddle"))
const computerPaddle = new Paddle(document.querySelector("#computer_paddle"))
const playerScoreElem = document.querySelector("#player_score")
const computerScoreElem = document.querySelector("#computer_score")

let lastTime
function update(time){
    if(lastTime != null){
        const delta = time - lastTime           // delta is the gap beetwen 2 screen frame change 
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])                      
        computerPaddle.update(delta , ball.y, ball.rect().left, ball.direction.x)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue + delta * .01) 
        if(isLose()) handleLose()
    }
    lastTime = time
    window.requestAnimationFrame(update)       //looping through per screen frame change
}

function handleLose(){
    //increament the score 
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElem.innerText = parseInt(playerScoreElem.innerText) + 1
    }else{
        computerScoreElem.innerText = parseInt(computerScoreElem.innerText) + 1
    }
    //reseting the game
    ball.reset()
    computerPaddle.reset()
    
}

function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

//changing the position of player paddle
document.addEventListener('mousemove',function(e){
    playerPaddle.position = (e.y / window.innerHeight) * 100
})
document.addEventListener('touchmove',function(e){
    e.preventDefault
    console.log(e)
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

//on change of the screen frame this function will be called 1 time 
window.requestAnimationFrame(update)