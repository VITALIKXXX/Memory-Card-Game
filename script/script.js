const board = document.querySelector(".board");
const errorDisplay = document.querySelector(".errors");
const movesDisplay = document.querySelector(".moves");
const endScreen = document.querySelector(".end__screen");
const resultText = document.querySelector(".result__text");
const errorsCount = document.querySelector(".errors__count");
const movesCount = document.querySelector(".moves__count");
const restartButton = document.querySelector(".result__button");

const cardImages = [
    "images/vini.jpg", "images/vini.jpg",
    "images/wirtz.jpg", "images/wirtz.jpg",
    "images/hajrizi.jpg", "images/hajrizi.jpg",
    "images/haaland.jpg", "images/haaland.jpg",
    "images/bruyne.jpg", "images/bruyne.jpg",
    "images/robert.jpg", "images/robert.jpg",
    "images/degaard.jpg", "images/degaard.jpg",
    "images/stars.webp", "images/stars.webp",
    "images/mbappe.jpg", "images/mbappe.jpg"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let errors = 0;
let moves = 0;
let timeElapsed = 0;
let timer;

const startTimer = () => {
    timeElapsed = 0;
    clearInterval(timer);
    timer = setInterval(() => {
        timeElapsed++;
    }, 1000);
};

const stopTimer = () => clearInterval(timer);

const shuffle = array => array.sort(() => Math.random() - 0.5);

const createBoard = () => {
    board.innerHTML = "";
    cards = [];
    const shuffledCards = shuffle([...cardImages]);

    shuffledCards.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;

        const frontFace = document.createElement("div");
        frontFace.classList.add("front");
        frontFace.style.backgroundImage = "url('images/back.jpg')";

        const backFace = document.createElement("div");
        backFace.classList.add("back");
        backFace.style.backgroundImage = `url('${image}')`;

        card.appendChild(frontFace);
        card.appendChild(backFace);
        card.addEventListener("click", flipCard);

        board.appendChild(card);
        cards.push(card);
    });
};

const flipCard = (event) => {
    const card = event.currentTarget;
    if (lockBoard || card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
};

const checkMatch = () => {
    moves++;
    movesDisplay.textContent = moves;

    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();

    checkGameEnd();
};

const checkGameEnd = () => {
    if (document.querySelectorAll(".card:not(.flipped)").length === 0) {
        showEndScreen();
    }
};

const showEndScreen = () => {
    stopTimer();
    endScreen.classList.remove("hidden");

    errorsCount.textContent = errors;
    movesCount.textContent = moves;

    const timeDisplay = document.createElement("p");
    timeDisplay.textContent = `Time: ${timeElapsed} seconds`;
    endScreen.appendChild(timeDisplay);

    if (errors <= 5) {
        resultText.textContent = "EXCELLENT!";
        resultText.style.color = "green";
    } else if (errors <= 10) {
        resultText.textContent = "GOOD JOB!";
        resultText.style.color = "blue";
    } else {
        resultText.textContent = "TRY AGAIN";
        resultText.style.color = "red";
    }
};

const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
};

const unflipCards = () => {
    errors++;
    errorDisplay.textContent = errors;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
};

const resetBoard = () => {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
};

const reavelAllCards = () => {
    cards.forEach(card => card.classList.add("flipped"));

    setTimeout(() => {
        cards.forEach(card => card.classList.remove("flipped"));
    }, 5000);
};

const resetGame = () => {
    startTimer();
    errors = 0;
    moves = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    errorDisplay.textContent = errors;
    movesDisplay.textContent = moves;
    errorsCount.textContent = errors;
    movesCount.textContent = moves;

    endScreen.classList.add("hidden");
    createBoard();

    setTimeout(() => {
        cards.forEach(card => card.classList.add("flipped"));
    }, 300);

    setTimeout(() => {
        cards.forEach(card => card.classList.remove("flipped"));
    }, 5000);


};

restartButton.addEventListener("click", resetGame);

createBoard();

setTimeout(reavelAllCards, 500);
