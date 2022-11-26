import { PropertyDatabase } from "./model/propertyDatabase/propertyDatabase.js";
import { PropertyVisualizer } from "./view/propertyVisualizer.js";

export class App {
  constructor() {
    this.propertyDatabase = new PropertyDatabase();
    this.propertyVisualizer = new PropertyVisualizer(
      document.getElementById("propertyList"),
      this.propertyDatabase
    );
  }

  run() {
    this.propertyDatabase
      .loadDatabase("database/property/database.json")
      .then(() => {
        this.propertyVisualizer.render();
      });
  }
}
