import React from 'react';
import { connect } from 'react-redux';
import { moveChange } from '../actions';


const Moveset = props => {
    return (
        <div id="div-moves-container">
            <p onClick={props.moveChange} id="p-move-change">&lt;&lt; Back</p>
            <h2 id="h2-pokemon-moves">{`${props.name}'s Moves`}</h2>
            <div id="div-moves-legend">
                <p className="p-move-leg">Move</p>
                <p className="p-type-leg">Type</p>
                <p className="p-pp-leg">PP</p>
                <p className="p-power-leg">Power</p>
                <p className="p-acc-leg">Accuracy</p>
                <p className="p-desc-leg">Description</p>
            </div>
            <div id="div-moves">
                {props.moves.map((move) => {
                    return (
                        <div key={Math.random()} className="div-move">
                            <div className="div-move-left">
                                <p className="p-move">{move.name}</p>
                                <p className={`p-type ${move.type}`}>{move.type}</p>
                                <p className="p-pp">{move.pp}</p>
                                <p className="p-power">{move.power}</p>
                                <p className="p-acc">{move.accuracy}</p>
                            </div>
                            <p className="p-desc">{move.effect}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        moves: state.moves,
        name: state.name
    }
}

export default connect(mapStateToProps, {moveChange})(Moveset)