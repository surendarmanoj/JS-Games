const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
function jump(){
    if(dino.classList != "jump"){
        dino.classList.add("jump");
    setTimeout(function(){
        dino.classList.remove("jump");
    },300);
    }
    
} 
let isalive = setInterval(() => {
    //  dino position
    let dinotop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    // cactus position
    let cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
    // detect collision
    if(cactusleft < 50 && cactusleft > 0 && dinotop >= 140)
    {
        
        alert("Game over")
    }

}, 10);

document.addEventListener("keydown",function(e)
{
    jump();
})