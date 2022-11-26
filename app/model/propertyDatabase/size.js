export const Dimension = {
  Meters2: "Meters Squared",
  Feet2: "Feet Squared",
};

export function makeSize(value, dimension) {
  return {
    value,
    dimension,
  };
}
