import Login from "./Login";
import Registro from "./Registro";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Profile from "./Profile";

function App() {
  return (
      <Router>
          {}
          <Routes>
              <Route  exact path="/" element={<Login/>} ></Route>
              <Route  exact path="/register" element={<Registro/>} ></Route>
              <Route  exact path="/login" element={<Login/>} ></Route>
              <Route  exact path="/profile" element={<Profile/>} ></Route>
          </Routes>

      </Router>
  );
}

export default App;
