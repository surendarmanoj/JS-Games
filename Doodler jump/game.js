const grid = document.querySelector('.grid')
const doodler = document.createElement('div')
const scoredisplay = document.querySelector(".score")
let doodlerLeftspace = 50;
let startpoint = 150
let doodlerbottomspace = startpoint
let isGameOver = false
let platformCount = 5
let platforms = []
let upTimerId
let downTimerId
let isJumping = true
isGoingLeft = false
isGoingRight = false
let lefttimerid
let righttimerid
let score = 0

function createDoodler(){
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerLeftspace = platforms[0].left
    doodler.style.left = doodlerLeftspace +'px'
    doodler.style.bottom = doodlerbottomspace + "px"
}

class Platform{
    constructor(plaformBottom){
        this.bottom = plaformBottom
        this.left = Math.random() * 315
        this.visual = document.createElement('div')

        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        grid.appendChild(visual)
    }
}


function createPlatform(){
    for(i=0; i<platformCount; i++)
    {
        let platformGap = 600/platformCount
        let plaformBottom = 100 + (i * platformGap)
        let newPlatform = new Platform(plaformBottom)
        platforms.push(newPlatform)
        console.log(platforms)
    }
}

function movePlatforms(){
    if(doodlerbottomspace > 125)
    {
        platforms.forEach(platform => {
            platform.bottom -= 4
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'

            if(platform.bottom < 10){
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                platforms.shift()
                let newPlatform = new Platform(600)
                platforms.push(newPlatform)
            }

        })
    }

}
function jump(){
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(function (){
        doodlerbottomspace += 20
        doodler.style.bottom = doodlerbottomspace+"px"
        if(doodlerbottomspace> startpoint + 200){
            fall()
        }
    },30)
}

function fall(){
    clearInterval(upTimerId)
    isJumping = false
    downTimerId = setInterval(function(){
        doodlerbottomspace -= 5
        doodler.style.bottom = doodlerbottomspace + 'px'
        if(doodlerbottomspace <= 0){
            GameOver()
        }
        platforms.forEach(Platform => {
            if((doodlerbottomspace >= Platform.bottom) &&
                (doodlerbottomspace <= Platform.bottom + 15) &&((doodlerLeftspace + 60 ) >= Platform.left) &&(doodlerLeftspace <= Platform.left + 85) && !isJumping)
                {
                    console.log("landed");
                score ++
                scoredisplay.innerHTML = score
                    startpoint = doodlerbottomspace
                    jump()
                }
        })
    },20)
}

function GameOver(){
    console.log('Game Over');
    isGameOver = true
    while(grid.firstChild){
        grid.removeChild(grid.firstChild)
    }
    clearInterval(lefttimerid)
    clearInterval(righttimerid)
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

function control(e){
    if(e.key === 'ArrowLeft')
    {
        moveleft()
    }
    else if(e.key === 'ArrowRight')
    {
        moveRight()
    }
    else if(e.key === "ArrowUp")
    {
        moveStraignt()
    }
}

function moveStraignt(){
    isGoingLeft = false
    isGoingRight = false
    clearInterval(righttimerid)
    clearInterval(lefttimerid)
}

function moveleft(){
    if(isGoingRight){
        clearInterval(righttimerid)
        isGoingRight = false
    }
    isGoingLeft = true
    lefttimerid = setInterval(function() {
        if(doodlerLeftspace >= 0)
        {
            doodlerLeftspace -= 5
        doodler.style.left = doodlerLeftspace+'px'
        }
        else{
            moveRight()
        }
        
    },20)
}

function moveRight()
{
    if(isGoingLeft){
        clearInterval(lefttimerid)
        isGoingLeft = false
    }
    isGoingRight = true
    righttimerid = setInterval(function(){
        if(doodlerLeftspace <= 340)
        {
            doodlerLeftspace += 5
            doodler.style.left = doodlerLeftspace
        }
        else{
            moveleft()
        }
    },20)
}

function start(){
    if(!isGameOver)
    {
        createPlatform()
        createDoodler()
        setInterval(movePlatforms, 300)
        jump()
        document.addEventListener('keyup', control)
    }
}
start()
