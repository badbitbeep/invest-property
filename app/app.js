import { PROPERTY_DATABASE_URL, USER_DATABASE_NAME } from "./config.js";
import { FilterService } from "./controller/filterService.js";
import { SearchService } from "./controller/searchService.js";
import { CookieService } from "./controller/cookieService.js";
import { PropertyDatabase } from "./model/propertyDatabase/propertyDatabase.js";
import { UserDatabase } from "./model/UserDatabase/userDatabase.js";
import { FilterVisualizer } from "./view/filterVisualizer.js";
import { PropertyVisualizer } from "./view/propertyVisualizer.js";

export class App {
  constructor() {
    this.propertyDatabase = new PropertyDatabase();
    this.userDatabase = new UserDatabase();
    this.searchService = new SearchService(
      this.propertyDatabase,
      document.getElementById("searchService.input"),
      document.getElementById("searchService.search"),
      () => {
        this.filterService.resetFiltering();
        this.triggerRender();
      }
    );
    this.filterService = new FilterService(
      this.propertyDatabase,
      this.userDatabase,
      () => {
        this.searchService.resetSearch();
        this.triggerRender();
      }
    );
    this.cookieService = new CookieService();
    this.propertyVisualizer = new PropertyVisualizer(
      document.getElementById("PropertyVisualizer.render"),
      this.propertyDatabase,
      this.userDatabase
    );
    this.filterVisualizer = new FilterVisualizer(
      document.getElementById("FilterVisualizer.render"),
      this.filterService
    );
  }

  run() {
    Promise.all([
      this.propertyDatabase.loadDatabase(PROPERTY_DATABASE_URL),
      this.userDatabase.loadDatabase(this.cookieService),
    ]).then(() => this.triggerRender());
    this.userDatabase;
  }

  triggerRender() {
    this.propertyVisualizer.resetPaging();
    this.propertyVisualizer.render();
    this.filterVisualizer.render();
  }
}
