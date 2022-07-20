const { createLists } = require('./lists.js');

const createHome = (details) => `<!DOCTYPE html>
<html id="html" lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home ${details.username}</title>
  <link rel="stylesheet" href="css/home.css">
  <script src="js/home.js"></script>
</head>

<body>
  <div class="page">
    <header>
      <h1>Welcome</h1>
      <h2>${details.name}</h2>
    </header>
    <main>

      <h2>Lists</h2>

      ${createLists(details.lists)}

      <h2>Add</h2>
      <div class="adding">
        <input type="text" id="title" placeholder="type list..." required>
        <div class="add-item" onclick="addList()">Add list</div>
      </div>
    </main>

  </div>

</body>

</html>`;

module.exports = { createHome };
