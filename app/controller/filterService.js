export class FilterService {
  constructor(propertyDatabase, userDatabase, notifyFilter) {
    this.propertyDatabase = propertyDatabase;
    this.userDatabase = userDatabase;
    this.notifyFilter = notifyFilter;
    this.typeFilter = undefined;
    this.countryFilter = undefined;
    this.currencyFilter = undefined;
    this.likesFilter = undefined;
  }

  resetFiltering() {
    this.typeFilter = undefined;
    this.countryFilter = undefined;
    this.currencyFilter = undefined;
    this.likesFilter = undefined;
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

  addLikesFilter(onlyLikes) {
    this.likesFilter = onlyLikes;
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
      if (this.likesFilter && !this.userDatabase.isPropertyLiked(property.id)) {
        return false;
      }
      return true;
    };
    this.propertyDatabase.applyFilter(filter);
    this.notifyFilter();
  }
}
