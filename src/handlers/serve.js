const serveLogin = (req, res) => {
  if (req.session.isPopulated) {
    return res.redirect('/');
  }
  return res.sendFile('/login.html', { root: './public' });
};

const serveRegister = (req, res) => {
  if (req.session.isPopulated) {
    return res.redirect('/');
  }
  return res.sendFile('/register.html', { root: './public' });
};

module.exports = { serveLogin, serveRegister };
