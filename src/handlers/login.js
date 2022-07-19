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

const loginHandler = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  if (req.todo.verifyUser(username.toLowerCase(), password)) {
    createSession(req, {});
    return res.redirect('/');
  }
  return res.end('Invalid username or password!');
};

module.exports = { loginHandler, createSession };
