import React from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import Form from './components/Form';
import Moveset from './components/Moveset';
import { formSubmit, inputChange } from './actions';
import { connect } from 'react-redux';


class App extends React.Component {

  inputHandler = () => {
    this.props.formSubmit(this.props.formText);
  }

  // When the component mounts, add event listener to make it so that pressing enter submits the form.
  componentDidMount(){
    const input = this.inputHandler
    const form = document.getElementsByTagName("input")[0];
    form.addEventListener('keypress', function(e){
      if (e.key === "Enter"){
        input();
      }
    })
  }

  render(){
    return (
      <>
        <div className="card">
          <img id="img-pokedex" alt="pokedex" src="/assets/pokedex.png"/>
          <Form />
          {/* showMoves used for alternating between the main page and the moves page. Only two pages exist so no need for router */}
          {this.props.showMoves === false ? <Pokemon/> : <Moveset/>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      formText: state.formText,
      showMoves: state.showMoves
  }   
}


export default connect(mapStateToProps, {formSubmit, inputChange})(App)
