import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import GlobalLoader from "./components/common/GlobalLoader";
import { useSelector } from "react-redux";

function App() {
  const ux = useSelector((store) => store.ux);

  return (
    <div className="app">
      <GlobalLoader loading={ux.loading} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
