import React from 'react';
import { connect } from 'react-redux';
import { changeSprite, moveFetch } from '../actions';

const Pokemon = props => {
    
    /* Used to create the "types" section. A Pokemon can have one or two types. Each type is a class in the css so that they have the properly colored backgrounds. Also, each type can be clicked on and it will open up the pokemon encyclopedia page for that type. */
    const types = props.types.map((type) => {
        let classes = `type ${type}`
        let hrefWindowText = () => {
            window.open(`https://bulbapedia.bulbagarden.net/wiki/${type}_(type)`)
        }
        return <p onClick={hrefWindowText} key={Math.random()}><span className={classes}>{type}</span></p>
    })

    /* This function is used to properly format the url to the Pokemon encyclopedia for the Pokemon's ability. For abilities that are more than one word long, in the Pokemon API separates the words with dashes, whereas in the url, the words are separated by underscores. So, this block changes the dashes to underscores. */
    const abilities = props.abilities.map((ability) => {
        let letters = ability.ability.name.split("");
        letters[0] = letters[0].toUpperCase();
        for (let i = 0; i < letters.length; i++){
            if (letters[i] === "-"){
                letters[i] = "_"
                letters[i+1] = letters[i+1].toUpperCase();
            }
        }
        let newString = letters.join('');
        let abilityRedirect = () => {
            window.open(`https://bulbapedia.bulbagarden.net/wiki/${newString}_(Ability)`)
        }
        return <p className="hover-pointers" onClick={abilityRedirect} key={Math.random()}>{ability.ability.name}</p>
    })

    // Clicking on a Pokemon's name will open their page in the Pokemon encyclopedia.
    const nameRedirect = () => {
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${props.name}`)
    }
    const off = 20;
    if (props.error){
        return <div id="error">An error occurred</div>
    } else {
        return (
            props.display ? 
            <div id="pokemon">
                <div id="left">
                    <p onClick={nameRedirect} className="pokemon-name hover-pointers">{props.name}<sup style={{fontSize: "18px"}}> #{props.number}</sup></p>
                    <img className="sprites" alt={props.name} src={props.useSprite}></img>
                    <div id="types-abilities">
                        <div className="types">Types: <span id="span-types">{types}</span></div>
                        <div className="abilities">Abilities: <span className="abilities-list">{abilities}</span></div>
                    </div>
                    <button id="button-check-moves" onClick={() => props.moveFetch(props.moveData, props.moves)}>Check moves</button>
                </div>
                <div id="right">
                    <div id="left-stats">
                        <p>HP: <span style={{color: `hsl(${props.hp - off}, 100%, 50%)`}}>{props.hp}</span></p>
                        <p>ATTACK: <span style={{color: `hsl(${props.attack - off}, 100%, 50%)`}}>{props.attack}</span></p>
                        <p>DEFENSE: <span style={{color: `hsl(${props.defense - off}, 100%, 50%)`}}>{props.defense}</span></p>
                        <p>SPECIAL ATTACK: <span style={{color: `hsl(${props.specialAttack - off}, 100%, 50%)`}}>{props.specialAttack}</span></p>
                    </div>
                    <div id="right-stats">
                        <p>SPECIAL DEFENSE: <span style={{color: `hsl(${props.specialDefense - off}, 100%, 50%)`}}>{props.specialDefense}</span></p>
                        <p>SPEED: <span style={{color: `hsl(${props.speed - off}, 100%, 50%)`}}>{props.speed}</span></p>
                        <p>TOTAL: <span style={{color: `hsl(${(props.speed + props.hp + props.attack + props.defense + props.specialDefense + props.specialAttack)/6 - off}, 100%, 50%)`}}>{(props.speed + props.hp + props.attack + props.defense + props.specialDefense + props.specialAttack)}</span></p>
                    </div>
                </div>
                <img onClick={props.changeSprite} src='star.png' alt="shiny star" id="shiny-star"></img>
            </div> :
            <div></div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        sprite: state.sprite,
        shinySprite: state.shinySprite,
        useSprite: state.useSprite,
        hp: state.hp,
        attack: state.attack,
        defense: state.defense,
        specialAttack: state.specialAttack,
        specialDefense: state.specialDefense,
        speed: state.speed,
        abilities: state.abilities,
        types: state.types,
        number: state.number,
        name: state.name,
        display: state.display,
        error: state.error,
        moveData: state.moveUrls,
        moves: state.moves
    }
}

export default connect(mapStateToProps, {changeSprite, moveFetch})(Pokemon)