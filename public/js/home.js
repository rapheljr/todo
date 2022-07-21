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

const makeXhrRequest = (cb, method, path, body = '') => {
  const XHR = new XMLHttpRequest();
  XHR.onload = () => {
    if (XHR.status == 200) {
      return cb(XHR);
    }
    console.log('Error in fetching', method, path);
  };
  XHR.open(method, path);
  XHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  XHR.send(body);
};

const get = (url, cb) => makeXhrRequest(cb, 'GET', url);

const post = (url, body, cb) => makeXhrRequest(cb, 'POST', url, body);

const deleteMethod = (url, body, cb) => makeXhrRequest(cb, 'DELETE', url, body);

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
  const body = `title=${title.value}`;
  if (title.value) {
    title.value = '';
    post('/add-list', body, appendList);
  }
};

const addItem = (id) => {
  const text = document.getElementById('text-' + id);
  if (text) {
    if (text.value) {
      const body = `item=${text.value}&list=${id}`;
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
                <div class="name">${item.name}</div>
                <input class="checkbox" ${check(item)} onclick="markItem(${item.id})" type="checkbox" name="mark" id="${item.id}">
                <div class="delete-item" onclick="deleteItem(${item.id})" id="delete">Delete</div>
              </div>`).join('\n');

const createLists = (lists) => lists.map(list =>
  `<div id="list-${list.id}">
          <div onclick="collapse('list-btn-${list.id}')" class="collapsible">
            <div class="title">${list.title}</div>
            <div class="delete-list" onclick="deleteList(${list.id})" id="${list.id}">Delete</div>
          </div>
          <div class="content" id="content-${list.id}">
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

window.onload = listen;
