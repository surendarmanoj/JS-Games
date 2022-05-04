const grid = document.querySelector(".grid")
const result = document.querySelector(".result")

let currentshooterindex = 202
const width = 15
let direction = 1;
let timerid
let movingRight = true

let aliensRemoved = []
results = 0

for(let i=1; i< 225; i++)
{
    const square = document.createElement("div")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))

const alieninvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i=0; i< alieninvaders.length; i++)
    {
        if(!aliensRemoved.includes(i))
        {
        squares[alieninvaders[i]].classList.add('invader')
        }
    }
}

draw()
squares[currentshooterindex].classList.add('shooter')

function moveShooter(e){
    squares[currentshooterindex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if(currentshooterindex % width !== 0)
            
                currentshooterindex -= 1
                break
            
            
        
        case 'ArrowRight':
            if((currentshooterindex % width) < width -1)

            currentshooterindex += 1
            break
    }
    squares[currentshooterindex].classList.add('shooter')
}

function remove(){
    for(let i=0; i< alieninvaders.length; i++)
    {
        squares[alieninvaders[i]].classList.remove('invader')
    }
}

document.addEventListener('keydown',moveShooter)

function moveinvaders(){
    const leftedge = alieninvaders[0] % width ===0
    const rightedge = alieninvaders[alieninvaders.length-1] %width === width - 1
    remove()
if(rightedge && movingRight)
{
    for(let i = 0; i < alieninvaders.length; i++)
    {
        
        alieninvaders[i] += width -1
        direction = -1
        movingRight = false
    }

}

if(leftedge && !movingRight)
{
    for(let i = 0; i < alieninvaders.length; i++)
    {
        
        alieninvaders[i] += width
        direction = 1
        movingRight = true
    }

}

for(let i=0; i< alieninvaders.length; i++)
{
    alieninvaders[i] += direction

}
    draw()
    if(squares[currentshooterindex].classList.contains('invader','shooter'))
    {
        result.innerHTML = "Game Over !!"
        clearInterval(timerid)
    }
    if(aliensRemoved.length === alieninvaders.length)
    {
        result.innerHTML = "You Win"
        clearInterval(timerid)
    }
}

timerid = setInterval(moveinvaders, 500)

function shoot(e){
    let laserid
    let currentlasetindex = currentshooterindex

    function movelaser(){
        squares[currentlasetindex].classList.remove('laser')
        currentlasetindex -= width
        squares[currentlasetindex].classList.add('laser')
        if(squares[currentlasetindex].classList.contains('invader'))
        {
            squares[currentlasetindex].classList.remove('laser')
            squares[currentlasetindex].classList.add('boom')
            setTimeout(()=> squares[currentlasetindex].classList.remove('boom'),300)
            clearInterval(laserid)

            const alienhit = alieninvaders.indexOf(currentlasetindex)
            aliensRemoved.push(alienhit)
            results++
            result.innerHTML = results
        }

    }
    switch(e.key){
        case'ArrowUp':
        laserid = setInterval(movelaser,100)
    }
}

document.addEventListener('keyup', shoot)