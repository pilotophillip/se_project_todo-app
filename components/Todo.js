class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    // Toggle checkbox
    this.todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
    // Delete Checkbox
    this.todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  generateCheckboxEl() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    // ✅ Assign these to instance so _setEventListeners can use them
    this.todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this.todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this.generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
