export const dateFormat = {
  weekday: "short",
  day: "2-digit",
  month: "short",
};

export const formatDateForInput = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const currentMonth = () =>
  new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "2-digit",
  });
