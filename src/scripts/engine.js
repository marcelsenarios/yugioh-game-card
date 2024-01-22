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
    actions: {
        button: document.getElementById("next-duel")
    }
};


const pathImages = './src/assets/icons/';

const cardData = [
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

        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute("data-id"))
        });
    }

    return cardImage;
};


async function setCardsField(playerCardId) {
    let computerCardId = await getRandomCardId();
    let duelResults = await checkDuelResults(playerCardId, computerCardId);

    await removeAllCardsImages();
    await ShowHiddenCardFieldsImages(true);
    await hiddenCardDetails();
    await drawCarsInFiels(playerCardId, computerCardId);
    await updateScore();
    await drawButton(duelResults);
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.plaeyrScore} | Lose:  ${state.score.computerSocre}`;
}

async function drawCarsInFiels(playerCardId, computerCardId) {
    state.fieldCards.player.src = cardData[playerCardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function ShowHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = 'block';
        state.fieldCards.computer.style.display = 'block';
    } else {
        state.fieldCards.player.style.display = 'none';
        state.fieldCards.computer.style.display = 'none';
    }
}

async function hiddenCardDetails() {
    state.cardSprites.avatar.src = '';
    state.cardSprites.name.innerText = '';
    state.cardSprites.type.innerText = '';
}

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Win";
        state.score.plaeyrScore++;
    }

    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Lose";
        state.score.computerSocre++;
    }

    playAudio(duelResults);

    return duelResults;
}

async function removeAllCardsImages() {
    let { yourPlayerBox, computerPlayerBox } = state.playerSides;
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

async function resetDuel() {
    hiddenCardDetails();
    state.actions.button.style.display = 'none';
    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status.toLowerCase()}.wav`);
    try {
        audio.play();
    } catch (error) {

    }
}

function init() {
    ShowHiddenCardFieldsImages(false);
    drawCards(5, state.playerSides.yourPlayer);
    drawCards(5, state.playerSides.computerPlayer);
}

init();