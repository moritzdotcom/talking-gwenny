document.querySelectorAll('.emoji').forEach((emoji) => {
  emoji.addEventListener('click', (e) => {
    const container = document.createElement('div');
    container.classList.add('falling-container');
    document.body.appendChild(container);
    for (let i = 0; i < 40; i++) {
      const fallable = document.createElement('div');
      fallable.classList.add('fallable');
      fallable.textContent = emoji.textContent;
      fallable.style.top = `${(Math.random() * -100) - 10}vh`;
      fallable.style.left = `${(Math.random() * 100) - 5}vw`;
      fallable.style.fontSize = `${5 + (Math.random() * 10)}vw`;
      container.appendChild(fallable);
    }
    setTimeout(() => {
      document.body.removeChild(container);
    }, 2000);
  })
})