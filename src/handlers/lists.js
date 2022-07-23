const lists = (req, res) => {
  return res.json(req.todo.getUserDetails().lists);
};

module.exports = { lists };
