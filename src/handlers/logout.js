const logoutHandler = (req, res) => {
  res.cookie('session.sig', '');
  res.cookie('session', '');
  res.redirect('/login.html');
};

module.exports = { logoutHandler };
