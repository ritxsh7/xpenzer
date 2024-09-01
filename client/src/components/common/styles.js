export default {
  drawer: {
    container:
      "fixed bg-[#121212] z-10 bottom-0 text-left flex w-full py-3 px-2 items-center justify-around max-w-[450px] mx-auto",
    link: (pathname, url) =>
      `flex flex-col items-center h-10 justify-between ${
        pathname == url ? "text-blue-600 font-medium" : ""
      }`,
    name: "text-xs",
  },
};
