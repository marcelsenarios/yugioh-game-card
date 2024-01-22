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
    playerSides: {
        yourPlayer: "player-cards",
        yourPlayerBox: document.querySelector("#player-cards"),
        computerPlayer: "computer-cards",
        computerPlayerBox: document.querySelector("#computer-cards"),
    },
    action: {
        button: document.getElementById("next-duel")
    }
};


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

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id; 
};

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");
    
    if (fieldSide === state.playerSides.yourPlayer) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(randomIdCard);
        });
    
        cardImage.addEventListener('click', ()=> {
            setCardsField(cardImage.getAttribute("data-id"))
        });
    }

    return cardImage;
};


async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = 'block';
    state.fieldCards.computer.style.display = 'block';

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function removeAllCardsImages() {
    let {yourPlayerBox, computerPlayerBox } = state.playerSides;
    console.log(yourPlayerBox, computerPlayerBox);
    let imgElements = yourPlayerBox.querySelectorAll("img");

    imgElements.forEach((img) => img.remove());

    imgElements = computerPlayerBox.querySelectorAll("img");

    imgElements.forEach((img) => img.remove());
}


async function drawSelectCard(randomIdCard) {
    state.cardSprites.avatar.src = cardData[randomIdCard].img;
    state.cardSprites.name.innerText = cardData[randomIdCard].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[randomIdCard].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, state.playerSides.yourPlayer);
    drawCards(5, state.playerSides.computerPlayer);
}

init();