import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

// ✅ Improvement: access form directly by id from document.forms
const addTodoForm = document.forms["add-todo-form"];

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  // ✅ Always decrement total when a todo is deleted
  todoCounter.updateTotal(false);
}

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    // ✅ Reuse renderTodo() instead of duplicating code
    renderTodo(values);

    // ✅ Increment total when a new todo is added
    todoCounter.updateTotal(true);

    addTodoPopup.close();

    // ✅ Reset validation instead of manually resetting the form
    newTodoValidator.resetValidation();
  },
});

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// ✅ New helper function to avoid duplicate code
const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      // ✅ Reuse renderTodo here
      renderTodo(item);
    },
  },
  ".todos__list"
);

section.renderItems();

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
