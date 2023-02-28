//Timer Setup
let seconds = 0;
let interval;
let timer = document.getElementById("time-counter");
// Start button setup
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", timerButton);
// URL API Setup
let url = "https://swapi.py4e.com/api/people/";
// Pictures array
let pictures = [
    { name: "Luke Skywalker", image: "https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-luke-skywalker-16x9-xl.jpg.adapt.crop1x1.320w.jpg" },
    { name: "C-3PO", image: "https://ids.si.edu/ids/deliveryService?id=NMAH-JN2017-01944-000001" },
    { name: "R2-D2", image: "https://i.insider.com/568d877ce6183e23008b75d9?width=1200&format=jpeg" },
    { name: "Darth Vader", image: "https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg" }
]
// Shuffle Cards
let cardsShuffled = [0, 1, 2, 3, 4, 5, 6, 7];
// shuffle(cardsShuffled);
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
// Card Flip
let cardInfo;
let cardInfoDouble = [];
getCardInfo(url);
async function getCardInfo(url) {
    await fetch(url)
        .then(response => response.json())
        .then(info => {
            cardInfo = info.results.slice(0, 4);
            for (let i = 0; i < cardInfo.length; i++) {
                let personName = cardInfo[i].name;
                let picture = pictures.filter(image => {
                    return image.name === personName;
                });
                // Set card info image in dictionary
                cardInfo[i].image = picture[0].image;
                // create element appendchild
                cardInfoDouble.push(cardInfo[i]);
                cardInfoDouble.push(cardInfo[i]);
            };
            // Log to console
            console.log(cardInfo);
            console.log(cardInfoDouble);
            shuffle(cardInfoDouble);
        });
    // // Card 0
    // cardName0.textContent = cardInfo[0].name;
    // // console.log(cardInfo[0]);
}
// Card Setup
let cardMetas = [];
let numCards = 8;
for (let i = 0; i < numCards; i++) {
    cardMetas.push(document.getElementById(`card-${i}`));
}
// Wins and Losses setup
let wins = 0, losses = 0;
let clickCounter = 0;
let totalClicks = 0;
let personsCompare = [-1, -1];
let winsDoc = document.getElementById("wins");
let lossesDoc = document.getElementById("losses");
// Seconds set up
function timerButton() {
    //Reset timer
    seconds = 0;
    timer.textContent = seconds;
    clearInterval(interval);
    // Reset cards

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.replace('back', 'card');
        document.getElementById(`card-${i}`).style.backgroundImage = 'url(https://screenrant.com/wp-content/uploads/2022/11/Star-Wars-Franchise-Image.jpg)';
        document.getElementById(`card-${i}`).textContent = "";
    }
    // Reset Wins and Losses
    wins = 0;
    losses = 0;
    totalClicks = 0;
    personsCompare = [-1, -1];
    winsDoc.textContent = wins;
    lossesDoc.textContent = losses;
    // Start timer
    interval = setInterval(timerCount, 1000);
}
// Timer display seconds
function timerCount() {
    // counter start at 0
    seconds += 1;
    timer.textContent = seconds;
}
// Compare persons
function comparePersons(ppl) {
    console.log(ppl);
    if (cardInfoDouble[ppl[0]].name == cardInfoDouble[ppl[1]].name) {
        return true;
    }
    else {
        return false;
    }
}
// Flip cards
let cards = document.querySelectorAll('.card');
console.log(cards);
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener(
        'click',
        function () {
            if (cards[i].classList.contains('card')) {
                // Random person index
                let person = cardsShuffled[i];
                // Flip card and change background
                cards[i].classList.replace('card', 'back');
                document.getElementById(`card-${i}`).style.backgroundImage = `url(${cardInfoDouble[person].image})`;
                // Set person meta data
                let textInfo = `${cardInfoDouble[person].name}, Height:${cardInfoDouble[person].height}`;
                document.getElementById(`card-${i}`).textContent = textInfo;
                // Check compares



                if (clickCounter == 0) {
                    personsCompare[0] = person;
                    clickCounter++;
                    totalClicks++;
                }
                else if (clickCounter == 1) {
                    // Add second person and compare
                    personsCompare[1] = person; 
                    // clearTimeout(myTimeout);                  
                    let comp = comparePersons(personsCompare);
                    // Update wins and losses
                    if (comp) {
                        wins++;
                        winsDoc.textContent = wins;
                        totalClicks++;
                    }
                    else {

                        setTimeout(() => {
                            losses++;
                            lossesDoc.textContent = losses;
                            cards[personsCompare[0]].classList.replace('back', 'card');
                            cards[personsCompare[1]].classList.replace('back', 'card');
                            document.getElementById(`card-${personsCompare[0]}`).style.backgroundImage = `url(${'https://screenrant.com/wp-content/uploads/2022/11/Star-Wars-Franchise-Image.jpg'})`;
                            document.getElementById(`card-${personsCompare[1]}`).style.backgroundImage = `url(${'https://screenrant.com/wp-content/uploads/2022/11/Star-Wars-Franchise-Image.jpg'})`;
                            document.getElementById(`card-${personsCompare[0]}`).textContent = '';
                            document.getElementById(`card-${personsCompare[1]}`).textContent = '';
                        }, 1000);

                        totalClicks -= 1;

                        // document.getElementsByClassName('.card');
                        // personsCompare = [-1, -1]
                    }
                    // Reset click counter
                    clickCounter = 0;

                }
                // Stop Timer
                if (totalClicks == 8) {
                    clearInterval(interval);
                    totalClicks = 0;
                }
            }
        }
    );
}