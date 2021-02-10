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
    axios.get(`https://bernardmurphy.net/getPoke/${poke}`)
        .then(res => {
            dispatch({
                type: FETCH,
                data: res.data.data
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

export const moveFetch = (moveData, movesState) => dispatch => {
    // Used to get the Pokemon's moves.
    if (movesState.length === 0){
        let loading = document.createElement('p');
        loading.textContent = 'Loading moves. Please wait...';
        loading.classList.add('p-loading-moves');
        document.querySelector('#left').appendChild(loading);
        let moveDataArray = [];
        for (let i = 0; i < moveData.length; i++){
            axios.get(`${moveData[i]}`)
            .then(res => {
                let data = res.data;
                moveDataArray.push({
                    name: data.names[7].name,
                    type: data.type.name,
                    power: (data.power === null) ? "-" : data.power,
                    accuracy: (data.accuracy === null) ? "-" : data.accuracy,
                    pp: data.pp,
                    effect: data.effect_entries[0].effect
                });
                if (moveDataArray.length === moveData.length){
                    dispatch({
                        type: MOVES,
                        moves: moveDataArray
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: ERROR
                })
            })
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