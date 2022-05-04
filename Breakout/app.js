const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockheight = 20;
const balldiameter = 20;

const userStart = [230,10];
let currentPosition = userStart;
const gridWidth = 560;
const gridheight = 300;
const ballstart = [270,30];
let ballCurrentPosition = ballstart;
let timerid;
let score = 0;
let xDirection = 2;
let yDirection = 2;

//  create block
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis+blockWidth,yAxis];
        this.topLeft = [xAxis,yAxis+blockheight];
        this.topRight = [xAxis+blockWidth,yAxis+blockheight];
    }
}

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
    
]


//  draw block
function addBlock(){

    for(let i=0; i<blocks.length; i++)
    {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0]+'px';
        block.style.bottom = blocks[i].bottomLeft[1]+'px';
        grid.appendChild(block);
    }
    
    
}
addBlock();

const user = document.createElement('div');
user.classList.add('user');
// user.style.left = currentPosition[0]+'px';
// user.style.bottom = currentPosition[1]+'px';
drawuser();
grid.appendChild(user);


function drawuser(){
    user.style.left = currentPosition[0]+'px';
user.style.bottom = currentPosition[1]+'px';
}

function drawBall(){
    ball.style.left = ballCurrentPosition[0]+'px';
ball.style.bottom = ballCurrentPosition[1]+'px';
}

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 20)
            {
                currentPosition[0] -= 20;
                drawuser();
            }
            break;
            
            case 'ArrowRight':
                if(currentPosition[0] < gridWidth - blockWidth)
            {
                currentPosition[0] += 10;
                drawuser();
            }
            break;
            
    }
}

document.addEventListener('keydown',moveUser);


// create ball

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();    
}

timerId = setInterval(moveBall,30);

//  check collisions
function checkForCollisions(){
    //  check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && (ballCurrentPosition[1]+ balldiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        )
        {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection();
            score ++;
            scoreDisplay.innerHTML = score;
        }
        
    }
    // check for wall collisions

    if(ballCurrentPosition[0] >= (gridWidth - balldiameter) || ballCurrentPosition[1] >= (gridheight-balldiameter) || ballCurrentPosition[0] <= 0)
    {
        changeDirection();
    }


    //  check user Collision
    if((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0]+blockWidth)&&(ballCurrentPosition[1]> currentPosition[1] && ballCurrentPosition[1] < currentPosition[1]+blockheight))
    {
        changeDirection();
    }
    // ? check for game over
    if(ballCurrentPosition[1] <= 0)
    {
        clearInterval(timerId);
        scoreDisplay.innerHTML = "Game Over";
        document.removeEventListener("keydown", moveUser );
    }
    if(score == 15)
    {
        alert("You win !!");
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser );


    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2)
    {
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2)
    {
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2)
    {
        yDirection = 2
        return
    }if(xDirection === -2 && yDirection === 2)
    {
        xDirection = 2
        return
    }
}