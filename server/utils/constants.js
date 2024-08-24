export const dateNow = {
  options: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
};

export const timeNow = {
  options: {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  },
};

const currentDate = new Date();
export const daysOfMonth = {
  startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
};
