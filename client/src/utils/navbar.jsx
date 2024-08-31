import { IoIosSearch } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";

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
    icon: <MdPeopleAlt />,
    size: "text-xl",
  },
  {
    name: "New Expense",
    url: "/new-spending",
    icon: <RiPlayListAddFill />,
    size: "text-xl",
  },
  {
    name: "Search",
    url: "/search",
    icon: <IoIosSearch />,
    size: "text-xl",
  },
];

export default navbar;
