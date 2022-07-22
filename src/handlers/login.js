const createSession = (req, sessions) => {
  const { username } = req.body;
  req.session.username = username;
  const time = new Date();
  req.session.time = time;
  const id = time.getTime();
  req.session.id = id;
  const session = { username, id, time };
  sessions[id] = session;
  return session;
};

const loginHandler = (req, res) => {
  const { username, password } = req.body;
  if (req.todo.verifyUser(username, password)) {
    createSession(req, {});
    return res.redirect('/');
  }
  return res.redirect('/invalidLogin.html');
};

module.exports = { loginHandler, createSession };
