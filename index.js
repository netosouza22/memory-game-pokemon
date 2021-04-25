let qntNumber = [];//What's the index from arr pokemon put in the span's array

let arrStoreCardValue= []; //Used to store the values of the titile spans clickd
let arrStoreCardIndex = []; //Used to store the value of the index of each card clicked 

let arrayPokes = []; //To Store the image URL of each pokemon
let arrayPokeNames = []; //Store the name of each pokemon

//To player
let player = 0; //Flag the players is playing now
let playerObj = {
                    player0: { id: 'Player 1', score: 0, scoreBoard: 0},
                    player1: {id: 'Player 2', score: 0, scoreBoard: 0},
                }
let isReset = true; //Flag to use the buttons New Game and Reset

/*------------------GET VALUE FROM SESSION STORAGE and CHOOSE THE POKEMONS TO APPEAR---------------------------- */

function storePokeArr(){
    
    let pokeLength = Object.keys(sessionStorage).length;
    for ( let i = 0; i < pokeLength; i++){
        if((Object.keys(sessionStorage)[i]) !== 'IsThisFirstTime_Log_From_LiveServer'){
            arrayPokes.push(sessionStorage.getItem(Object.keys(sessionStorage)[i]));
            arrayPokeNames.push(Object.keys(sessionStorage)[i]);
        }
    }
}
setTimeout(() => {storePokeArr()}, 2000);
function storeSelectedPokemons() {

    let arrSelectedPokemons = [];
    let arrAux = [];

    for(let i = 0; i < 28; i++){
        arrAux[i] = arrayPokes[i];
    }
    for(let i = 0; i < 14 ; i++){
        let randNumb = Math.floor(Math.random() * arrAux.length);
        arrSelectedPokemons.push(arrAux[randNumb]);
        
        arrAux.splice(randNumb, 1); 
    }
 
    return arrSelectedPokemons;
}
//------------------------------------------START------------------------------------------------------------------
window.start = function(){
    if(isReset === true){

        let cards = document.getElementsByClassName('card');
        for(let i = 0; i < cards.length; i++){
            cards[i].classList.add('clicked');
        }
        
        putPokemonInCard();
        startClickEvt();
    
        player =  Math.floor(Math.random() * 2); //Choose begining player
    
        document.getElementById('nPlayer0').textContent = playerObj['player0']['id'];
        document.getElementById('nPlayer1').textContent = playerObj['player1']['id'];
    
        document.getElementById('scoreP0').textContent = playerObj['player0']['score'] = 0;
        document.getElementById('scoreP1').textContent = playerObj['player1']['score'] = 0;
    
        document.getElementById(`nPlayer${player}`).style.color = 'red';

        document.getElementById('newGame').style.backgroundColor = 'gray';
        document.getElementById('reset').style.backgroundColor = 'red';

        isReset = false;
    }
}

// ------------------------------------Put the pokemon in the right card-------------------------------
function isPokemonAppeared(qntNumber, arrIndexPokemon){
    qntNumber.push(arrIndexPokemon); //put the value arrIndexPokemon in a array

    //How many times the number shows in array qntNumber
    let qnt = qntNumber.filter(item => item == arrIndexPokemon).length;

    if(qnt === 2){
        let val = 2;
        let numb = arrIndexPokemon;

        //Delete the value from array
        while(val > 0){
            let index = qntNumber.indexOf(arrIndexPokemon);
            qntNumber.splice(index, 1);
            val--;
        }

        //if number greater than the value, update the value subtracting 1 of the values
        let arrUpdated = qntNumber.map((item) => {
            if(item > numb){
                return (item - 1);
            }else {
                return item
            }  
        });

        // arr qntNumber updated
        for(let i=0; i < arrUpdated.length ; i++){
            qntNumber[i] = arrUpdated[i];    
        }
        return true;
    }else{
        return false;
    }
};

function putPokemonInCard(){
    let arrSelecetedPokemons = storeSelectedPokemons();
    let arrCards = document.getElementsByClassName('card');

    for(let i = 0; i < arrCards.length; i++){
        let randNumber = Math.floor(Math.random() * (arrSelecetedPokemons.length));
        let rtnNumber = isPokemonAppeared(qntNumber, randNumber);

        arrCards[i].title = arrSelecetedPokemons[randNumber];
        arrCards[i].style.backgroundColor = '#a6ce39';

        if(rtnNumber === true){
            arrSelecetedPokemons.splice(randNumber, 1);
        }
    }
}

// ---------------------------------------------------VERIFY THE CARDS CLICKED ------------------------------------------------------

