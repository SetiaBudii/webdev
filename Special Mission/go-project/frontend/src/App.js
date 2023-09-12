import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TabelProduct from './pages/ListProduct';



function App() {
  return (

<Router forceRefresh={true}>
        <Switch>
          <Route path="/product">
            <TabelProduct />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
