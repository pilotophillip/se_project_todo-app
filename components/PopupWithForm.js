import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input"); // Moved this here to avoid querying repeatedly
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      // Add a key/value pair to the values object for each input
      // Key is input.name; value is input.value
      // Use bracket notation to avoid hardcoding property names
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();

      // Pass result of _getInputValues to submission handler
      this._handleFormSubmit(inputValues); // Pass the input values
    });
  }
}

export default PopupWithForm;
