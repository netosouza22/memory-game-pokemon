let modalScoreBoard = document.getElementsByClassName('modal'); //Get an array of div's with class modal in html
// ------------------------------------Getting the elements of html
function savingValuesInModal(){
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

window.resetScore = function(){
    localStorage.setItem('scoreBP1', 0);
    localStorage.setItem('scoreBP2', 0);
    savingValuesInModal()
}

function showScore(){ 
    modalScoreBoard[4].style.display = 'block';
    savingValuesInModal();
}

window.hideModalSB = function(){
    modalScoreBoard[4].style.display = 'none';
}

