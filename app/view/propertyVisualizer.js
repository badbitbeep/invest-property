import { getCurrencySymbol } from "./price.js";
import { getDimensionSymbol } from "./size.js";

const MAX_ELEMENTS_PER_PAGE = 10;

export class PropertyVisualizer {
  constructor(rootElement, propertyDatabase) {
    this.rootElement = rootElement;
    this.propertyDatabase = propertyDatabase;
    this.maxElementsPerPage;
    this.currentPage = 0;
  }

  get pageCount() {
    return Math.ceil(
      this.propertyDatabase.propertyCount / MAX_ELEMENTS_PER_PAGE
    );
  }

  renderPropertyPrice(propertyPrice) {
    let currencySymbol = getCurrencySymbol(propertyPrice.currency);
    return `${propertyPrice.value} ${currencySymbol}`;
  }

  renderPropertySize(propertySize) {
    let dimensionSymbol = getDimensionSymbol(propertySize.dimension);
    return `${propertySize.value} ${dimensionSymbol}`;
  }

  appendTextElement(text, style, parent) {
    let element = document.createElement("div");
    element.classList.add(style);
    parent.appendChild(element);

    let textElement = document.createElement("span");
    textElement.innerText = text;
    element.appendChild(textElement);
  }

  appendImageElement(url, style, parent) {
    let element = document.createElement("div");
    element.classList.add(style);
    element.style.backgroundImage = `url(${url})`;
    parent.appendChild(element);
  }

  render() {
    let propertiesForPage = this.propertyDatabase.getProperties(
      this.currentPage * MAX_ELEMENTS_PER_PAGE,
      MAX_ELEMENTS_PER_PAGE
    );

    for (let property of propertiesForPage) {
      let element = document.createElement("div");
      element.classList.add("property");

      let propertyPrice = this.renderPropertyPrice(property.price);
      this.appendTextElement(propertyPrice, "propertyPrice", element);

      this.appendTextElement(property.type, "propertyType", element);

      let propertyDesc = property.description;
      this.appendTextElement(propertyDesc, "propertyDescription", element);

      this.appendTextElement(property.location, "propertyLocation", element);

      let propertySize = this.renderPropertySize(property.size);
      this.appendTextElement(propertySize, "propertySize", element);

      this.appendImageElement(property.imageUrl, "propertyImage", element);

      this.rootElement.appendChild(element);
    }
  }
}
