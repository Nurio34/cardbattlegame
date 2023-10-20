const createDeckSection = document.querySelector(".createDeckSection")
const cardsToChose = [...createDeckSection.querySelectorAll(".card")]
const myDeck = []
let enemyDeck = [...cardsToChose]

const battleSection = document.querySelector(".battleSection")
const myHand = battleSection.querySelector(".myHand")
const enemyHand = battleSection.querySelector(".enemyHand")

    //** CREATE DECK */
    cardsToChose.forEach(card => card.addEventListener("click",e => {

        // CREATE YOUR DECK
        card.classList.add("chosen")
        myDeck.push(card)

        // ENEMY DECK ACCORDİNG TO YOUR DECK
        enemyDeck = enemyDeck.filter(enemyCard => card !== enemyCard)


        if(myDeck.length === 10) {

            // REMOVE "CHOSEN" WRİTİNG FROM ALL CARDS
            cardsToChose.forEach(card => card.classList.remove("chosen"))

            // FROM CREATE SECİON TO BATTLE SECTİON
            createDeckSection.classList.add("hidden")
            battleSection.classList.remove("hidden")

            // START GAME
            startGame()
        }
    }))


//** ADJUST BATTLE SECTION */
function startGame() {

    // GIVE CARDS IN DECKS TO OWNERS HAND
    myHand.innerHTML = myDeck.map(card => card.outerHTML).join(" ")
    enemyHand.innerHTML = enemyDeck.map(card => card.outerHTML).join(" ")

    // GIVE CARDS STYLE VARIABLES TO MAKE REGULAR VIEW
    const myCards = [...myHand.querySelectorAll(".card")]
        myCards.forEach((card,i) => {
            card.style =  `--x: ${i * 35}px; --y: 0; --z: ${(i / 2) * 20}deg; --zInd: ${i}; --s: 0.6`
        })
        
    const enemyCards = [...enemyHand.querySelectorAll(".card")]
        enemyCards.forEach((card,i) => {
            card.style =  `--x: ${i * 35}px; --y: 0; --z: ${(i / 2) * 20}deg; --zInd: ${i}; --s: 0.6`
        })

    // SELECT CARD TO PLAY
    
        myCards.forEach((card,i) => card.addEventListener("click",e => {

            // IF CARD IS AMOUNG OF OTHER CARDS MAKE IT BIG TO INSPECT
            if(card.dataset.mode !== "inspecting") {
                
                myCards.forEach((card,i) => {
                    card.dataset.mode = "not-inspecting"
                    card.style =  `--x: ${i * 35}px; --y: 0; --z: ${(i / 2) * 20}deg; --zInd: ${i}; --s: 0.6`
                })

                card.style =  `--x: ${i * 35}px; --y: -50%; --z: ${(i / 2) * 20}deg; --zInd: 100; --s: 1;`
                card.dataset.mode = "inspecting"
            }
            // IF YOU CLICK THE BIG CARD AGAIN, THROW IT TO TABLE
            else {
                console.log("throw card");
            }

            
        }))
}