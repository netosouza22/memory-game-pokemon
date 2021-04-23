
// ------------------------------------Getting the elements of html
function savingValues(){
    var P1 = localStorage.getItem('player1');
    var P2 = localStorage.getItem('player2');
    var scoreBoardPlayer1 = localStorage.getItem('scoreBP1');
    var scoreBoardPlayer2 = localStorage.getItem('scoreBP2');
        
    let textP1 = document.getElementById('p1');
    let textWinP1 = document.getElementById('scoreBP1');
    let textP2 = document.getElementById('p2');
    let textWinP2 = document.getElementById('scoreBP2');

    textP1.textContent = P1;
    textWinP1.textContent = scoreBoardPlayer1;
    textP2.textContent = P2;
    textWinP2.textContent = scoreBoardPlayer2;
}

function resetScore(){
    localStorage.setItem('scoreBP1', 0);
    localStorage.setItem('scoreBP2', 0);
    savingValues()
}

let modalScoreBoard = document.getElementsByClassName('modal');
function showScore(){ 
    modalScoreBoard[4].style.display = 'block';
    savingValues()
}

function hideModalSB(){
    modalScoreBoard[4].style.display = 'none';
}

