export class FilterService {
  constructor(propertyDatabase, notifyFilter) {
    this.propertyDatabase = propertyDatabase;
    this.notifyFilter = notifyFilter;
    this.typeFilter = undefined;
    this.countryFilter = undefined;
  }

  resetFiltering() {
    this.typeFilter = undefined;
    this.countryFilter = undefined;
  }

  addTypeFilter(type) {
    this.typeFilter = type;
    this.updateFiltering();
  }

  addCountryFilter(country) {
    this.countryFilter = country;
    this.updateFiltering();
  }

  updateFiltering() {
    let filter = (property) => {
      if (this.typeFilter !== undefined && property.type !== this.typeFilter) {
        return false;
      }
      if (
        this.countryFilter !== undefined &&
        property.location !== this.countryFilter
      ) {
        return false;
      }
      return true;
    };
    this.propertyDatabase.applyFilter(filter);
    this.notifyFilter();
  }
}
