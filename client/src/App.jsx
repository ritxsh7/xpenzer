import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
