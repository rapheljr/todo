const main = () => {
  const coll = document.getElementsByClassName('collapsible');
  for (const element of coll) {
    element.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  }

  const delLists = document.getElementsByClassName('delete-list');

  for (const element of delLists) {
    element.addEventListener('click', function () {
      console.log(element, 'hello');
      console.log(element.id, 'hello');
    })
  };
};

window.onload = main;
