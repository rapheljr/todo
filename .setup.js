const fs = require('fs');

const setUp = () => {
  const content = {
    users: [{
      id: 1, name: 'name', username: 'user', password: 'pass'
    }],
    lists: [{
      id: 1, title: 'retail', username: 'user', deleted: false, done: true
    }],
    items: [{ id: 1, name: 'buy', list: 1, done: false, deleted: false }, { id: 2, name: 'sell', list: 1, done: false, deleted: false }]
  };

  fs.writeFileSync('./joy/hello.json', JSON.stringify(content));

};

setUp();