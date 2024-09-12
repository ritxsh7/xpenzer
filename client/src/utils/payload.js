export const prepareSpendingPayload = (contributors) => {
  const payload = contributors.reduce(
    (accumulator, contri) => {
      if (contri.isUser) {
        accumulator.user = contri;
      } else {
        if (contri.isRegistered) {
          accumulator.registered.push(contri);
        } else {
          accumulator.unregistered.push(contri);
        }
      }
      accumulator.total = accumulator.total + Number(contri.amount);
      return accumulator;
    },
    {
      registered: [],
      unregistered: [],
      user: null,
      total: 0,
    }
  );
  return payload;
};
