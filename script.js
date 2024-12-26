const reStart = document.getElementById("restart");
const cards = [...document.querySelectorAll('.card')]
let card1= null;
let card2= null;
let timer = null;
let score = 0;
let matchedCards = [];
let imageArray = [
    "img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpg",
    "img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpg",
];



reStart.addEventListener("click", function ()
{
shuffleCards()
    matchedCards = [];
for (const card of cards) {
    card.classList.remove('flip');
    card.addEventListener('click', cardView)
}
   clearInterval(timer);
   timeSelect();
   
});
document.getElementById("score").innerHTML = "Antal: " + (matchedCards.length/2)


//funktioner 
function cardView() {
    console.log("tryck");
    if (card1 === this)
    {
        return;
    }
    if (matchedCards.includes(this))
    {
        return;
    }
    this.classList.toggle("flip")
    if (card1 === null)
    { 
        card1 = this;
    }
    else {
        card2= this;
        
    }
    matchedcards()
    console.log(card1);
    console.log(card2);
}

function shuffleCards() {
    const shuffledCards = imageArray.sort(() => Math.random() - 0.5);
    const cardDiv = document.querySelectorAll(".back-view img");
    cardDiv.forEach((card, i)=>
    {
        card.src = shuffledCards[i];
    });
}
function timeSelect()
{
    let time = document.getElementById("time").value;
    
     timer = setInterval(function() {
        document.getElementById("remainingtime").innerHTML = "Återstående tid: " + time + " Sekunder";
        time--;
         if (matchedCards.length === 12)
         {
             clearInterval(timer);
             document.getElementById("remainingtime").innerHTML = "DU VANN!";
             return;
         }

         if (time < 0) {
            for (const card of cards) {
                card.classList.remove('flip');
                card.removeEventListener("click", cardView);
                document.getElementById("remainingtime").innerHTML = "Tiden är slut, försök igen!";
            }
           

            clearInterval(timer);
            
        }
    }, 1000);
}
function matchedcards() {

        if (card1.querySelector(".back-view img").src === card2.querySelector(".back-view img").src) {
            console.log("korten matchar");
            card1.removeEventListener("click", cardView);
            card2.removeEventListener("click", cardView);
            matchedCards.push(card1);
            matchedCards.push(card2);
            card1 = null;
            card2 = null;
            

        } else {
            for (const card of cards) {

                card.removeEventListener("click", cardView);
            }
            setTimeout(() => {

                card1.classList.remove('flip');
                card2.classList.remove('flip');
                for (const card of cards) {

                    card.addEventListener("click", cardView);
                    card1 = null;
                    card2 = null;
                }

            }, 500);


        }
    document.getElementById("score").innerHTML = "Antal: " + (matchedCards.length/2)
}
