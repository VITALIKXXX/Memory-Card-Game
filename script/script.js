const board = document.querySelector(".board");
const errorDisplay = document.querySelector(".errors");

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

const shuffle = array => array.sort(() => Math.random() - 0.5);

const createBoard = () => {
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
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
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

createBoard();

setTimeout(reavelAllCards, 500);
