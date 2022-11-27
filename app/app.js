import { DATABASE_URL } from "./config.js";
import { FilterService } from "./controller/filterService.js";
import { SearchService } from "./controller/searchService.js";
import { PropertyDatabase } from "./model/propertyDatabase/propertyDatabase.js";
import { FilterVisualizer } from "./view/filterVisualizer.js";
import { PropertyVisualizer } from "./view/propertyVisualizer.js";

export class App {
  constructor() {
    this.propertyDatabase = new PropertyDatabase();
    this.searchService = new SearchService(
      this.propertyDatabase,
      document.getElementById("searchService.input"),
      document.getElementById("searchService.search"),
      () => {
        this.filterService.resetFiltering();
        this.triggerRender();
      }
    );
    this.filterService = new FilterService(this.propertyDatabase, () => {
      this.searchService.resetSearch();
      this.triggerRender();
    });
    this.propertyVisualizer = new PropertyVisualizer(
      document.getElementById("PropertyVisualizer.render"),
      this.propertyDatabase
    );
    this.filterVisualizer = new FilterVisualizer(
      document.getElementById("FilterVisualizer.render"),
      this.filterService
    );
  }

  run() {
    this.propertyDatabase
      .loadDatabase(DATABASE_URL)
      .then(() => this.triggerRender());
  }

  triggerRender() {
    this.propertyVisualizer.resetPaging();
    this.propertyVisualizer.render();
    this.filterVisualizer.render();
  }
}
