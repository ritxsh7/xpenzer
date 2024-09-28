export const homeStyles = {
  container: "min-h-[110vh] pb-32",
  header: {
    container:
      "text-white items-center text-2xl font-semibold w-full cursor-pointer",
    left: "flex flex-col items-center",
    user: "flex items-center gap-1 ml-2 mt-2",
    username: "text-lg ml-1",
    wrapper: "flex justify-between items-center gap-5",
    right: "flex gap-2 text-md",
    logo: "w-[40vw] max-w-[10rem]",
  },
  banner: {
    thisMonth: "text-sm mb-2 text-left",
    container:
      "bg-[#27262B] min-h-[8rem] w-full mb-8 rounded-lg text-[#83d4e2d1] p-3",
    heading: "text-sm text-[#5C6AF5] text-left",
    month: "text-left text-[#5C6AF5] text-sm",
    amount: "text-[1.5rem] mt-2 font-medium mb-4 text-left text-white",
    subbanner: "flex items-center gap-8",
    badgeTitle: "flex items-center",
    badgeName: "text-[11px] ml-1 text-[#E5E5E5]",
    arrow: (color) =>
      color === "red" ? "text-orange-600 text-sm" : "text-lime-500 text-sm",
    badgeAmount: (color) =>
      `text-left ml-6 mt-1 font-medium text-xs tracking-[0.15rem] ${
        color === "red" ? "text-orange-600" : "text-lime-500"
      }`,
  },
  user: {
    container: "flex items-center gap-2 mt-6",
    icon: "w-10 h-10 rounded-full bg-[#334A50] flex items-center justify-center",
    message: "ml-2 text-left",
  },
  switchTab: {
    wrapper: "w-full max-w-md mx-auto",
    subContainer: "flex w-full bg-[#27262B] rounded-full",
    bg: "w-[50%] text-center py-3 rounded-full cursor-pointer text-gray-400 text-sm",
    active: "bg-[#5C6AF5] text-white",
  },
  spendingItemList: {
    wrapper: "w-full p-1 my-4 max-w-md mx-auto bg-[#1f1f1f] rounded-lg",
    container: "flex justify-between bg-[#1f1f1f] p-1 rounded-lg",
    left: "flex flex-col items-start",
    right: (plus) =>
      `flex flex-col text-sm justify-center ${
        plus ? "text-lime-500" : "text-red-500"
      } tracking-[0.2rem]`,
    expandable: "",
  },
  contributor: {
    container: "px-2 py-2 flex items-center justify-between",
    profile: "text-lg flex items-center gap-3",
    amount: "text-lime-500 text-sm",
    username: "text-sm",
    status: "flex items-center text-sm text-[#5C6AF5] gap-1",
  },
  image: {
    imgWrapper: "flex flex-row items-center",
    imgContainer: "w-4 z-30 translate-x-2",
    imgStyle: "rounded-full",
  },
  newIcon:
    "w-[4rem] h-[4rem] flex items-center justify-center text-4xl rounded-[50%] fixed bottom-20 right-2 bg-[#5C6AF5]",
};
