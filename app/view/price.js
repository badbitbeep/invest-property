import { Currency } from "../model/propertyDatabase/price.js";
import { assert } from "../utils/assert.js";

export function getCurrencySymbol(currency) {
  switch (currency) {
    case Currency.Rub:
      return "₽";
    case Currency.Usd:
      return "$";
    case Currency.Eur:
      return "€";
    default:
      assert(false, "invalid currency");
  }
}
