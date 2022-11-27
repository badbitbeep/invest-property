import { MAX_ELEMENTS_PER_PAGE } from "../config.js";
import { getCurrencySymbol } from "./price.js";
import { getDimensionSymbol } from "./size.js";

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

  gotoPage(pageIndex) {
    this.currentPage = pageIndex;
    this.render();
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
    let element = document.createElement("img");
    element.classList.add(style);
    element.src = url;
    parent.appendChild(element);
  }

  render() {
    this.clearElementsChildren();
    this.renderProperties();
    this.renderPages();
  }

  clearElementsChildren() {
    while (this.rootElement.firstChild) {
      this.rootElement.firstChild.remove();
    }
  }

  renderProperties() {
    let propertiesForPage = this.propertyDatabase.getProperties(
      this.currentPage * MAX_ELEMENTS_PER_PAGE,
      MAX_ELEMENTS_PER_PAGE
    );

    for (let property of propertiesForPage) {
      let element = document.createElement("div");
      element.classList.add("property");
      this.rootElement.appendChild(element);

      this.appendImageElement(property.imageUrl, "propertyImage", element);

      let textBlock = document.createElement("div");
      textBlock.classList.add("propertyTextBlock");
      element.appendChild(textBlock);

      this.appendTextElement(
        this.renderPropertyPrice(property.price),
        "propertyPrice",
        textBlock
      );

      this.appendTextElement(property.type, "propertyType", textBlock);

      this.appendTextElement(
        property.description,
        "propertyDescription",
        textBlock
      );

      let sizeElement = document.createElement("div");
      sizeElement.classList.add("propertyBottomLeftBlock");
      textBlock.appendChild(sizeElement);

      this.appendImageElement("icons/square.png", "propertyIcon", sizeElement);
      this.appendTextElement(
        this.renderPropertySize(property.size),
        "propertyText",
        sizeElement
      );

      let locationElement = document.createElement("div");
      locationElement.classList.add("propertyBottomRightBlock");
      textBlock.appendChild(locationElement);

      this.appendImageElement("icons/map.png", "propertyIcon", locationElement);
      this.appendTextElement(
        property.location,
        "propertyText",
        locationElement
      );
    }
  }

  renderPages() {
    let navigationContainer = document.createElement("div");
    navigationContainer.classList.add("propertyPageNavContainer");
    this.rootElement.appendChild(navigationContainer);
    for (let i = 0; i < this.pageCount; i++) {
      let pageLink = document.createElement("a");
      pageLink.classList.add("propertyPageNav");
      pageLink.onclick = () => this.gotoPage(i);
      pageLink.innerText = `${i + 1}`;
      navigationContainer.appendChild(pageLink);
    }
  }
}
