import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLoader from "./components/common/GlobalLoader";
import ProtectedPage from "./pages/ProtectedPage";
import RedirectAlreadyLogin from "./pages/RedirectAlreadyLogin";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import toasts from "./utils/toasts";
import AuthPage from "./pages/AuthPage";
import FullViewLayout from "./components/layout/FullViewLayout";
import { privateRoutes } from "./utils/routes";

function App() {
  /* App comp here */

  // Store
  const ux = useSelector((store) => store.ux);

  return (
    <>
      <div className="app">
        <Router>
          <ToastContainer style={toasts.style} />
          <GlobalLoader loading={ux.loading} />
          <Routes>
            <Route
              path="/login"
              element={
                <RedirectAlreadyLogin>
                  <FullViewLayout>
                    <AuthPage />
                  </FullViewLayout>
                </RedirectAlreadyLogin>
              }
            />
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedPage>{route.element}</ProtectedPage>}
              />
            ))}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
