const reload = () => {
  GET('/api/lists', prepend('lists', identity, createLists));
  addNewSearch();
};

const getContentId = id => 'content-' + id;

const collapse = (id) => {
  const content = document.getElementById(getContentId(id));
  const result = content.style.display === 'block';
  content.style.display = result ? 'none' : 'block';
};

const getListItem = id => `list-${id}-items`;
const identity = x => x;

const prepend = (id, getId, cb) =>
  (XHR) => {
    const element = document.getElementById(getId(id));
    const child = cb(JSON.parse(XHR.response));
    element.prepend(...child);
    addNewSearch();
  };

const getItemId = id => 'item-' + id;
const getListId = id => 'list-' + id;

const remove = (id, getId) =>
  (XHR) => {
    const element = document.getElementById(getId(id));
    element.remove();
    addNewSearch();
  };

const addList = () => {
  const title = document.getElementById('title');
  const value = title.value.trim();
  if (value) {
    const body = `title=${value}`;
    title.value = '';
    POST('/api/add-list', body, prepend('lists', identity, createLists));
  }
};

const showStatus = (id, what) => {
  const message = document.getElementById(`msg-${id}-${what}`);
  message.innerHTML = 'Updated';
  setTimeout(() => {
    message.innerHTML = '';
  }, 1000);
  addNewSearch();
};

const editList = (event, id) => {
  if (isEnter(event)) {
    event.preventDefault();
    const title = document.getElementById('title-' + id);
    const value = strip(title);
    if (value) {
      const body = `title=${value}&id=${id}`;
      POST('/api/edit-list', body, () => showStatus(id, 'list'));
    }
  }
};

const strip = (element) => element.innerText.trim().replaceAll('\n', '');

const getItemName = id => `item-${id}-name`;

const editItem = (event, id) => {
  if (isEnter(event)) {
    event.preventDefault();
    const name = document.getElementById(getItemName(id));
    const value = strip(name);
    if (value) {
      const body = `item=${value}&id=${id}`;
      POST('/api/edit-item', body, () => showStatus(id, 'item'));
    }
  }
};

const addListEnter = (event) => {
  if (isEnter(event)) {
    addList();
  }
};

const getTextId = (id) => 'text-' + id;

const addItem = (id) => {
  const text = document.getElementById(getTextId(id));
  const value = text.value.trim();
  if (value) {
    const body = `item=${value}&list=${id}`;
    text.value = '';
    POST('/api/add-item', body, prepend(id, getListItem, createItems));
  }
};

const addItemEnter = (event, id) => {
  if (isEnter(event)) {
    addItem(id);
  }
};

const getId = (id) => `id=${id}`;

const deleteList = (id) => {
  DELETE('/api/delete-list', getId(id), remove(id, getListId));
};

const deleteItem = (id) => {
  DELETE('/api/delete-item', getId(id), remove(id, getItemId));
};

const markItem = (id) => {
  POST('/api/mark-item', getId(id), addNewSearch);
};

const isEnter = (event) => event.key === 'Enter';

const highlight = (text, key) => {
  if (key) {
    const regex = new RegExp(key, 'ig');
    const matched = text.match(regex);
    const replace = matched ? matched[0] : '';
    return text.replaceAll(regex, `<mark>${replace}</mark>`);
  }
  return text;
};

const createItem = (item, key) => {
  const dom = [
    'div', { className: 'item', id: `item-${item.id}` },
    ['div', { className: 'title-item' },
      ['input', { type: 'checkbox', className: 'checkbox', checked: item.done, onclick: () => markItem(item.id) }],
      ['div', {
        id: `item-${item.id}-name`, className: 'name', contentEditable: 'true', onkeydown: (event) => editItem(event, item.id),
        innerHTML: highlight(item.name, key)
      },]
    ],
    ['div', { id: `msg-${item.id}-item`, className: 'msg' },],
    ['div', { className: 'delete-item fa-solid fa-trash-can', onclick: () => deleteItem(item.id), id: 'delete' }
    ]
  ];

  return tagOf(...dom);
};

const createList = (list, key) => {
  const dom = [
    'div', { className: 'list', id: `list-${list.id}` },
    ['div', { onclick: () => collapse(list.id), className: 'collapsible' },
      ['div', { id: `title-${list.id}`, className: 'title-list', contentEditable: 'true', onkeydown: (event) => editList(event, list.id), innerHTML: highlight(list.title, key) },],
      ['div', { id: `msg-${list.id}-list`, className: 'msg' },],
      ['div', { className: 'delete-list fa-solid fa-trash-can', onclick: () => deleteList(list.id) }]],
    ['div', { className: 'content', id: `content-${list.id}` },
      ['div', { className: 'adding' },
        ['input', {
          type: 'text', className: 'text', placeholder: 'Enter item...', onkeydown: (event) => addItemEnter(event, list.id), id: `text-${list.id}`
        }], ['div', { className: 'add-item fa-solid fa-plus', onclick: () => addItem(list.id) }]],
      ['div', { id: `list-${list.id}-items` }, ...createItems(list.items, key)],
    ]
  ];

  return tagOf(...dom);
};

const createItems = (items, key) => items.map(item => createItem(item, key));

const createLists = (lists, key) => lists.map(list => createList(list, key));

window.onload = reload;
