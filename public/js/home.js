const reload = () => {
  get('/lists', appendList);
};

const collapse = (id) => {
  const content = document.getElementById('content-' + id);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
};

const appendList = (XHR) => {
  const lists = document.getElementById('lists');
  const list = createLists(JSON.parse(XHR.response));
  lists.append(...list);
};

const appendItem = (id) =>
  (XHR) => {
    const list = document.getElementById(`list-${id}-items`);
    const items = createItems(JSON.parse(XHR.response));
    list.append(...items);
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

const addItemEnter = (event, id) => {
  if (isEnter(event)) {
    addItem(id);
  }
};

const addListEnter = (event) => {
  console.log(event);
  if (isEnter(event)) {
    addList();
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

const isEnter = (event) => event.key === 'Enter';

const createItem = (item) => {
  const dom = [
    'div', { className: 'item', id: `item-${item.id}` },
    ['div', { className: 'title' },
      ['input', { type: 'checkbox', className: 'checkbox', checked: item.done, onclick: () => markItem(item.id) }],
      ['div', { className: 'name' }, item.name]
    ],
    ['div', { className: 'delete-item fa-solid fa-trash-can', onclick: () => deleteItem(item.id), id: 'delete' }
    ]
  ]

  return tagOf(...dom);
};

const check = (item) => item.done ? 'checked' : '';

const createList = (list) => {
  const dom = [
    'div', { className: 'list', id: `list-${list.id}` },
    ['div', { onclick: () => collapse(list.id), className: 'collapsible' },
      ['div', { className: 'title' }, list.title],
      ['div', { className: 'delete-list fa-solid fa-trash-can', onclick: () => deleteList(list.id) }]],
    ['div', { className: 'content', id: `content-${list.id}` },
      ['div', { id: `list-${list.id}-items` }, ...createItems(list.items)],
      ['div', { className: 'adding' },
        ['input', {
          type: 'text', className: 'text', placeholder: 'Enter item...', onkeydown: (event) => addItemEnter(event, list.id), id: `text-${list.id}`
        }], ['div', { className: 'add-item fa-solid fa-plus', onclick: () => addItem(list.id) }]]
    ]
  ]

  return tagOf(...dom);
};

const createItems = (items) => items.map(createItem);

const createLists = (lists) => lists.map(createList);

window.onload = reload;
