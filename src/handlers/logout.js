const logoutHandler = (req, res) => {
  res.clearCookie('session.sig');
  res.clearCookie('session');
  res.redirect('/login.html');
};

module.exports = { logoutHandler };
