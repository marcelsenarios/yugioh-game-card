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

function init() {}

init();