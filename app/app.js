import { DATABASE_URL } from "./config.js";
import { PropertyDatabase } from "./model/propertyDatabase/propertyDatabase.js";
import { PropertyVisualizer } from "./view/propertyVisualizer.js";

export class App {
  constructor() {
    this.propertyDatabase = new PropertyDatabase();
    this.propertyVisualizer = new PropertyVisualizer(
      document.getElementById("PropertyVisualizer.render"),
      this.propertyDatabase
    );
  }

  run() {
    this.propertyDatabase.loadDatabase(DATABASE_URL).then(() => {
      this.propertyVisualizer.render();
    });
  }
}
