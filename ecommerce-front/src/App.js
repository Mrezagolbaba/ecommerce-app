import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Product} from "./containers/Product";
import {Home} from "./containers/Home";
import './App.css';


function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route  path="/:slug" component={Product}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
