import { assert } from "../../utils/assert.js";

export class PropertyDatabase {
  constructor() {
    this.properties = [];
  }

  async loadDatabase(address) {
    let response = await fetch(address);
    this.properties = await response.json();
  }

  get propertyCount() {
    return this.properties.length;
  }

  getProperties(skip, take) {
    assert(
      skip <= this.properties.length,
      "trying to skip more properties than exist in the db"
    );

    return this.properties.slice(skip, Math.min(skip + take, this.properties.length));
  }
}
