const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const time_left = document.querySelector("#time-left");
const score = document.querySelector('#score');

let result = 0;
let hitposition;
let currentTime = 10;
let timerId = null;


function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomPosition = squares[Math.floor(Math.random()*9)];
    randomPosition.classList.add('mole');

    hitposition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitposition)
        {
            console.log('hit');
            result ++;
            score.textContent = result;
            hitposition = null;
        }
    })
})

function moveMole(){
    let timerId =null;
    timerId = setInterval(randomSquare,1000);
}

moveMole();


function countDown(){
    currentTime -- ;
    time_left.textContent =  "Time Left : " + currentTime;

    if(currentTime == 0){
        clearInterval(countDownTimerId);
        alert('Game Over. Your Final score is '+result);
        
    }

}

let countDownTimerId = setInterval(countDown,1000);