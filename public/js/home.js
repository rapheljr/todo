const listen = (id) => {
  const lists = document.getElementsByClassName('collapsible');
  for (const element of lists) {
    element.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  }

};

const collapse = function (id) {

};

const appendList = (XHR) => {
  const lists = document.getElementById('lists');
  const appendElement = createLists(JSON.parse(XHR.response));
  lists.innerHTML += appendElement;
  listen();
};

const appendItem = (id) =>
  (XHR) => {
    const items = document.getElementById(`list-${id}-items`);
    const appendElement = createItems(JSON.parse(XHR.response));
    items.innerHTML += appendElement;
    listen();
    listen();
  };

const removeItem = (id) =>
  (XHR) => {
    const item = document.getElementById(`item-${id}`);
    item.remove();
  };

const removeList = (id) =>
  (XHR) => {
    const list = document.getElementById(`list-${id}`);
    list.remove();
  };

const addList = () => {
  const title = document.getElementById('title');
  const value = title.value.trim();
  const body = `title=${value}`;
  if (value) {
    title.value = '';
    post('/add-list', body, appendList);
  }
};

const addItem = (id) => {
  const text = document.getElementById('text-' + id);
  if (text) {
    const value = text.value.trim();
    if (value) {
      const body = `item=${value}&list=${id}`;
      text.value = '';
      post('/add-item', body, appendItem(id));
    }
  }
};

const markItem = (id) => {
  const body = `id=${id}`;
  post('/mark-item', body, () => { });
};

const deleteItem = (id) => {
  const body = `id=${id}`;
  deleteMethod('/delete-item', body, removeItem(id));
};

const deleteList = (id) => {
  const body = `id=${id}`;
  deleteMethod('/delete-list', body, removeList(id));
};

const check = (item) => item.done ? 'checked' : '';

const createItems = (items) => items.map(item =>
  `<div class="item" id="item-${item.id}">
              <div class="title">
                <input class="checkbox" ${check(item)} onclick="markItem(${item.id})" type="checkbox" name="mark"
                  id="${item.id}">
                <div class="name">${item.name}</div>
              </div>
              <div class="delete-item fa-solid fa-trash-can" onclick="deleteItem(${item.id})" id="delete"></div>
            </div>`).join('\n');

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

window.onload = listen;
