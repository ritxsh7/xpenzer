import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalLoader from "./components/common/GlobalLoader";
import ProtectedPage from "./pages/ProtectedPage";
import RedirectAlreadyLogin from "./pages/RedirectAlreadyLogin";
import NewSpendingPage from "./pages/NewSpendingPage";
import { useSelector } from "react-redux";
import CheckOutPage from "./pages/CheckOutPage";
import "react-toastify/dist/ReactToastify.css";
import FriendsPage from "./pages/FriendsPage";
import { ToastContainer } from "react-toastify";
import toasts from "./utils/toasts";
import FriendDetailsPage from "./pages/FriendDetailsPage";
import AuthPage from "./pages/AuthPage";
import GroupsPage from "./pages/GroupsPage";
import GroupChatPage from "./pages/GroupChatPage";
import AppLayout from "./components/layout/AppLayout";
import FullViewLayout from "./components/layout/FullViewLayout";

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
            <Route
              path="/groups/group/:id"
              element={
                <ProtectedPage>
                  <FullViewLayout>
                    <GroupChatPage />
                  </FullViewLayout>
                </ProtectedPage>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedPage>
                  <AppLayout>
                    <HomePage />
                  </AppLayout>
                </ProtectedPage>
              }
            />
            <Route
              path="/new-spending"
              element={
                <ProtectedPage>
                  <AppLayout>
                    <NewSpendingPage />
                  </AppLayout>
                </ProtectedPage>
              }
            />
            <Route
              path="/new-spending/checkout"
              element={
                <ProtectedPage>
                  <AppLayout>
                    <CheckOutPage />
                  </AppLayout>
                </ProtectedPage>
              }
            />
            <Route
              path="/friends"
              element={
                <ProtectedPage>
                  <AppLayout>
                    <FriendsPage />
                  </AppLayout>
                </ProtectedPage>
              }
            />
            <Route
              path="/friends/transactions/:id"
              element={
                <ProtectedPage>
                  <AppLayout>
                    <FriendDetailsPage />
                  </AppLayout>
                </ProtectedPage>
              }
            />
            <Route
              path="/groups"
              element={
                <ProtectedPage>
                  <AppLayout>
                    <GroupsPage />
                  </AppLayout>
                </ProtectedPage>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
