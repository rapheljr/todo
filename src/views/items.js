const check = (item) => item.done ? 'checked' : '';

const createItems = (items) => items.map(item =>
  `<div class="item" id="item-${item.id}">
                <div class="name">${item.name}</div>
                <input class="checkbox" ${check(item)} onclick="markItem(${item.id})" type="checkbox" name="mark" id="${item.id}">
                <div class="delete-item" onclick="deleteItem(${item.id})" id="delete">Delete</div>
              </div>`).join('\n');

module.exports = { createItems };
