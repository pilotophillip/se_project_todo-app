import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

// Create your PopupWithForm instance
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

// --- DEFINE generateTodo BEFORE using it ---
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Create Section instance, passing initialTodos and renderer
const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todo = generateTodo(item);
      section.addItem(todo);
    },
  },
  ".todos__list"
);

// Render all initial todos
section.renderItems();

// Setup popup event listeners
addTodoPopup.setEventListeners();

// Open popup when add button clicked
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Handle form submission
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  const todo = generateTodo(values);
  section.addItem(todo);

  addTodoPopup.close();
  addTodoForm.reset(); // Clear form inputs after submit
});

// Enable validation on the form
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
