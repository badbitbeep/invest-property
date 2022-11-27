export class FilterService {
  constructor(propertyDatabase, notifyFilter) {
    this.propertyDatabase = propertyDatabase;
    this.notifyFilter = notifyFilter;
    this.typeFilter = undefined;
    this.countryFilter = undefined;
    this.currencyFilter = undefined;
  }

  resetFiltering() {
    this.typeFilter = undefined;
    this.countryFilter = undefined;
    this.currencyFilter = undefined;
  }

  addTypeFilter(type) {
    this.typeFilter = type;
    this.updateFiltering();
  }

  addCountryFilter(country) {
    this.countryFilter = country;
    this.updateFiltering();
  }

  addCurrencyFilter(currency) {
    this.currencyFilter = currency;
    this.updateFiltering();
  }

  updateFiltering() {
    let filter = (property) => {
      if (this.typeFilter && property.type !== this.typeFilter) {
        return false;
      }
      if (this.countryFilter && property.location !== this.countryFilter) {
        return false;
      }
      if (this.currencyFilter && property.price.currency !== this.currencyFilter) {
        return false;
      }
      return true;
    };
    this.propertyDatabase.applyFilter(filter);
    this.notifyFilter();
  }
}
