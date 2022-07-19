const homeHandler = (req, res, next) => {
  if (req.session.id) {
    return res.redirect('/home');
  }
  return res.redirect('/login.html');
};

module.exports = { homeHandler };
