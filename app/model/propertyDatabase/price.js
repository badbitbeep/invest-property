export const Currency = {
  Rub: "Russian Rubble",
  Eur: "Euro",
  Usd: "US Dollar",
};

export function makePrice(value, currency) {
  return {
    value,
    currency,
  };
}
