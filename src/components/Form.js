import React from 'react';
import { connect } from 'react-redux';
import { inputChange, formSubmit } from '../actions';

const Form = (props) => {

    // This is the form at the top of the app where the user enters a Pokemon and submits it.
    return (
        <div id="form">
            <input type="text" placeholder="Enter a Pokemon" onChange={props.inputChange}></input>
            <button id="button" onClick={() => props.formSubmit(props.formText)}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        formText: state.formText,
    }   
}

export default connect(mapStateToProps, {inputChange, formSubmit})(Form)