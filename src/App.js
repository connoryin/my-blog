import { Router } from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';

import Posts from './posts'
import './App.css';

function App() {
  return (
      <Router>
        <Posts path="/" />
      </Router>
  );
}

export default App;
