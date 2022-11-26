import { PropertyDatabase } from './propertyDatabase.js'

export class App {
  resource

  constructor() {
    this.propertyDatabase = new PropertyDatabase();
  }

  run() {
    this.propertyDatabase.loadDatabase('default');
  }
}
