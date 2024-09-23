import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import GlobalLoader from "./components/common/GlobalLoader";
import ProtectedPage from "./pages/ProtectedPage";
import RedirectAlreadyLogin from "./pages/RedirectAlreadyLogin";
import NewSpendingPage from "./pages/NewSpendingPage";
import { useSelector } from "react-redux";
import CheckOutPage from "./pages/CheckOutPage";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "./hooks/useFetch";
import friendsApi from "./api/modules/friends";
import { setFriends } from "./store/functions/friends";
import Drawer from "./components/common/Drawer";
import FriendsPage from "./pages/FriendsPage";
import { ToastContainer } from "react-toastify";
import toasts from "./utils/toasts";

function App() {
  /* App comp here */

  // Store
  const ux = useSelector((store) => store.ux);

  // Fetch friends
  useFetch(friendsApi.getAllFriends, [], setFriends);

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
                  <Login />
                </RedirectAlreadyLogin>
              }
            />
            <Route
              path="/*"
              element={
                <>
                  <Drawer />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedPage>
                          <HomePage />
                        </ProtectedPage>
                      }
                    />
                    <Route
                      path="/new-spending"
                      element={
                        <ProtectedPage>
                          <NewSpendingPage />
                        </ProtectedPage>
                      }
                    />
                    <Route
                      path="/new-spending/checkout"
                      element={
                        <ProtectedPage>
                          <CheckOutPage />
                        </ProtectedPage>
                      }
                    />
                    <Route
                      path="/friends"
                      element={
                        <ProtectedPage>
                          <FriendsPage />
                        </ProtectedPage>
                      }
                    />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
