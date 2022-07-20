const main = () => {
  const coll = document.getElementsByClassName('collapsible');
  for (const element of coll) {
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

  const delLists = document.getElementsByClassName('delete-list');

  for (const element of delLists) {
    element.addEventListener('click', function () {
      console.log(element, 'hello');
      console.log(element.id, 'hello');
    })
  };

  const delItems = document.getElementsByClassName('delete-item');

  for (const element of delItems) {
    element.addEventListener('click', function () {
      console.log(element.id, 'hello');
    })
  };

  const addItems = document.getElementsByClassName('add-item');

  for (const element of addItems) {
    element.addEventListener('click', () => addItem(element))
  };
};

const parseFormData = (formData) => {
  const parsedForm = [];
  for (const [field, value] of formData) {
    const paramString = field + '=' + value;
    parsedForm.push(paramString);
  }
  return parsedForm;
};

const makeXhrRequest = (cb, method, path, body = '') => {
  const XHR = new XMLHttpRequest();
  XHR.onload = () => {
    if (XHR.status == 200) {
      return cb(XHR);
    }
    console.log('Error in fetching', method, path);
  }
  XHR.open(method, path);
  XHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  XHR.send(body);
};

const get = (url, cb) => makeXhrRequest(cb, 'GET', url);

const post = (url, body, cb) => makeXhrRequest(cb, 'POST', url, body);

const onload = (XHR) => {
  window.location.reload()
};

const addList = () => {
  const title = document.getElementById('title');
  const body = `title=${title.value}`;
  if (title.value) {
    title.value = '';
    post('/add-list', body, onload);
  }
};

const addItem = (element) => {
  const id = element.id;
  console.log('inside addItem', id)

  const text = document.getElementById('text-' + id);
  const body = `item=${text.value}&list=${id}`;
  if (text.value) {
    text.value = '';
    post('/add-item', body, onload);
  }
};

window.onload = main;
