import { Dimension } from "../model/propertyDatabase/size.js";
import { assert } from "../utils/assert.js";

export function getDimensionSymbol(dimension) {
  switch (dimension) {
    case Dimension.Meters2:
      return "M²";
    case Dimension.Feet2:
      return "ft²";
    default:
      assert(false, "invalid dimension");
  }
}
