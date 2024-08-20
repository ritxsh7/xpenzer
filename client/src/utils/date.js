export const dateFormat = {
  weekday: "short",
  day: "2-digit",
  month: "short",
};

export const currentMonth = () =>
  new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "2-digit",
  });
