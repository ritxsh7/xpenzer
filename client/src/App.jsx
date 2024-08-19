import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import GlobalLoader from "./components/common/GlobalLoader";
import { useSelector } from "react-redux";
import ProtectedPage from "./pages/ProtectedPage";
import AuthProvider from "./pages/AuthProvider";
import RedirectAlreadyLogin from "./pages/RedirectAlreadyLogin";

function App() {
  const ux = useSelector((store) => store.ux);

  return (
    <AuthProvider>
      <div className="app">
        <GlobalLoader loading={ux.loading} />
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <RedirectAlreadyLogin>
                  <Login />
                </RedirectAlreadyLogin>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedPage>
                  <HomePage />
                </ProtectedPage>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;