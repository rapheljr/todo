const { createItems } = require('./items.js');

const createLists = (lists) => lists.map(list =>
  `<div id="list-${list.id}">
          <div onclick="collapse('list-btn-${list.id}')" class="collapsible">
            <div class="title">${list.title}</div>
            <div class="delete-list" onclick="deleteList(${list.id})" id="${list.id}">Delete</div>
          </div>
          <div class="content">
            <div id="list-${list.id}-items">
              
          ${createItems(list.items)}

            </div>
            <div class="adding">
              <input type="text" id='text-${list.id}' placeholder="type item..." required>
              <div></div>
              <div class="add-item" onclick="addItem(${list.id})" id="list-1">Add item</div>
            </div>
          </div>
        </div>`).join('\n');

module.exports = { createLists };