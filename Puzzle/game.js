let rows = 3
let cols = 3

let curTile
let otherTile

let turns = 0

let imageOrder = ["4","2","8","5","1","6","7","9","3"]
// let imageOrder = ["1","2","3","4","5","6","7","8","9"]

function loadImage(){
    for(let r=0; r < rows; r++)
    {
        for(let c=0; c<cols ; c++)
        {
            let tile = document.createElement('img');
            tile.id = r.toString()+"-"+c.toString()
            tile.src = imageOrder.shift() + ".jpg"

            tile.addEventListener('dragstart', dragStart)
            tile.addEventListener('dragover',dragOver)
            tile.addEventListener('dragenter',dragEnter)
            tile.addEventListener('dragleave',dragLeave)
            tile.addEventListener('drop',dragDrop)
            tile.addEventListener('dragend', dragEnd)

            document.getElementById('board').appendChild(tile)
        }
    }
}

loadImage()

function dragStart(){
    curTile = this
}
function dragOver(e){
    e.preventDefault()
}
function dragEnter(){
    e.preventDefault()
}
function dragLeave(){

}
function dragDrop(){
otherTile = this
}
function dragEnd(){
    if(!otherTile.src.includes('3.jpg'))
    {
        return
    }
    let curCoords = curTile.id.split("-")
    let r =parseInt(curCoords[0])
    let c =parseInt(curCoords[1])

    let otherCoords = otherTile.id.split("-")
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])


    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjescent = moveLeft || moveRight || moveUp || moveDown

    if(isAdjescent)
    {
        let curImg = curTile.src
    let otherImg = otherTile.src

    curTile.src = otherImg
    otherTile.src = curImg
    turns += 1

    document.getElementById('turns').innerText = turns

    }

    


}