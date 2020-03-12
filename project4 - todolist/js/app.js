const itemToAdd = document.getElementById('itemToAdd');
const addBtn = document.getElementById('addButton');
const itemList = document.getElementById('list');

class Item {
  constructor(itemName) {
    this.name = itemName;

    this.create();
  }

  create() {
    let listItem = document.createElement('section');
    listItem.classList.add('list-item');

    let input = document.createElement('input');
    input.type = 'text';
    input.classList.add('item-name');
    input.value = this.name;
    input.disabled = true;

    let actions = document.createElement('div');
    actions.classList.add('item-actions');

    let updateBtn = document.createElement('button');
    updateBtn.classList.add('update');
    updateBtn.innerText = 'Update';
    updateBtn.addEventListener('click', () => this.update(input));

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', () => this.remove(listItem));

    actions.appendChild(updateBtn);
    actions.appendChild(removeBtn);

    listItem.appendChild(input);
    listItem.appendChild(actions);

    itemList.appendChild(listItem);
  }

  update(input) {
    input.disabled = !input.disabled;
  }

  remove(item) {
    item.parentNode.removeChild(item);
  }
}

addBtn.addEventListener('click', () => newItem());

function newItem() {
  if (itemToAdd.value !== '') {
    new Item(itemToAdd.value);
    itemToAdd.value = '';
  }
}
