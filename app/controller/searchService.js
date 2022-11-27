import { DEFAULT_FILTER } from "../model/propertyDatabase/propertyDatabase.js";

export class SearchService {
  constructor(
    propertyDatabase,
    searchInputElement,
    searchCommandElement,
    notifySearch
  ) {
    this.propertyDatabase = propertyDatabase;
    this.searchInputElement = searchInputElement;
    this.searchCommandElement = searchCommandElement;
    this.notifySearch = notifySearch;

    this.searchCommandElement.onclick = () =>
      this.search(this.searchInputElement.value);
    this.searchInputElement.onkeydown = (e) => {
      if (e.code === "Enter") this.search(this.searchInputElement.value);
    };
  }

  search(text) {
    let searchWords = text.split(" ").filter((word) => word);

    if (searchWords.length === 0) {
      this.propertyDatabase.applyFilter(DEFAULT_FILTER);
    } else {
      let filter = (property) => {
        if (searchWords.indexOf(property.type) !== -1) {
          return true;
        }

        let location = property.location.split(" ");
        for (let searchWord of searchWords) {
          if (location.indexOf(searchWord) !== -1) {
            return true;
          }
        }

        let description = property.description.split(" ");
        for (let searchWord of searchWords) {
          if (description.indexOf(searchWord) !== -1) {
            return true;
          }
        }
        return false;
      };
      this.propertyDatabase.applyFilter(filter);
    }
    this.notifySearch();
  }
}
