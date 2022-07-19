const { createHome } = require('../views/home');

const hardCode = {
  id: 1, name: 'Abin', username: 'arm', password: 'pass',
  lists: [{
    id: 1, title: 'retail', username: 'arm', items: [{ id: 1, name: 'buy', done: true }, { id: 2, name: 'sell', done: false }]
  }]
};

const handle404 = (req, res) => res.redirect('/404.html');

const homeHandler = (req, res, next) => {
  if (req.session.id) {
    // const content = createHome(hardCode);
    const content = createHome(req.todo.getUserDetails());
    return res.end(content);
  }
  return res.redirect('/login.html');
};

module.exports = { homeHandler, handle404 };
