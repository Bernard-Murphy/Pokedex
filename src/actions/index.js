import axios from 'axios';

export const FETCH = 'FETCH';
export const WRITE = 'WRITE';
export const ERROR = 'ERROR';
export const SPRITE = 'SPRITE';
export const MOVES = 'MOVES';
export const MOVECHANGE = 'MOVECHANGE';

export const changeSprite = () => dispatch => {
    // Used for switching between regular sprites and shiny sprites.
    dispatch({
        type: SPRITE
    })
}

export const inputChange = (e) => {
    // Used for registering key presses
    return {
        type: WRITE,
        text: e.target.value
    }
}
export const formSubmit = (poke) => dispatch => {
    // Used for form submission
    const config = {
        method: 'get',
        url: `https://pokeapi.co/api/v2/pokemon/${poke}`,
      };

    axios(config)
    .then(res => {
        dispatch({
            type: FETCH,
            data: res.data
        })
    })
    .catch(err => {
        axios.post('https://bernardmurphy.net/test', {
            error: err
        })
        .then(res => {
            dispatch({
                type: ERROR
            })
        })
        .catch(err => {
            dispatch({
                type: ERROR
            })
        })
    })
}

const singleMove = async (url) => {
    /* This function, which is run on each iteration of the for loop inside the moveFetch function, fetches a single 
    move from the Pokemon API. It needs to be in a separate function because the Pokemon API has some mistakes which 
    could result in the moveFetch function breaking if one of those mistake moves are tried. */
    let data = ''
    await axios.get(url)
            .then(res => {
                data = res.data;
            })
            .catch(err => {
                data = "error"
            })
    return data;
}

export const moveFetch = (moveData, movesState) => async dispatch => {
    // Used to get the Pokemon's moves.
    if (movesState.length === 0){
        let loading = document.createElement('p');
        loading.textContent = 'Loading moves. Please wait...';
        loading.classList.add('p-loading-moves');
        document.querySelector('#left').appendChild(loading);
        let moveDataArray = [];
        for (let i = 0; i < moveData.length; i++){
            let data = await singleMove(moveData[i]);
            if (data !== 'error'){
                moveDataArray.push({
                    name: data.names[7].name,
                    type: data.type.name,
                    power: (data.power === null) ? "-" : data.power,
                    accuracy: (data.accuracy === null) ? "-" : data.accuracy,
                    pp: data.pp,
                    effect: data.effect_entries[0].effect
                });
            }
            if (i === (moveData.length - 1)){
                dispatch({
                    type: MOVES,
                    moves: moveDataArray
                })
            } 
        }
        
    } else {
        dispatch({
            type: MOVES,
            moves: movesState
        })
    }
    
}

export const moveChange = () => dispatch => {
    // Used to switch from the moves page to the main page
    dispatch({
        type: MOVECHANGE
    })
}