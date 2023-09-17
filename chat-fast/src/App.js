import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Join from "./components/Join.js";
import Login from "./components/Login.js";
import Chatfast from "./components/Chatfast.js";
import Avathar from "./components/Avathar.js";


// const ENDPOINT="http://localhost:5000/";
// const socket=socketIO(ENDPOINT,{transports : ['websocket']});
function App() {

  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/register" element={<Join />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/avathar" element={<Avathar />}/>
        <Route path="/" element={<Chatfast />}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
