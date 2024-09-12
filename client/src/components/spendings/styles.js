export const spendingStyles = {
  container: "p-5 h-[100vh] flex flex-col",
  form: {
    container: "bg-transparent p-4 my-4",
    input: {
      label: "text-sm text-[#5C6AF5] mt-3 mb-2",
      field: "p-3 rounded-md w-full text-sm",
    },
    dropdown:
      "w-full max-h-[200px] rounded-md px-4 overflow-y-scroll my-4 bg-[#121212] hide-scrollbar",
    unregistered: {
      wrapper: "text-xs p-2",
      btn: "bg-[#5c6af5] p-2 my-5 rounded-md",
    },
  },
  contributorList: "grid grid-cols-2 gap-2 my-2",
  friendItem: {
    container: "text-lg flex items-center gap-3 py-2",
  },
  searchBar: {
    label: "text-lg text-[#5C6AF5] my-2 text-left text-sm",
    container: "flex bg-[#121212] items-center rounded-md",
    icon: "text-xl text-gray-400 absolute ml-2",
  },
  button: "bg-[#5c6af5] my-8 w-full p-3 rounded-md text-sm",
  checkBox: "custom-checkbox",
  checkoutPage: {
    container: "p-5 flex flex-col items-center h-svh",
    summary: "flex flex-col items-center relative min-h-[90vh]",
    amount: "mt-8 text-lg text-[#5c6af5]",
    amountEdit: "flex my-4 flex-col items-center justify-center",
    amountInput:
      "w-[50%] max-w-full h-[3rem] bg-transparent outline-none mx-2 px-2 text-center text-3xl",
    description: "text-sm bg-[#121212] w-[50%] p-2 mb-8 rounded-md",
  },
  contributor: {
    wrapper: "flex gap-2 items-center",
    input: "flex w-[40%] ml-auto gap-2 items-center",
    field: "w-full outline-none text-gray-400 text-sm p-2 rounded-md",
    checkbox: "checkBox",
    container: (showInput) =>
      `w-full text-lg flex items-center gap-3 p-2 ${
        showInput && "my-2 p-4"
      } bg-[#121212] rounded-md`,
  },
};
