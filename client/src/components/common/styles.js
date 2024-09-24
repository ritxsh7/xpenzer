export default {
  dateRange: {
    container: "flex flex-col items-center my-6",
    wrapper: "flex justify-around rounded-md items-center",
    icon: "text-sm text-white",
    input:
      "bg-transparent border-b-[1px] border-[#aaaaa] p-2 text-xs w-[5rem] outline-none text-yellow-100",
  },
  drawer: {
    container:
      "fixed bg-[#121212] z-10 bottom-0 text-left flex w-full py-3 px-2 items-center justify-around max-w-[450px] mx-auto",
    link: (pathname, url, subRoutes) =>
      `flex flex-col items-center h-10 justify-between ${
        pathname === url || subRoutes?.includes(pathname.split("/")[2])
          ? "text-blue-600 font-medium"
          : ""
      }`,
    name: "text-xs",
  },
};
