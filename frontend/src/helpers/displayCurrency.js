const displayMNTCurrency = (num) => {
  const formatter = new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
};

export default displayMNTCurrency;
