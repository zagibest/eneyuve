export const moneyFormat = (money?: number | null) => {
  if (!money) return "0";
  return new Intl.NumberFormat().format(money);
};
