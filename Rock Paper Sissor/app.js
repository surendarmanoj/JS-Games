const botchoiceview = document.getElementById("bot_choice");
const playerchoiceview = document.getElementById("player_choice");
const resultview = document.getElementById("result");

const possiblechoices = document.querySelectorAll('button');

possiblechoices.forEach(possiblechoices => possiblechoices.addEventListener('click',(e) => {
    userchoice = e.target.id;
    playerchoiceview.innerHTML = userchoice;
    botchoicegenerator();
    results();

}))

function botchoicegenerator(){
    const RandomNumber = Math.floor(Math.random()*3)+1;
    if(RandomNumber === 1)
    {
        botchoosen = "Rock";
    }
    if(RandomNumber === 2)
    {
        botchoosen = "Paper";
    }
    if(RandomNumber === 3)
    {
        botchoosen = "Sissors";
    }
    botchoiceview.innerHTML = botchoosen;
    console.log(RandomNumber);
}


function results(){
    if(botchoosen === userchoice)
    {
        result = "Hey it's a draw. Please try again";
    }
    if(botchoosen === "Rock" && userchoice === "Paper")
    {
        result = "User Wins";
    }
    if(botchoosen === "Paper" && userchoice === "Sissors")
    {
        result = "User Wins";
    }
    if(botchoosen === "Sissors" && userchoice === "Rock")
    {
        result = "User Wins";
    }


    if(botchoosen === "Paper" && userchoice === "Rock")
    {
        result = "Bot Wins";
    }
    if(botchoosen === "Sissors" && userchoice === "Paper")
    {
        result = "Bot Wins";
    }
    if(botchoosen === "Rock" && userchoice === "Sissors")
    {
        result = "Bot Wins";
    }

    resultview.innerHTML=result;
    
}