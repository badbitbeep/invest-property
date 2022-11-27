import { Country } from "../model/propertyDatabase/country.js";
import { Currency } from "../model/propertyDatabase/price.js";
import { PropertyType } from "../model/propertyDatabase/property.js";

const ANY_OPTION_TEXT = "Any";

function extractOption(clickEvent) {
  let option = clickEvent.target.id.substr("filterOption.".length);
  return option !== ANY_OPTION_TEXT ? option : undefined;
}

function appendDropdownElement(text, currentOption, options, parent, onSelect) {
  let dropdownElement = document.createElement("div");
  dropdownElement.classList.add("filterDropdown");
  parent.appendChild(dropdownElement);

  let dropdownText = document.createElement("span");
  dropdownText.classList.add("filterDropdownHeader");
  dropdownText.innerText = `${text}: `;
  dropdownElement.appendChild(dropdownText);

  let dropdownOptionSelected = document.createElement("span");
  dropdownOptionSelected.classList.add("filterDropdownOptionSelected");
  dropdownOptionSelected.innerText = currentOption;
  dropdownElement.appendChild(dropdownOptionSelected);

  let optionsElement = document.createElement("div");
  optionsElement.classList.add("filterDropdownContent");
  dropdownElement.appendChild(optionsElement);

  for (let option of [ANY_OPTION_TEXT, ...options]) {
    let dropdownOptionContainer = document.createElement("div");
    dropdownOptionContainer.classList.add("filterDropdownOption");
    dropdownOptionContainer.id = `filterOption.${option}`;
    optionsElement.appendChild(dropdownOptionContainer);
    dropdownOptionContainer.onclick = onSelect;

    let dropdownOptionText = document.createElement("span");
    dropdownOptionText.classList.add("filterDropdownOptionText");
    dropdownOptionText.innerText = option;
    dropdownOptionContainer.appendChild(dropdownOptionText);
  }
}

export class FilterVisualizer {
  constructor(rootElement, filterService) {
    this.rootElement = rootElement;
    this.filterService = filterService;
  }

  render() {
    this.clearElementsChildren();
    this.renderFilterOptions();
  }

  clearElementsChildren() {
    while (this.rootElement.firstChild) {
      this.rootElement.firstChild.remove();
    }
  }

  renderFilterOptions() {
    let filterList = document.createElement("div");
    filterList.classList.add("filteringList");
    this.rootElement.appendChild(filterList);

    appendDropdownElement(
      "type",
      this.filterService.typeFilter ?? "Any",
      Object.values(PropertyType),
      filterList,
      (e) => this.filterService.addTypeFilter(extractOption(e))
    );

    appendDropdownElement(
      "country",
      this.filterService.countryFilter ?? "Any",
      Object.values(Country),
      filterList,
      (e) => this.filterService.addCountryFilter(extractOption(e))
    );

    appendDropdownElement(
      "currency",
      this.filterService.currencyFilter ?? "Any",
      Object.values(Currency),
      filterList,
      (e) => this.filterService.addCurrencyFilter(extractOption(e))
    );
  }
}
