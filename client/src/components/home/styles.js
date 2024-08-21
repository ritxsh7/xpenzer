export const homeStyles = {
  header: {
    container: "text-white items-center text-2xl font-semibold",
    left: "flex gap-4 items-center",
    user: "flex items-center gap-1 ml-2 mt-2",
    username: "text-lg ml-1",
    wrapper: "flex justify-between items-center gap-5",
    right: "flex gap-2 text-md",
  },
  banner: {
    thisMonth: "font-medium text-lg mb-2 text-left",
    container:
      "bg-[#27262B] min-h-[12rem] w-full my-10 rounded-lg text-[#83d4e2d1] p-3",
    heading: "text-md text-[#E5E5E5] text-left",
    month: "text-left text-[#5C6AF5] text-lg",
    amount: "text-[2rem] mt-2 font-medium mb-8 text-left text-white",
    subbanner: "flex items-center gap-4",
    badgeTitle: "flex items-center",
    badgeName: "text-xs ml-1 text-[#E5E5E5]",
    arrow: (color) => (color === "red" ? "text-orange-600" : "text-lime-500"),
    badgeAmount: (color) =>
      `text-left ml-1 font-medium text-md tracking-[0.2rem] ${
        color === "red" ? "text-orange-600" : "text-lime-500"
      }`,
  },
  user: {
    container: "flex items-center gap-2 mt-8",
    icon: "w-12 h-12 rounded-full bg-[#334A50] flex items-center justify-center",
    message: "ml-2 text-left",
  },
  switchTab: {
    wrapper: "w-full max-w-md mx-auto",
    subContainer: "flex w-full bg-[#27262B] rounded-full",
    bg: "w-[50%] text-center py-4 rounded-full cursor-pointer text-gray-400",
    active: "bg-[#5C6AF5] text-white",
  },
  spendingItemList: {
    wrapper: "w-full p-1 my-4 max-w-md mx-auto bg-[#27262B] rounded-lg",
    container: "flex justify-between bg-[#27262B] p-3 rounded-lg",
    left: "flex flex-col items-start",
    right: "flex flex-col justify-center text-orange-600 tracking-[0.2rem]",
    expandable: "",
  },
  contributor: {
    container: "px-2 py-2 flex items-center justify-between",
    profile: "text-lg flex items-center gap-3",
    amount: "text-lime-500",
  },
  image: {
    imgWrapper: "flex flex-row items-center",
    imgContainer: "w-4 z-30 translate-x-2",
    imgStyle: "rounded-full",
  },
  newIcon:
    "w-[4.5rem] h-[4.5rem] flex items-center justify-center text-4xl rounded-[50%] fixed bottom-6 right-6 bg-[#5C6AF5]",
};
