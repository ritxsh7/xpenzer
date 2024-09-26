export default {
  friendsPage: {
    wrapper: "mt-4 text-white bg-black min-h-screen",
    stats: "flex justify-between",
    searchBar: "flex items-center h-[3rem] mb-6 gap-4 text-sm",
    icon: "text-2xl",
    message: "text-center text-gray-400",
  },
  newFriend: {
    wrapper: (isOpen) =>
      `top-0 left-0 fixed max-w-md  h-full w-full bg-black p-4 rounded-lg shadow-lg transform transition-all ease-in-out duration-300 ${
        isOpen
          ? "translate-x-0 md:translate-x-[35vw]"
          : "translate-x-full md:translate-x-[100vw]"
      } `,
    icon: "flex justify-end",
    iconCross: "text-2xl text-gray-400 cursor-pointer fixed top-4 right-4",
    header: "text-lg text-[#5c6af5] text-left font-bold mb-4 ",
    search:
      "w-full p-3 mb-4 bg-[#121212] text-white text-sm border-none rounded-xl",
    searchBar: {
      wrapper: "relative w-5/6",
      icon: "absolute left-3 top-[50%] -translate-y-[50%] text-gray-400",
      input: "w-full bg-[#121212] text-white py-3 px-10 rounded-xl",
    },
    left: "flex items-center gap-2",
    contactList: "",
    searchResult: {
      wrapper:
        "flex justify-between items-center p-2 text-white bg-[#1E1E1E] rounded-md mb-2 hover:bg-[#333] cursor-pointer",
      contact: "text-sm text-gray-500",
      button: "text-[#5C6AF5]",
      message: "text-center mt-8 text-gray-400",
    },
  },
  friendCard: {
    wrapper:
      "flex items-center justify-between p-3 mb-3  bg-[#1f1f1f] rounded-lg shadow-md",
    avatar: "flex items-center justify-between",
    name: "ml-3 text-sm",
    amount: (balance) =>
      `text-sm font-semibold ${
        balance > 0
          ? "text-red-600"
          : balance < 0
          ? "text-lime-600"
          : "text-gray-400"
      }`,
  },
  transactions: {
    wrapper: "bg-[#1f1f1f] rounded-md",
    settle: "mt-1 text-sm font-semibold cursor-pointer text-blue-400 underline",
    settled: "mt-1 text-xs font-semibold cursor-pointer text-blue-500 ",
    description: "text-sm",
    date: "text-[14px] text-gray-400",
  },
};
