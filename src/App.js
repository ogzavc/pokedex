import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './screens/home';
import Header from './components/header';
import Favorites from './screens/favorites';


function App() {
  return ( 
      <div className="App container"> 
       <Router>
          <Header/> 
            <Switch> 
              <Route exact path="/" component={Home} /> 
              <Route exact path="/my-pokemons" component={Favorites} />  
            </Switch> 
        </Router>
      </div> 
  );
}

export default App;
