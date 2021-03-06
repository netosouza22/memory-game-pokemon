
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#carregar';
        window.location.reload();
    }
}

if(Object.keys(sessionStorage).length === 1){
    console.log('este é o', sessionStorage);  
}

if(Object.keys(sessionStorage).length < 2){ //Test if the sessionStorage isn't empty
    // window.location.reloa;d() 
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=28';
    function fetchPokemon() {
        fetch(url).then(
                (response) => response.json()
            ).then(function(data){
                data.results.forEach((pokemon, index) => {
                    getEachPoke(pokemon.url);//Call the function that pick any pokemon individually
                });
            }).catch((error) => console.log(error));
    }

    setTimeout(() => {
        fetchPokemon();
    }, 1000)


    function getEachPoke(url){
        fetch(url).then(
            (response) => response.json()
        ).then(function(data){
            storeDataPokemon(data);
        }).catch((error) => console.log(error));
    }

        async function storeDataPokemon(data) {
            let imgPokemon = data['sprites']['other']['official-artwork']['front_default'];
            let namePokemon = data['name'];

            sessionStorage.setItem(`${namePokemon}`, `${imgPokemon}`);
        }
    }else{
        console.log('entrou no else');
    }