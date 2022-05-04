let candies = ["Blue","Orange","Green","Yellow","Red","Purple"]
let board = []
let row = 9
let cols = 9
let score = 0
let curTile
let otherTile

function startGame()
{

    for(let r=0; r<row; r++)
    {
        let row_vals = []
        for(let c= 0; c<cols; c++)
        {
            let tile = document.createElement('img')
            tile.id = r.toString()+"-"+c.toString()
             tile.src = "./images/"+randomCandy()+".png"

             tile.addEventListener('dragstart', dragStart)
             tile.addEventListener('dragover', dragOver)
             tile.addEventListener('dragenter', dragEnter)
             tile.addEventListener('dragleave', dragLeave)
             tile.addEventListener('dragend', dragEnd)
             tile.addEventListener('drop', dragDrop)


             document.getElementById('board').appendChild(tile)
             row_vals.push(tile)
        }
        board.push(row_vals)

    }
    console.log(board)
}

function randomCandy()
{
    return candies[Math.floor(Math.random() * candies.length)]
}

startGame()

function dragStart()
{
    curTile = this
}
function dragOver(e){
    e.preventDefault()
}
function dragEnter(e)
{
    e.preventDefault()
}
function dragLeave()
{

}
function dragDrop()
{
    otherTile = this
}
function dragEnd()
{
    if(curTile.src.includes("blank") || otherTile.src.includes('blank'))
    {
        return
    }

    let currCoords = curTile.id.split("-")
    let r = parseInt(currCoords[0])
    let c = parseInt(currCoords[1])

    let otherCoords = otherTile.id.split("-")
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])
    let moveLeft = c2 == c-1 && r == r2
    let moveRight = c2 == c+1 && r == r2
    let moveUp = r2 == r-1 && c == c2
    let moveDown = r2 == r+1 && c == c2

    let isAdjescent = moveLeft ||moveRight || moveUp || moveDown

    if(isAdjescent)
    {
        let currImg = curTile.src
        let otherImg = otherTile.src
        curTile.src = otherImg
        otherTile.src = currImg

        let validMove = checkValid()
        if(!validMove)
        {
            let currImg = curTile.src
        let otherImg = otherTile.src
        curTile.src = otherImg
        otherTile.src = currImg
        }
    }
    
}

function crushCandy()
{
     crushThree()
}
timerId = setInterval(crushCandy,100)
function crushThree()
{
    for(let r=0; r<row; r++)
    {
        for(let c=0; c<cols-2; c++)
        {
            let candy1 = board[r][c]
            let candy2 = board[r][c+1]
            let candy3 = board[r][c+2]
            if(candy1.src == candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank') )
            {
                candy1.src = "./images/blank.png"
                candy2.src = "./images/blank.png"
                candy3.src = "./images/blank.png"
                score += 1
            }
        }
    }

    for(let c=0; c<cols; c++)
    {
        for(let r=0; r<row-2; r++)
        {
            let candy1 = board[r][c]
            let candy2 = board[r+1][c]
            let candy3 = board[r+2][c]
            if(candy1.src == candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank') )
            {
                candy1.src = "./images/blank.png"
                candy2.src = "./images/blank.png"
                candy3.src = "./images/blank.png"
                score += 1
            }
        }
    }

    document.getElementById("score").innerText = score
    
}

function checkValid()
{
    for(let r=0; r<row; r++)
    {
        for(let c=0; c<cols-2; c++)
        {
            let candy1 = board[r][c]
            let candy2 = board[r][c+1]
            let candy3 = board[r][c+2]
            if(candy1.src == candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank') )
            {
               return true
            }
        }
    }

    for(let c=0; c<cols; c++)
    {
        for(let r=0; r<row-2; r++)
        {
            let candy1 = board[r][c]
            let candy2 = board[r+1][c]
            let candy3 = board[r+2][c]
            if(candy1.src == candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank') )
            {
                return true
            }
        }
    }

    return false

}

function slideCandy(){
    for(let c=0; c< cols; c++)
    {
        let ind = row -1;
        for(let r=cols-1; r>=0; r--)
        {
            if(!board[r][c].src.includes("blank"))
            {
                board[ind][c].src = board[r][c].src
                ind -= 1
            }
        }
        for(r=ind; r>=0; r--){
            board[r][c].src = "./images/blank.png"
        }
    }
}
candySlideId = setInterval(slideCandy,100)

function generateCandy()
{
    for(let c=0; c<cols; c++)
    {
        if(board[0][c].src.includes('blank'))
        {
            board[0][c].src = "./images/"+randomCandy()+".png"
        }
    }
}
generateCandytimerID = setInterval(generateCandy,100)
