import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/home';
import Header from './components/header';
import Favorites from './screens/favorites';


function App() {
  return (
    <Router>
    <div className="App container"> 
        <Header/> 
            <Route exact path="/" component={Home} /> 
            <Route exact path="/my-pokemons" component={Favorites} />  
      </div>
  </Router>
  );
}

export default App;
