import { DATABASE_URL } from "./config.js";
import { SearchService } from "./controller/searchService.js";
import { PropertyDatabase } from "./model/propertyDatabase/propertyDatabase.js";
import { PropertyVisualizer } from "./view/propertyVisualizer.js";

export class App {
  constructor() {
    this.propertyDatabase = new PropertyDatabase();
    this.propertyVisualizer = new PropertyVisualizer(
      document.getElementById("PropertyVisualizer.render"),
      this.propertyDatabase
    );
    this.searchService = new SearchService(
      this.propertyDatabase,
      document.getElementById("searchService.input"),
      document.getElementById("searchService.search"),
      () => this.triggerRender()
    );
  }

  run() {
    this.propertyDatabase.loadDatabase(DATABASE_URL).then(() => this.triggerRender());
  }

  triggerRender() {
    this.propertyVisualizer.render();
  }
}
