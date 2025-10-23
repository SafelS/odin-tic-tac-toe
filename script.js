
function createGameboard(){

    let gameboard = ["", "" ,"" ,"" ,"" ,"" ,"" ,"" ,""];

    const addMarker = (index, marker) => {

        if(gameboard[index] !== ""){
            console.log("ERROR!!!!!! WHAT HAVE YOU DONE!!!!!!");
        }else{
            gameboard[index] = marker;
        }
    }

    const getGameboard = () => gameboard;
    const getField = (index) => gameboard[index];
    const resetGameboard = () => gameboard = ["", "" ,"" ,"" ,"" ,"" ,"" ,"" ,""];

    return {addMarker, getGameboard, resetGameboard, getField};


}


function createPlayer(name, marker){


    const getPlayerName = () => name;
    const getPlayerMarker = () => marker;

    return{getPlayerName, getPlayerMarker}

}


function Gamecontroller(name1, name2){
    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");

    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");
    const restartButton = document.getElementById("restart-btn");
    const messageScreen = document.getElementById("result");
    

    let currentplayer = player1;

    const gameboard = createGameboard();

    const checkWinner = () => {
        const board = gameboard.getGameboard();
        const winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (const [a, b, c] of winningCombos) {
            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {
                return true;
            }
        }
        return false;
    };




    const createBoardUI = () => {
        gameScreen.innerHTML = ""; 

        const playerDisplay = document.createElement("div");
        playerDisplay.id = "player-display"
        playerDisplay.textContent = player1.getPlayerName() + " VS " + player2.getPlayerName();
        gameScreen.appendChild(playerDisplay);

        const gameTile = document.createElement("div");
        gameTile.id = "game-field";
        gameScreen.appendChild(gameTile);


        gameboard.getGameboard().forEach((field, index) => {
            const fieldDiv = document.createElement("div");
            fieldDiv.classList.add("field");
            fieldDiv.dataset.index = index;
            fieldDiv.textContent = field;
            gameTile.appendChild(fieldDiv);


            fieldDiv.addEventListener("click", () => {
                playRound(index);
            });
        });
    };

  
    const updateDisplay = () => {
        const fields = document.querySelectorAll(".field");
        fields.forEach((field, index) => {
            field.textContent = gameboard.getField(index);
        });
    };

    const showEndScreen = (msg) => {

        gameScreen.classList.add("hidden");
        gameScreen.innerHTML = "";
        endScreen.classList.remove("hidden");

        messageScreen.innerHTML = msg;

        restartButton.addEventListener("click", () => {
            endScreen.classList.add("hidden");
            startScreen.classList.remove("hidden");

        })

    }




    const playRound = (index) => {

        if(gameboard.getField(index) !== ""){
            console.log("This field is occupied, please choose another field");
        }else{
            gameboard.addMarker(index, currentplayer.getPlayerMarker());
            updateDisplay();
            currentplayer = (currentplayer === player1) ? player2 : player1;

            if(!gameboard.getGameboard().includes("")){
                showEndScreen("Its a TIE!");
                return;
            }

            if(checkWinner()){
                if(currentplayer === player1){
                    showEndScreen(`${player2.getPlayerName()}  Won, YAY!`);
                    gameboard.resetGameboard();
                    updateDisplay();
                    return;
                }else{
                    showEndScreen(`${player1.getPlayerName()}  Won, YAY!`);
                    gameboard.resetGameboard();
                    updateDisplay();
                    return;
                }
            }
        }
        
    } 

    createBoardUI();
    return{playRound}

}



const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");


const startButton = document.getElementById("start-btn");

const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");

startButton.addEventListener("click", () => {

    const player1 = player1Name.value;
    const player2 = player2Name.value;

    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    const game =  Gamecontroller(player1,player2);

});

