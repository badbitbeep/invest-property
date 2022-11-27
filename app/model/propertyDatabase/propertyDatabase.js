import { assert } from "../../utils/assert.js";

export const DEFAULT_FILTER = (_property) => true;

export class PropertyDatabase {
  constructor() {
    this.properties = [];
    this.filteredProperties = [];
  }

  async loadDatabase(address) {
    let response = await fetch(address);
    this.properties = await response.json();
    this.applyFilter(DEFAULT_FILTER);
  }

  get propertyCount() {
    return this.filteredProperties.length;
  }

  applyFilter(filter) {
    this.filteredProperties = this.properties.filter(filter);
  }

  getProperties(skip, take) {
    assert(
      skip <= this.propertyCount,
      "trying to skip more properties than exist in the db"
    );

    return this.filteredProperties.slice(skip, Math.min(skip + take, this.propertyCount));
  }
}
