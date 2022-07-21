const { createItems } = require('./items.js');

const createLists = (lists) => lists.map(list =>
  `<div class="list" id="list-${list.id}">
        <div onclick="collapse('list-btn-${list.id}')" class="collapsible">
          <div class="title">${list.title}</div>
          <div class="delete-list fa-solid fa-trash-can" onclick="deleteList(${list.id})" id="${list.id}"></div>
        </div>
        <div class="content" id="content-${list.id}">
          <div id="list-${list.id}-items">
            ${createItems(list.items)}
          </div>
          <div class="adding">
            <input class="text" type="text" id='text-${list.id}' placeholder="Enter item..." required>
            <div class="add-item fa-solid fa-plus" onclick="addItem(${list.id})" id="list-${list.id}"></div>
          </div>
        </div>
      </div>`).join('\n');

module.exports = { createLists };
