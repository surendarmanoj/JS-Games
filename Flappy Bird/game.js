const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

let birdleft = 220
let birdBottom = 100
let gravity = 2
let timerId
let isGameOver = false
let gap = 430

function startGame(){
    birdBottom-= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdleft + 'px'
}

timerId = setInterval(startGame,20)

function control(e){
    if(e.keyCode === 32) 
    {
        jump()
    }
}

function jump(){
    if(birdBottom < 480 )
    {
        birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
    }
    
}
document.addEventListener('keyup', control)
// document.addEventListener('keyup', jump)


function generateObstacle(){
    let obstacleleft = 500
    let ransomHeight = Math.random() * 120
    let obstacleBottom = ransomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if(!isGameOver)
    {
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')

    } 
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)

    obstacle.style.left = obstacleleft + 'px'
    topObstacle.style.left = obstacleleft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap+ 'px'

    function moveObstacle(){
        obstacleleft -= 2
    obstacle.style.left = obstacleleft + 'px'
    topObstacle.style.left = obstacleleft + 'px'

    if(obstacleleft === -60)
    {
        clearInterval(obstacleTimerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
    }
    if(birdBottom === 0 || obstacleleft > 200 && obstacleleft < 280 && birdleft === 220 && (birdBottom < obstacleBottom + 153 ||birdBottom > obstacleBottom + gap - 200))
    {
        gameOver()
        clearInterval(obstacleTimerId)
    }

    }
    let obstacleTimerId = setInterval(moveObstacle, 20)
    if(!isGameOver) setTimeout(generateObstacle,3000)
}
generateObstacle()

function gameOver(){
    clearInterval(timerId)
    isGameOver = true
    document.removeEventListener('keyup',control)
}