const state = {
    score: {
        plaeyrScore: 0,
        computerSocre: 0,
        scoreBox: document.getElementById("score_points")
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type")
    },
    fieldCards: {        
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")                
    },
    action: {
        button: document.getElementById("next-duel")
    }
};

const playeSides = {
    player1: "player-field-card",
    player2: "computer-field-card",
}
const pathImages = './src/assets/icons/';
const cardData =[
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0]
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1]
    }        
];

async function getRandomCardId() {};

async function createCardImage() {};

async function drawCards(cardNumbers, fieldSid) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSid);

        document.getElementById(fieldSid).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, playeSides.player1);
    drawCards(5, playeSides.player2);
}

init();