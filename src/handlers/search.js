const search = (req, res) => {
  const { key } = req.body;
  return res.json(req.todo.search(key));
};

module.exports = { search };
