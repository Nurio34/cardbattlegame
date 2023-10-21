const time = 1000
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

            // REMOVE "CHOSEN" TEXT FROM ALL CARDS
            cardsToChose.forEach(card => card.classList.remove("chosen"))

            // FROM CREATE SECTİON TO BATTLE SECTİON
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
            card.style =  `--x: ${i * 35}px; --y: 0; --z: 0deg; --zInd: ${i}; --s: 0.6`
        })
        
    const enemyCards = [...enemyHand.querySelectorAll(".card")]
        enemyCards.forEach((card,i) => {
            card.style =  `--x: ${i * 35}px; --y: 0; --z: 0deg; --zInd: ${i}; --s: 0.6`
        })

//TODO // THROW A CARD and ENEMY THROWS A CARD - CARDS BATTLE
//TODO // WİNNER CARD STAYS ON TABLE WITH REEMAINING STATS - OTHER PLAYERS TURN STARTS
let myCard
let enemyCard
    // SELECT CARD TO PLAY
        myCards.forEach((card,i) => card.addEventListener("click",e => {

            // IF CARD IS AMOUNG OF OTHER CARDS MAKE IT BIG TO INSPECT
            if(card.dataset.mode !== "inspecting") {
                
                myCards.forEach((card,i) => {
                    console.log(card);
                    myCard = card
                    myCard.dataset.mode = "not-inspecting"
                    myCard.style =  `--x: ${i * 35}px; --y: 0; --z: 0deg; --zInd: ${i}; --s: 0.6`
                })

                myCard.style =  `--x: ${i * 35}px; --y: -50%; --z: 0deg; --zInd: 100; --s: 1;`
                myCard.dataset.mode = "inspecting"
            }
            // IF YOU CLICK THE BIG CARD AGAIN, THROW IT TO TABLE
            else {
                myCard.style = `left: 50%; --x: -50%; --y: -70%; --z: 0deg; --zInd: 100; --s: 0.6; transform-origin : center`
                myCard.dataset.mode = "on-table"

                // ENEMY THROWS A CARD TO TABLE
                    setTimeout(() => {
                        
                        const random = Math.floor(Math.random() * enemyCards.length)
                            enemyCard = enemyCards[random]
                            enemyCard.style = `left: 50%; --x: -50%; --y: 70%; --z: 0deg; --zInd: 100; --s: 0.6; transform-origin : center`
                            enemyCard.dataset.mode = "on-table"

                        // CARDS BATTLE
                        setTimeout(() => {
                            // CARDS MOVE EACHOTHER (BATTLE)
                            myCard.style = `left: 50%; --x: -50%; --y: -70%; --z: 0deg; --zInd: 100; --s: 0.6; transform-origin : center; bottom : 11% `
                            enemyCard.style = `left: 50%; --x: -50%; --y: 70%; --z: 0deg; --zInd: 100; --s: 0.6; transform-origin : center; top: 11%`

                            // ADJUST CARDS STATS
                            const myCardStats = {
                                AP : +myCard.querySelector(".ap.stat").innerText,
                                HP : +myCard.querySelector(".hp.stat").innerText
                            }

                            const enemyCardStats= {
                                AP : +enemyCard.querySelector(".ap.stat").innerText,
                                HP : +enemyCard.querySelector(".hp.stat").innerText
                            }
                                setTimeout(() => {
                                    // IF MY CARD FUCKS
                                    if(myCardStats.HP > enemyCardStats.AP) {
                                        enemyCard.style = `left: 50%; --x: -50%; --y: 70%; --z: 1440deg; --zInd: 100; --s: 0.6; transform-origin : center; top: -40%;`
                                    }
                                    // IF ENEMY CARD FUCKS
                                    else {
                                        myCard.style = `left: 50%; --x: -50%; --y: 70%; --z: 1440deg; --zInd: 100; --s: 0.6; transform-origin : center; bottom: -40%;`
                                    }
                                    console.log("Calculating the remaing stats of the Winner Card");
                                    console.log("A problem with the Card Choosing");
                                }, 300);
                        }, time);     
                    }, time); 
            }
        }))
}