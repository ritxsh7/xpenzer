export const homeStyles = {
  header: {
    container:
      "flex text-white items-center text-2xl justify-between font-semibold",
    left: "flex gap-4 items-center text-3xl",
    user: "flex items-center gap-1 ml-12",
    username: "text-lg ml-1",
  },
  banner: {
    thisMonth: "font-bold text-xl mb-2 text-left",
    container: "bg-[#303538] w-full rounded-lg text-[#83d4e2d1] p-3",
    heading: "text-xl text-left font-medium",
    amount: "text-[3rem] mt-2 font-bold mb-8 text-left",
    subbanner: "flex items-center justify-between",
    badge: (color) =>
      `font-medium text-left ${
        color === "red" ? "text-red-400" : "text-lime-600"
      }`,
    badgeTitle: "flex items-center",
    badgeName: "text-lg",
    badgeAmount: "ml-4",
  },
};
