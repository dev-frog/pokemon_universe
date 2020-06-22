import React from 'react';
import './asset/css/bootstrap.min.css';
import './asset/css/style.css'
import './Pokemon';
import './pokedex';
import { Switch, Route } from 'react-router-dom';
import Pokedex from './pokedex';
import Pokemon from './Pokemon';


function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} /> } />
      <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
}

export default App;
