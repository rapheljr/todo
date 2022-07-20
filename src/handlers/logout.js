const logoutHandler = (req, res, next) => {
  res.cookie('session.sig', '');
  res.cookie('session', '');
  res.redirect('/login.html');
};

module.exports = { logoutHandler };
