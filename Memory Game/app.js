const griddisplay = document.querySelector('#grid');
const resultdisplay = document.querySelector("#score")

const cardArray = [
    {
        name:"ace_heart",
        img:"images/ace_heart.png"
    },{
        name:"ace_diamond",
        img:"images/ace_diamond.jpeg"
    },{
        name:"ace_spade",
        img:"images/ace_spade.webp"
    },{
        name:"k_diamond",
        img:"images/k_diamond.jpeg"
    },{
        name:"k_heart",
        img:"images/k_heart.png"
    },{
        name:"k_spade",
        img:"images/k_spade.webp"
    },
    {
        name:"ace_heart",
        img:"images/ace_heart.png"
    },{
        name:"ace_diamond",
        img:"images/ace_diamond.jpeg"
    },{
        name:"ace_spade",
        img:"images/ace_spade.webp"
    },{
        name:"k_diamond",
        img:"images/k_diamond.jpeg"
    },{
        name:"k_heart",
        img:"images/k_heart.png"
    },{
        name:"k_spade",
        img:"images/k_spade.webp"
    },
]

cardArray.sort(() => 0.5 - Math.random())

generateboard();

function generateboard(){
    for(let i=0; i<cardArray.length; i++)
    {
        const card = document.createElement('img');
        card.setAttribute('src','images/bg.jpeg');
        card.setAttribute('data-id',i);
        card.addEventListener('click',flipcard);
        griddisplay.appendChild(card);
        
    }
    console.log(cardArray);
}

card_chosen = [];
card_chosen_id = [];

function flipcard(){
    const card_id = this.getAttribute("data-id");
    this.setAttribute('src',cardArray[card_id].img);
    card_chosen_id.push(card_id);
    card_chosen.push(cardArray[card_id].name);

    if(card_chosen.length === 2)
    {
        setTimeout(checkmatch,500);
    }
    
}

cardsWon = []
function checkmatch(){
    const cards = document.querySelectorAll('img');

    if(card_chosen[0] == card_chosen[1])
    {
        alert("You have found a match");
        cards[card_chosen_id[0]].setAttribute('src','images/done.png');
        cards[card_chosen_id[1]].setAttribute('src','images/done.png');
        cards[card_chosen_id[0]].removeEventListener('click',flipcard);
        cards[card_chosen_id[1]].removeEventListener('click',flipcard);
        cardsWon.push(card_chosen);
        resultdisplay.innerHTML = cardsWon.length;
    }
    else{
        cards[card_chosen_id[0]].setAttribute('src','images/bg.jpeg')
        cards[card_chosen_id[1]].setAttribute('src','images/bg.jpeg')
    }

    card_chosen = [];
    card_chosen_id = [];

    if(cardsWon.length == cardArray.length/2)
    {
        resultdisplay.innerHTML = "Cogradulations.. You have successfully completed the game"
    }

}