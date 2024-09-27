import { FaPeopleGroup } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { TbTransactionRupee } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";

const navbar = [
  {
    name: "Home",
    url: "/",
    icon: <IoHome />,
    size: "text-lg",
  },
  {
    name: "Friends",
    url: "/friends",
    subRoutes: ["transactions"],
    icon: <FaUserFriends />,
    size: "text-xl",
  },
  {
    name: "New Expense",
    url: "/new-spending",
    subRoutes: ["checkout"],
    icon: <TbTransactionRupee />,
    size: "text-xl",
  },
  {
    name: "Groups",
    url: "/groups",
    subRoutes: ["group"],
    icon: <FaPeopleGroup />,
    size: "text-xl",
  },
];

export default navbar;
