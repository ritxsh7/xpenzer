const groupStyles = {
  input: "w-full p-3 outline-none rounded-sm border-b border-blue-400",
  friendList: "my-4 max-h-[70vh] overflow-y-scroll hide-scrollbar",
  display: {
    container:
      "flex items-center text-sm bg-[#1c1c1c] p-3 mb-3 rounded-lg shadow",
    details: "flex ml-4 text-left",
    name: "font-medium",
    activity: "text-gray-400",
  },
  button:
    "fixed flex items-center justify-center gap-2 bottom-4 w-[90%] bg-gradient-to-l from-blue-600 to-indigo-600 p-2 rounded-md right-[50%] translate-x-[50%] z-50",
  chat: {
    item: (isUser) =>
      `p-2 rounded-md w-[80%] relative ${isUser ? "ml-auto" : "ml-0"} `,
    profile: "flex text-xs items-center gap-2",
    button: "text-sm mt-3 text-blue-500",
    details: (isUser) =>
      `text-left mt-1 bg-[#121212] p-3 rounded-md ${isUser && "bg-blue-950"}`,
  },
  header: {
    wrapper: (expand) =>
      `flex relative transition-all ease-in-out items-center bg-[#121212] z-[100] p-3 ${
        expand ? "h-[100vh]" : "h-[10vh]"
      }`,
    name: "text-lg font-semibold",
    profile: (expand) => `text-left ${!expand && "ml-2"}`,
    back: "mr-1 text-xl fixed top-6 left-2",
    avatar: (expand) =>
      `${
        expand
          ? "transition-transform ease-in-out scale-150 flex-col fixed right-[50%] translate-x-[50%] top-10"
          : "left-12 top-6 flex-row ml-6"
      } flex items-center`,
    members: "text-[0.65rem]",
    icons: "flex text-xl ml-auto gap-1 items-center fixed top-6 right-6",
  },
  members: {
    text: "flex gap-2 items-center",
    wrapper: "w-full mb-[10vh]",
    header: "text-lg font-semibold text-left",
  },
};

export default groupStyles;
