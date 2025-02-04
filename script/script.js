


let errors = 0;
let cardList = [
    "bruyne",
    "degaard",
    "haaland",
    "hajrizi",
    "mbappe",
    "robert",
    "stars",
    "vini",
    "wirtz"
]

let cardSet;
let board = [];

const shuffleCards = () => {
    cardSet = cardList.concat(cardList);
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
};

const startGame = () => {
    
};

