import { FETCH, WRITE, ERROR, SPRITE, MOVES, MOVECHANGE } from '../actions';

/* Most these are Pokemon attributes. */
const initialState = {
    sprite: '',
    shinySprite: '',
    useSprite: '',
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    abilities: [],
    types: [],
    number: 0,
    name: '',
    formText: '',
    error: false,
    display: false,
    showMoves: false,
    moves: [],
    moveUrls: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case WRITE:
            // Used to update the form state. Fired every time the user makes a key press.
            return {
                ...state,
                formText: action.text
            }
        case SPRITE:
            // Used to toggle between the regular sprite and shiny sprite.
            if (state.useSprite === state.sprite){
                return {
                    ...state,
                    useSprite: state.shinySprite
                }
            } else {
                return {
                    ...state,
                    useSprite: state.sprite
                }
            }
        case FETCH:
            /* Main function to get a Pokemon's attributes. After using Axios to fetch data from the Pokemon API, the 
            data is sent here */
            let movesArray = action.data.moves;
            let stateMoves = [];
            movesArray.forEach((move) => {
                stateMoves.push(move.move.url);
            })
            let ptypes = [];
            action.data.types.map((type) => {
                ptypes.push(type.type.name);
                return "ok"
            })
            return {
                ...state,
                sprite: action.data.sprites.front_default,
                shinySprite: action.data.sprites.front_shiny,
                useSprite: action.data.sprites.front_default,
                hp: action.data.stats[0].base_stat,
                attack: action.data.stats[1].base_stat,
                defense: action.data.stats[2].base_stat,
                specialAttack: action.data.stats[3].base_stat,
                specialDefense: action.data.stats[4].base_stat,
                speed: action.data.stats[5].base_stat,
                abilities: [...action.data.abilities],
                types: [...ptypes],
                number: action.data.id,
                name: action.data.name,
                error: false,
                display: true,
                moveUrls: stateMoves,
                showMoves: false
            }
        case ERROR:
            // This event is fired in the "catch" blocks of promise-based events
            return {
                ...state,
                error: true,
                display: false
            }
        case MOVES: 
            // Writes moves to state, switches to moves page
            return {
                ...state,
                moves: action.moves,
                showMoves: true
            }
        case MOVECHANGE: 
            // Switches from moves page back to main page.
            return {
                ...state,
                showMoves: false
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer