const search = (req, res) => {
  const { key, done, undone, check } = req.body;
  const status = check === 'true' ? true : false;
  return res.json(req.todo.search(key, status));
};

module.exports = { search };
