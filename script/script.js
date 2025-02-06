const board = document.querySelector(".board");
const errorDisplay = document.querySelector(".errors");

const cardImages = [
    "bruyne",
    "degaard",
    "haaland",
    "hajrizi",
    "mbappe",
    "robert",
    "stars",
    "vini",
    "wirtz"
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
        frontFace.style.backgroundImage = "url('back.png')";

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

const flipCard = () => {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

};
