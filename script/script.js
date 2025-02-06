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

const shuffele = array => array.sort(() => Math.random() - 0.5);