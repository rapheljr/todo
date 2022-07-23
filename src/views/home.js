const createHome = (details) => `<!DOCTYPE html>
<html id="html" lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home ${details.username}</title>
  <link rel="stylesheet" href="css/home.css">
  <script src="js/xhr.js"></script>
  <script src="js/home.js"></script>
  <script src="js/dom.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
  <div class="page">
  <header class="head">
    <div class="welcome">
      <h1>Welcome</h1>
      <h2>${details.name}</h2>
    </div>
    <a href="logout">Logout</a>
  </header>
    <main>
    <h2>Lists</h2>
      <div id="lists">
      
      </div>
      <h2>Create</h2>
    <div class="adding-list">
      <input class="text" onkeydown="addListEnter(event)" type="text" id="title" placeholder="Enter title..." required>
      <div class="add-list fa-solid fa-plus" onclick="addList()"></div>
    </div>
    </main>

  </div>

</body>

</html>`;

module.exports = { createHome };
