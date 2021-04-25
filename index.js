let qntNumber = [];//What's the index from colors put in the span's array
let toCompare = []; //Use to get the values of spans clicked
let toCompareId = []; //Use to store the value of name of the spans clicked

let arrayPokes = []; //To Store the image of each pokemon
let arrayPokeNames = []; //Store the name of each pokemon

//To player
let player = 0; //Flag the players is playing now
let playerObj = {
                    player0: { id: 'Player 1', score: 0, scoreBoard: 0},
                    player1: {id: 'Player 2', score: 0, scoreBoard: 0},
                }
let isReset = true; //Flag to use the buttons New Game and Reset

/*--------------------------------------------------GET VALUE FROM SESSION STORAGE---------------------------- */

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

function selectThePokemons() {

    let arrSelectedPokemons = [];
    let copiedArray = [];

    for(let i = 0; i < 28; i++){
        copiedArray[i] = arrayPokes[i];
    }
    for(let i = 0; i < 14 ; i++){
        let randNumb = Math.floor(Math.random() * copiedArray.length);
        arrSelectedPokemons.push(copiedArray[randNumb]);
        
        copiedArray.splice(randNumb, 1); 
    }
 
    return arrSelectedPokemons;
}

window.start = function(){

    if(isReset === true){
        let cards = document.getElementsByClassName('card');
        for(let i = 0; i < cards.length; i++){
            cards[i].classList.add('clicked');
        }
        choosePokemon();
        startClickEvt();
    
        player =  Math.floor(Math.random() * 2);
    
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

// ------------------------------------Put the colors in the right place of the board--------------------------------
function qntNumberTwo(qntNumber, numberColor){
    qntNumber.push(numberColor); //put the value numberColor in a array

    //How many times the number shows in array qntNumber
    let qnt = qntNumber.filter(item => item == numberColor).length;

    //In case the number shows two times
    if(qnt === 2){
        let val = 2;
        let numb = numberColor;

        //Delete the value from array
        while(val > 0){
            let index = qntNumber.indexOf(numberColor);
            qntNumber.splice(index, 1);
            val--;
        }
        //if number greater than the value update the value subtracting with one
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

function choosePokemon(){
    let array = selectThePokemons();
    let cards = document.getElementsByClassName('card');

    for(let i = 0; i < cards.length; i++){

        let numberPoke = Math.floor(Math.random() * (array.length));
        let rtnNumber = qntNumberTwo(qntNumber, numberPoke);

        cards[i].title = array[numberPoke];
        cards[i].style.backgroundColor = '#a6ce39';

        if(rtnNumber === true){
            array.splice(numberPoke, 1);
        }else{
        }  
    }
}

// ---------------------------------------------------Verify the values clicked ------------------------------------------------------

function findEquals(color, id){

    let cards = document.getElementsByClassName('card');
    toCompare.push(color);
    toCompareId.push(id);
    
    if(color !== "" || color !== "  " ){
        if(toCompare.length === 2 ){

                let bool = cards[id - 1].classList.contains('clicked');
                if((toCompare[0] === toCompare[1]) && (toCompareId[0] !== toCompareId[1]) && bool){
                    //To get the score for any player
                    // document.getElementById('colorName').textContent = `${color}: são iguais`;
                    playerObj[`player${player}`]['score'] = playerObj[`player${player}`]['score'] + 1;
                    document.getElementById(`scoreP${player}`).textContent = playerObj[`player${player}`]['score'];
            
                    let scoreP1 = playerObj['player0']['score'];
                    let scoreP2 = playerObj['player1']['score'];
                    
                    for(let i = 0; i < toCompareId.length; i++){
                        cards[toCompareId[i] - 1].classList.remove('clicked');
                        cards[toCompareId[i] - 1].removeEventListener('click', eventClick, false);
                    }   

                    showModal(3);
                    if((scoreP1 + scoreP2) === 14){
                        scoreBoard(scoreP1, scoreP2);
                    }

                    toCompareId = [];
                    toCompare = [];
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
function backCards(){
    let cards = document.getElementsByClassName('card'); 
    for(let i = 0; i < toCompareId.length; i++){
        cards[toCompareId[i] - 1].style.backgroundImage = `url(./assets/pokebola.jpg)`;
    }
    toCompare = [];
    toCompareId = [];
}

//Add the colors for all spans and allows the event click
function startClickEvt(){
    let card = document.querySelectorAll('.clicked');
    card.forEach((item) => {
        item.addEventListener('click', eventClick, false);
    });
}

var eventClick = (evt) => {
    let url = evt.target.title;
    let id = evt.target.textContent;
    evt.target.style.backgroundImage = `url(${url})`;

    findEquals(url, id);
};
// --------------------------------------------------SHOW E HIDE MODAL-------------------------------------------
let modal = document.getElementsByClassName('modal');
function showModal(modalNumber){
    modal[`${modalNumber}`].style.display = 'block';
}

window.hideModal = function(){
    modal[3].style.display = 'none';
}
window.hideModalErr = function(){
    modal[0].style.display = 'none';
    backCards();
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
    storeInLocal();
}
function storeInLocal(){
    localStorage.setItem('player1', playerObj.player0.id);
    localStorage.setItem('player2', playerObj.player1.id);

    localStorage.setItem('scoreBP1', playerObj.player0.scoreBoard);
    localStorage.setItem('scoreBP2', playerObj.player1.scoreBoard);
}

function scoreBoard(scoreP1, scoreP2){
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
    storeInLocal();
}

// -------------------------------------------------- Reset the values --------------------------------------------
window.reset = function(){
    let cards = document.getElementsByClassName('card');
    let cardClicked = document.querySelectorAll('.clicked');

    cardClicked.forEach((item) => {
        item.removeEventListener('click', eventClick, false);
    });

    for(let i = 0; i < cards.length; i++){
        cards[i].style.backgroundImage = "url(./assets/pokebola.jpg)";
        cards[i].classList.remove('clicked');
    }

    document.getElementById('scoreP0').textContent = playerObj['player0']['score'] = 0;
    document.getElementById('scoreP1').textContent = playerObj['player1']['score'] = 0;

    document.getElementById('nPlayer0').style.color = 'black';
    document.getElementById('nPlayer1').style.color = 'black';

    document.getElementById('newGame').style.backgroundColor = 'red';
    document.getElementById('reset').style.backgroundColor = 'gray';

    toCompare = [];
    toCompareId = [];
    qntNumber = [];
    isReset = true;
    
}
window.onunload = () => { localStorage.clear() }

export {playerObj};