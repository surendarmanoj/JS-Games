const timeleftdisplay = document.querySelector("#time-left")
const result = document.querySelector("#result")
const start_pause_btn = document.querySelector("#start-pause")

const squares = document.querySelectorAll(".grid div")
const logleft = document.querySelectorAll(".log-left")
const logright = document.querySelectorAll(".log-right")
const carleft = document.querySelectorAll(".car-left")
const carright = document.querySelectorAll(".car-right")
let currentindex = 76
const width = 9
let timerid
let checkoutcome_timer
let currenttime = 20

function moveFrog(e){
    squares[currentindex].classList.remove('frog')
    switch(e.key){
        case 'ArrowLeft':
            if(currentindex % width !== 0)
            currentindex -=1
            break

        case 'ArrowRight':
            if(currentindex % width < width - 1)
            currentindex +=1
            break

        case 'ArrowUp':
            if(currentindex-width >=0)
            currentindex -= width
            break

        case 'ArrowDown':
            if(currentindex + width < width * width)
            currentindex += width

            break

    }
    squares[currentindex].classList.add("frog")
}

document.addEventListener("keyup", moveFrog)

function automoveelements(){
    currenttime --
    timeleftdisplay.textContent = currenttime
    logleft.forEach(logleft => moveLogLeft(logleft))
    logright.forEach(logright => moveLogRight(logright))
    carleft.forEach(carleft => movecarLeft(carleft))
    carright.forEach(carright => movecarRight(carright))
}

function moveLogLeft(logleft){
    switch(true){
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1')
            logleft.classList.add('l2')
            break
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2')
            logleft.classList.add('l3')
            break
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3')
            logleft.classList.add('l4')
            break
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4')
            logleft.classList.add('l5')
            break
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5')
            logleft.classList.add('l1')
            break
    }
}


function moveLogRight(logright){
    switch(true){
        case logright.classList.contains('l1'):
            logright.classList.remove('l1')
            logright.classList.add('l5')
            break
        case logright.classList.contains('l2'):
            logright.classList.remove('l2')
            logright.classList.add('l1')
            break
        case logright.classList.contains('l3'):
            logright.classList.remove('l3')
            logright.classList.add('l2')
            break
        case logright.classList.contains('l4'):
            logright.classList.remove('l4')
            logright.classList.add('l3')
            break
        case logright.classList.contains('l5'):
            logright.classList.remove('l5')
            logright.classList.add('l4')
            break
    }
}

function movecarLeft(carleft){
    switch(true){
        case carleft.classList.contains('c1'):
            carleft.classList.remove('c1')
            carleft.classList.add('c2')
            break
        case carleft.classList.contains('c2'):
            carleft.classList.remove('c2')
            carleft.classList.add('c3')
            break
        case carleft.classList.contains('c3'):
            carleft.classList.remove('c3')
            carleft.classList.add('c1')
            break
        
    }
}

function movecarRight(carright){
    switch(true){
        case carright.classList.contains('c1'):
            carright.classList.remove('c1')
            carright.classList.add('c3')
            break
        case carright.classList.contains('c2'):
            carright.classList.remove('c2')
            carright.classList.add('c1')
            break
        case carright.classList.contains('c3'):
            carright.classList.remove('c3')
            carright.classList.add('c2')
            break
        
    }
}

function lose(){
    if(squares[currentindex].classList.contains("c1")||squares[currentindex].classList.contains("l4")||squares[currentindex].classList.contains("l5")||currenttime <= 0)
    {
        result.textContent = "you Loose !!"
        clearInterval(timerid)
        clearInterval(checkoutcome_timer)
        squares[currentindex].classList.remove('frog')
        document.removeEventListener("keyup", moveFrog)
    }
}

function win(){
    if(squares[currentindex].classList.contains("ending-block"))
    {
        clearInterval(timerid)
        clearInterval(checkoutcome_timer)
        result.textContent = "You Win"
        document.removeEventListener('keyup', moveFrog)
    }
}

function checkOutcome(){
    lose()
    win()
}

timerid = setInterval(automoveelements, 1000)
checkoutcome_timer = setInterval(checkOutcome, 50)


start_pause_btn.addEventListener('click',() => {
    if(timerid){
        clearInterval(timerid)
        clearInterval(checkoutcome_timer)
        timerid = null
        checkoutcome_timer = null
        document.removeEventListener("keyup", moveFrog)
    }
    else{
        timerid = setInterval(automoveelements, 1000)
        checkoutcome_timer = setInterval(checkOutcome, 50)
        document.addEventListener("keyup", moveFrog)
    }
})
