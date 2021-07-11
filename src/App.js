import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/home';
import Header from './components/header';
import Favorites from './screens/favorites';


function App() {
  return (
    <div className="App container"> 
        <Header/>
        <Router>
          <Route exact path="/" component={Home} /> 
          <Route exact path="/my-pokemons" component={Favorites} /> 
        </Router>
  </div>
  );
}

export default App;
