const check = (item) => item.done ? 'checked' : '';

const createItems = (items) => items.map(item =>
  `<div class="item">
          <div class="name">${item.name}</div>
          <input class="checkbox" type="checkbox" ${check(item)} name="mark" id="${item.id}">
          <div class="delete-item" id="${item.id}">Delete</div>
        </div>`).join('\n');

module.exports = { createItems };
