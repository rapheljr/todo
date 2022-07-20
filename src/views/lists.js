const { createItems } = require('./items.js');

const createLists = (lists) => lists.map(list =>
  `<div type="button" class="collapsible">
        <div class="title">${list.title}</div>
        <div class="delete-list" id="${list.id}">Delete</div>
      </div>
      <div class="content">

        ${createItems(list.items)}

        <div class="adding">
          <input type="text" placeholder="type item name..." required>
          <div></div>
          <div class="add-item">Add item</div>
        </div>
      </div>`).join('\n');

module.exports = { createLists };