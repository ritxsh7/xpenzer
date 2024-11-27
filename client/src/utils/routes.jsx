import HomePage from "../pages/HomePage";
import GroupChatPage from "../pages/GroupChatPage";
import NewSpendingPage from "../pages/NewSpendingPage";
import CheckOutPage from "../pages/CheckOutPage";
import FriendsPage from "../pages/FriendsPage";
import FriendDetailsPage from "../pages/FriendDetailsPage";
import GroupsPage from "../pages/GroupsPage";
import AppLayout from "../components/layout/AppLayout";
import FullViewLayout from "../components/layout/FullViewLayout";
import ProfilePage from "../pages/ProfilePage";

export const privateRoutes = [
  {
    path: "/",
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
  {
    path: "/new-spending",
    element: (
      <AppLayout>
        <NewSpendingPage />
      </AppLayout>
    ),
  },
  {
    path: "/new-spending/checkout",
    element: (
      <AppLayout>
        <CheckOutPage />
      </AppLayout>
    ),
  },
  {
    path: "/friends",
    element: (
      <AppLayout>
        <FriendsPage />
      </AppLayout>
    ),
  },
  {
    path: "/friends/transactions/:id",
    element: (
      <AppLayout>
        <FriendDetailsPage />
      </AppLayout>
    ),
  },
  {
    path: "/groups",
    element: (
      <AppLayout>
        <GroupsPage />
      </AppLayout>
    ),
  },
  {
    path: "/groups/group/:id",
    element: (
      <FullViewLayout>
        <GroupChatPage />
      </FullViewLayout>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <AppLayout>
        <ProfilePage />
      </AppLayout>
    ),
  },
];
