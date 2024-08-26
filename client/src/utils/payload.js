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
      return accumulator;
    },
    {
      registered: [],
      unregistered: [],
      user: null,
    }
  );
  return payload;
};
