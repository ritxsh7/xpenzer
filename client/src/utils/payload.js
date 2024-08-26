export const prepareSpendingPayload = (contributors) => {
  const payload = contributors.reduce(
    (accumulator, contri) => {
      if (contri.isRegistered) {
        accumulator.registered.push(contri);
      } else if (contri.isUnregistered) {
        accumulator.unregistered.push(contri);
      } else {
        accumulator.user = contri;
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
