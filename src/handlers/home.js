const { createHome } = require('../views/home.js');

const handle404 = (req, res) => res.redirect('/404.html');

const homeHandler = (req, res) => {
  if (req.session.id) {
    const content = createHome(req.todo.getUserDetails());
    return res.end(content);
  }
  return res.redirect('/login.html');
};

module.exports = { homeHandler, handle404 };
