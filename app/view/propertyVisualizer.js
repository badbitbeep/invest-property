import { MAX_ELEMENTS_PER_PAGE, MAX_PAGES_IN_NAVBAR } from "../config.js";
import { getCurrencySymbol } from "./price.js";
import { getDimensionSymbol } from "./size.js";

function renderPropertyPrice(propertyPrice) {
  let currencySymbol = getCurrencySymbol(propertyPrice.currency);
  return `${propertyPrice.value} ${currencySymbol}`;
}

function renderPropertySize(propertySize) {
  let dimensionSymbol = getDimensionSymbol(propertySize.dimension);
  return `${propertySize.value} ${dimensionSymbol}`;
}

function appendTextElement(text, style, parent) {
  let element = document.createElement("div");
  element.classList.add(style);
  parent.appendChild(element);

  let textElement = document.createElement("span");
  textElement.innerText = text;
  element.appendChild(textElement);
  return textElement;
}

function appendImageElement(url, style, parent) {
  let element = document.createElement("img");
  element.classList.add(style);
  element.src = url;
  parent.appendChild(element);
  return element;
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function appendLinkElement(text, style, callback, parent) {
  let element = document.createElement("a");
  element.classList.add(style);
  element.onclick = callback;
  element.innerText = text;
  parent.appendChild(element);
  return element;
}

export class PropertyVisualizer {
  constructor(rootElement, propertyDatabase, userDatabase) {
    this.rootElement = rootElement;
    this.propertyDatabase = propertyDatabase;
    this.userDatabase = userDatabase;
    this.maxElementsPerPage;
    this.currentPage = 0;
  }

  get pageCount() {
    return Math.ceil(
      this.propertyDatabase.propertyCount / MAX_ELEMENTS_PER_PAGE
    );
  }

  resetPaging() {
    this.currentPage = 0;
  }

  gotoPage(pageIndex) {
    scrollToTop();
    this.currentPage = pageIndex;
    this.render();
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

  onLikeButtonClicked(e, propertyId) {
    if (this.userDatabase.isPropertyLiked(propertyId)) {
      this.userDatabase.unlikeProperty(propertyId);
      e.target.src = "icons/like-empty.png";
    } else {
      this.userDatabase.likeProperty(propertyId);
      e.target.src = "icons/like-active.png";
    }
  }

  renderProperties() {
    let propertiesForPage = this.propertyDatabase.getProperties(
      this.currentPage * MAX_ELEMENTS_PER_PAGE,
      MAX_ELEMENTS_PER_PAGE
    );

    if (propertiesForPage.length === 0) {
      let element = document.createElement("span");
      element.classList.add("propertyNotFoundText");
      element.innerText =
        "Sorry, we have no properties to display! Please try another request";
      this.rootElement.appendChild(element);
    }

    for (let property of propertiesForPage) {
      let element = document.createElement("div");
      element.classList.add("property");
      this.rootElement.appendChild(element);

      let imageBlock = document.createElement("div");
      element.appendChild(imageBlock);
      appendImageElement(property.imageUrl, "propertyImage", imageBlock);

      let contactsPopup = document.createElement("div");
      contactsPopup.classList.add("propertyContactsPopup");
      imageBlock.appendChild(contactsPopup);
      appendTextElement(property.contacts, "propertyContacts", contactsPopup);

      let textBlock = document.createElement("div");
      textBlock.classList.add("propertyTextBlock");
      element.appendChild(textBlock);

      let headerElement = document.createElement("div");
      headerElement.classList.add("propertyHeaderBlock");
      textBlock.appendChild(headerElement);

      appendTextElement(
        renderPropertyPrice(property.price),
        "propertyPrice",
        headerElement
      );

      let likeButton = appendImageElement(
        this.userDatabase.isPropertyLiked(property.id)
          ? "icons/like-active.png"
          : "icons/like-empty.png",
        "propertyLikeButton",
        headerElement
      );
      likeButton.onclick = (e) =>
        this.onLikeButtonClicked(e, property.id);

      appendTextElement(property.type, "propertyType", textBlock);

      appendTextElement(property.description, "propertyDescription", textBlock);

      let sizeElement = document.createElement("div");
      sizeElement.classList.add("propertyBottomLeftBlock");
      textBlock.appendChild(sizeElement);

      appendImageElement("icons/square.png", "propertyIcon", sizeElement);
      appendTextElement(
        renderPropertySize(property.size),
        "propertyText",
        sizeElement
      );

      let locationElement = document.createElement("div");
      locationElement.classList.add("propertyBottomRightBlock");
      textBlock.appendChild(locationElement);

      appendImageElement("icons/map.png", "propertyIcon", locationElement);
      appendTextElement(property.location, "propertyText", locationElement);
    }
  }

  renderPages() {
    if (this.pageCount === 0) {
      return;
    }

    let navigationContainer = document.createElement("div");
    navigationContainer.classList.add("propertyPageNavContainer");
    this.rootElement.appendChild(navigationContainer);

    appendLinkElement(
      "<..",
      "propertyPageNav",
      () => this.gotoPage(0),
      navigationContainer
    );

    let minPage = Math.max(0, this.currentPage - MAX_PAGES_IN_NAVBAR / 2);
    let maxPage = Math.min(minPage + MAX_PAGES_IN_NAVBAR, this.pageCount);
    for (let i = minPage; i < maxPage; i++) {
      appendLinkElement(
        `${i + 1}`,
        i === this.currentPage ? "propertyPageNavCurrent" : "propertyPageNav",
        i === this.currentPage ? () => {} : () => this.gotoPage(i),
        navigationContainer
      );
    }

    appendLinkElement(
      "..>",
      "propertyPageNav",
      () => this.gotoPage(this.pageCount - 1),
      navigationContainer
    );
  }
}