function isCardEqual(value, indexCard){

    let cards = document.getElementsByClassName('card');

    arrStoreCardValue.push(value);
    arrStoreCardIndex.push(indexCard);

    if(value !== "" || value !== "  " ){
        if(arrStoreCardIndex.length === 2 ){

                let hasClassClicked = cards[indexCard - 1].classList.contains('clicked');
                if((arrStoreCardValue[0] === arrStoreCardValue[1]) && (arrStoreCardIndex[0] !== arrStoreCardIndex[1]) && hasClassClicked){
                   
                    //To get the score for any player
                    playerObj[`player${player}`]['score'] = playerObj[`player${player}`]['score'] + 1;
                    document.getElementById(`scoreP${player}`).textContent = playerObj[`player${player}`]['score'];
            
                    let scoreP1 = playerObj['player0']['score'];
                    let scoreP2 = playerObj['player1']['score'];
                    
                    for(let i = 0; i < arrStoreCardIndex.length; i++){
                        cards[arrStoreCardIndex[i] - 1].classList.remove('clicked');
                        cards[arrStoreCardIndex[i] - 1].removeEventListener('click', eventClick, false);
                    }   

                    showModal(3);

                    if((scoreP1 + scoreP2) === 14){
                        updateScoreBoard(scoreP1, scoreP2);
                    }

                    arrStoreCardIndex = [];
                    arrStoreCardValue= [];
                }else{
                    //Change the player playing 
                    if(player === 1){
                        player = 0;
                        document.getElementById(`nPlayer0`).style.color = "red";
                        document.getElementById(`nPlayer1`).style.color = "black";
                    }else{
                        player = 1;
                        document.getElementById(`nPlayer1`).style.color = "red";  
                        document.getElementById(`nPlayer0`).style.color = "black"; 
                    }

                showModal(0);              
                } 
        }
    }
}
//  Return the cards to pokebola img if they are not equals
function returnToBackCards(){
    let cards = document.getElementsByClassName('card'); 
    for(let i = 0; i < arrStoreCardIndex.length; i++){
        cards[arrStoreCardIndex[i] - 1].style.backgroundImage = `url(./assets/pokebola.jpg)`;
    }
    arrStoreCardValue= [];
    arrStoreCardIndex = [];
}

//To all cards allows the event click
function startClickEvt(){
    let card = document.querySelectorAll('.clicked');
    card.forEach((item) => {
        item.addEventListener('click', eventClick, false);
    });
}

//Action of the event of card
var eventClick = (evt) => {
    let url = evt.target.title;
    let indexCard = evt.target.textContent;
    evt.target.style.backgroundImage = `url(${url})`;

    isCardEqual(url, indexCard);
};
// --------------------------------------------------SHOW AND HIDE MODAL-------------------------------------------
let modal = document.getElementsByClassName('modal');
function showModal(modalNumber){
    modal[`${modalNumber}`].style.display = 'block';
}

window.hideModal = function(){
    modal[3].style.display = 'none';
}
window.hideModalErr = function(){
    modal[0].style.display = 'none';
    returnToBackCards();
}
window.hideModalEnd = function(){
    modal[1].style.display = 'none';
}
window.hideModalDraw = function(){
    modal[2].style.display = 'none';
}

window.onclick = function(evt){
    if(evt.target.classList[0] === 'modal'){
        switch(evt.target.classList[1]){
            case 'modal0':
                hideModalErr();
                break;
            case 'modal1':
                hideModalEnd();
                break;
            case 'modal2':
                hideModalDraw();
                break;
            case 'modal3':
                hideModal();
                break;
        }
    }
}
// -------------------------------------------------- Scoreboard --------------------------------------------------
window.onload = () => {
    storeScoreLocalStorage();
}
function storeScoreLocalStorage(){
    localStorage.setItem('player1', playerObj.player0.id);
    localStorage.setItem('player2', playerObj.player1.id);

    localStorage.setItem('scoreBP1', playerObj.player0.scoreBoard);
    localStorage.setItem('scoreBP2', playerObj.player1.scoreBoard);
}

function updateScoreBoard(scoreP1, scoreP2){
    let nameP1 = playerObj['player0']['id'];
    let nameP2 = playerObj['player1']['id'];
    
    if(scoreP1 === scoreP2){
        modal[2].style.display = 'block';
    }else if(scoreP1 > scoreP2){
        modal[1].style.display = 'block';
        document.getElementById('name').textContent = nameP1;
        playerObj.player0.scoreBoard += 1;
    }else{
        modal[1].style.display = 'block';
        document.getElementById('name').textContent = nameP2;
        playerObj.player1.scoreBoard += 1;
    }
    storeScoreLocalStorage();
}

// -------------------------------------------------- RESET THE VALUES --------------------------------------------
window.reset = function(){
    let arrCards = document.getElementsByClassName('card');
    let cardClicked = document.querySelectorAll('.clicked');

    cardClicked.forEach((item) => {
        item.removeEventListener('click', eventClick, false);
    });

    for(let i = 0; i < arrCards.length; i++){
        arrCards[i].style.backgroundImage = "url(./assets/pokebola.jpg)";
        arrCards[i].classList.remove('clicked');
    }

    document.getElementById('scoreP0').textContent = playerObj['player0']['score'] = 0;
    document.getElementById('scoreP1').textContent = playerObj['player1']['score'] = 0;

    document.getElementById('nPlayer0').style.color = 'black';
    document.getElementById('nPlayer1').style.color = 'black';

    document.getElementById('newGame').style.backgroundColor = 'red';
    document.getElementById('reset').style.backgroundColor = 'gray';

    arrStoreCardValue= [];
    arrStoreCardIndex = [];
    qntNumber = [];
    isReset = true;
    
}

window.onunload = () => { localStorage.clear() }

// export {playerObj};