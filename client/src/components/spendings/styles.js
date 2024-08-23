export const spendingStyles = {
  container: "p-5 h-[100vh] flex flex-col",
  form: {
    container: "bg-transparent p-4 my-4",
    input: {
      label: "text-lg text-[#5C6AF5] my-4",
      field: "p-4 rounded-md w-full text-lg",
    },
    dropdown:
      "w-full max-h-[200px] rounded-md px-4 overflow-y-scroll my-4 bg-[#121212] hide-scrollbar",
  },
  friendItem: {
    container: "text-lg flex items-center gap-3 py-2",
  },
  searchBar: {
    label: "text-lg text-[#5C6AF5] my-2 text-left text-sm",
    container: "flex bg-[#121212] items-center px-2 rounded-md",
    icon: "text-xl text-gray-400",
  },
  button: "bg-[#5c6af5] my-8 w-full p-4 rounded-md",
  contributor: {
    container: (showInput) =>
      `w-full text-lg flex items-center gap-3 p-2 ${
        showInput && "my-2"
      } bg-[#121212] rounded-md`,
  },
  checkBox: "custom-checkbox",
};
