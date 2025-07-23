class Section {
  constructor(items, renderer, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderitems() {
    this._items.forEach((item) => {
      // Call the renderer, and pass it the item
    });
  }

  addItem(element) {
    // Add element to the container
  }
}

export default Section;
