let dealerSum = 0
let yourSum = 0
let dealerAceCount = 0
let yourAceCount = 0
let hidden
let deck
let canHit = true

function buildDeck(){
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
let types = ["C","D","H","S"]
deck = []

for(let i=0; i< types.length; i++)
{
    for(let j=0; j< values.length; j++)
    {
        deck.push(values[j]+"-"+types[i])
    }
}
console.log(deck);

}

function shuffleDeck(){
    for(let k=0; k<deck.length; k++)
    {
        let l = Math.floor(Math.random() * deck.length)
        let temp = deck[k]
        deck[k] = deck[l]
        deck[l] = temp
    }
console.log(deck);

}
function startGame()
{
    hidden = deck.pop()
    dealerSum += getValue(hidden)
    dealerAceCount += checkAce(hidden)
    // console.log(dealerSum)
    // console.log(hidden)
    while(dealerSum < 17){
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/"+card+".png"
        dealerSum += getValue(card)
        dealerAceCount += checkAce(card)
        document.getElementById('dealer-cards').append(cardImg)

    }
    console.log(dealerSum);
    console.log(hidden)
    for(let m=0; m< 2; m++){
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/"+card+".png"
        yourSum += getValue(card)
        yourAceCount += checkAce(card)
        document.getElementById('your-cards').append(cardImg)
    }
    console.log(yourSum)
    document.getElementById('hit').addEventListener('click', hit)
    document.getElementById('stay').addEventListener('click', stay)
}

function getValue(card)
{
    let data = card.split("-")
    let c_val = data[0]
    if(isNaN(c_val))
    {
        if(c_val =="A")
        {
            return 11
        }
        return 10
    }
    return parseInt(c_val)
}

function checkAce(card){
    if(card[0]=="A")
    {
        return 1
    }
    return 0
}

function hit(){
    if(!canHit)
    {
        return
    }
    let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/"+card+".png"
        yourSum += getValue(card)
        yourAceCount += checkAce(card)
        document.getElementById('your-cards').append(cardImg)

        if(reduceAce(yourSum, yourAceCount) > 21)
        {
            canHit = false

        }
}

function stay()
{
    dealerSum = reduceAce(dealerSum, dealerAceCount)
    yourSum = reduceAce(yourSum, yourAceCount)

    canHit = false
    document.getElementById('hidden').src = "./cards/"+hidden+".png"
    if(yourSum > 21)
    {
        msg = "You Lose!!!"
    }
    else if(dealerSum > 21){
        msg = "You Win!!!"
    }
    else if(yourSum == dealerSum)
    {
        msg = "Tie !!!"
    }
    else if(yourSum > dealerSum)
    {
        msg = "You Win!!!"
    }
    else if(yourSum < dealerSum)
    {
        msg = "You Lose!!!"
    }

    document.getElementById("results").innerText = msg
    document.getElementById("dealer-sum").innerText = dealerSum
    document.getElementById("your-sum").innerText = yourSum

}
function reduceAce(playerSum, playerAceCount)
{
    while(playerSum > 21 && playerAceCount > 0)
    {
        playerSum -= 10
        playerAceCount -= 1
    }
    return playerSum
}

buildDeck()
shuffleDeck()
startGame()