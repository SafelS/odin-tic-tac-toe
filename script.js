
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


function Gamecontroller(){
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

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

    const container = document.getElementById("container");


    const createBoardUI = () => {
        container.innerHTML = ""; 
        gameboard.getGameboard().forEach((field, index) => {
            const fieldDiv = document.createElement("div");
            fieldDiv.classList.add("field");
            fieldDiv.dataset.index = index;
            fieldDiv.textContent = field;
            container.appendChild(fieldDiv);


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




    const playRound = (index) => {

        if(gameboard.getField(index) !== ""){
            console.log("This field is occupied, please choose another field");
        }else{
            gameboard.addMarker(index, currentplayer.getPlayerMarker());
            updateDisplay();
            currentplayer = (currentplayer === player1) ? player2 : player1;

            if(!gameboard.getGameboard().includes("")){
                console.log("TIE!!!")
                return;
            }

            if(checkWinner()){
                if(currentplayer === player1){
                    console.log("Player 2 won, Please Restart");
                    gameboard.resetGameboard();
                    updateDisplay();
                    return;
                }else{
                    console.log("Player 1 won, Please Restart");
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

const game1 = Gamecontroller();



/*Tie Test
game1.playRound(0);
game1.playRound(1);
game1.playRound(4);
game1.playRound(2);
game1.playRound(5);
game1.playRound(3);
game1.playRound(6);
game1.playRound(8);
game1.playRound(7);
*/

/* Winner Test
game1.playRound(0);
game1.playRound(3);
game1.playRound(1);
game1.playRound(4);
game1.playRound(2);
game1.playRound(7);
game1.playRound(7);*/


