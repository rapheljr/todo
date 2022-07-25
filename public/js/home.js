const reload = () => {
  get('/api/lists', appendList);
  addNewSearch();
};

const collapse = (id) => {
  const content = document.getElementById('content-' + id);
  const result = content.style.display === 'block';
  content.style.display = result ? 'none' : 'block';
};

const appendList = (XHR) => {
  const lists = document.getElementById('lists');
  const list = createLists(JSON.parse(XHR.response));
  lists.prepend(...list);
  addNewSearch();
};

const appendItem = (id) =>
  (XHR) => {
    const list = document.getElementById(`list-${id}-items`);
    const items = createItems(JSON.parse(XHR.response));
    list.prepend(...items);
    addNewSearch();
  };

const removeItem = (id) =>
  (XHR) => {
    const item = document.getElementById(`item-${id}`);
    item.remove();
    addNewSearch();
  };

const removeList = (id) =>
  (XHR) => {
    const list = document.getElementById(`list-${id}`);
    list.remove();
    addNewSearch();
  };

const addList = () => {
  const title = document.getElementById('title');
  const value = title.value.trim();
  if (value) {
    const body = `title=${value}`;
    title.value = '';
    post('/api/add-list', body, appendList);
  }
};

const editList = (event, id) => {
  if (isEnter(event)) {
    const title = document.getElementById('title-' + id);
    const value = title.innerText.trim();
    if (value) {
      const body = `title=${value}&id=${id}`;
      post('/api/edit-list', body, addNewSearch);
    }
  }
};

const editItem = (event, id) => {
  if (isEnter(event)) {
    const name = document.getElementById(`item-${id}-name`);
    const value = name.innerText.trim();
    if (value) {
      const body = `item=${value}&id=${id}`;
      post('/api/edit-item', body, addNewSearch);
    }
  }
};

const addListEnter = (event) => {
  if (isEnter(event)) {
    addList();
  }
};

const deleteList = (id) => {
  const body = `id=${id}`;
  deleteMethod('/api/delete-list', body, removeList(id));
};

const addItem = (id) => {
  const text = document.getElementById('text-' + id);
  const value = text.value.trim();
  if (value) {
    const body = `item=${value}&list=${id}`;
    text.value = '';
    post('/api/add-item', body, appendItem(id));
  }
};

const addItemEnter = (event, id) => {
  if (isEnter(event)) {
    addItem(id);
  }
};

const deleteItem = (id) => {
  const body = `id=${id}`;
  deleteMethod('/api/delete-item', body, removeItem(id));
};

const markItem = (id) => {
  const body = `id=${id}`;
  post('/api/mark-item', body, addNewSearch);
};

const isEnter = (event) => event.key === 'Enter';

const createItem = (item) => {
  const dom = [
    'div', { className: 'item', id: `item-${item.id}` },
    ['div', { className: 'title' },
      ['input', { type: 'checkbox', className: 'checkbox', checked: item.done, onclick: () => markItem(item.id) }],
      ['div', { id: `item-${item.id}-name`, className: 'name', contentEditable: 'true', onkeydown: (event) => editItem(event, item.id) }, item.name]
    ],
    ['div', { className: 'delete-item fa-solid fa-trash-can', onclick: () => deleteItem(item.id), id: 'delete' }
    ]
  ]

  return tagOf(...dom);
};

const createList = (list) => {
  const dom = [
    'div', { className: 'list', id: `list-${list.id}` },
    ['div', { onclick: () => collapse(list.id), className: 'collapsible' },
      ['div', { id: `title-${list.id}`, className: 'title', contentEditable: 'true', onkeydown: (event) => editList(event, list.id) }, list.title],
      ['div', { className: 'delete-list fa-solid fa-trash-can', onclick: () => deleteList(list.id) }]],
    ['div', { className: 'content', id: `content-${list.id}` },
      ['div', { className: 'adding' },
        ['input', {
          type: 'text', className: 'text', placeholder: 'Enter item...', onkeydown: (event) => addItemEnter(event, list.id), id: `text-${list.id}`
        }], ['div', { className: 'add-item fa-solid fa-plus', onclick: () => addItem(list.id) }]],
      ['div', { id: `list-${list.id}-items` }, ...createItems(list.items)],
    ]
  ]

  return tagOf(...dom);
};

const createItems = (items) => items.map(createItem);

const createLists = (lists) => lists.map(createList);

window.onload = reload;
