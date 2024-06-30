import './App.css';
import ListComponent from './components/ListComponent';
import { Navbar } from './routing/navbar';
import { Routing } from './routing/routing';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
   <div>

<Router>
      <div>
        <Navbar />
        <Routing />
      </div>
    </Router>
   </div>
  );
}

export default App;
{/* <ListComponent></ListComponent> */}