import {wordlist} from './wordlist.js';

document.querySelectorAll('.clickable').forEach((letter) => {
  letter.addEventListener('click', (e) => {
    switch (letter.dataset.action) {
      case 'clear':
        document.querySelector('.letters').textContent = "";
        document.querySelector('.suggestions').innerHTML = "";
        document.querySelector('.letters').textContent += letter.dataset.text || "" 
        break;
      default:
        document.querySelector('.letters').textContent += letter.dataset.text || "" 
        if (document.querySelector('.letters').textContent.length > 13) {
          document.querySelector('.type-bar').style.fontSize = `${130 / document.querySelector('.letters').textContent.length}vw`
        } else {
          document.querySelector('.type-bar').style.fontSize = "";
        }
        const search = document.querySelector('.letters').textContent.split(' ').slice(-1)
        const suggestions = wordlist.filter((word) => word.match(new RegExp(`^${search}.*`)))
        document.querySelector('.suggestions').innerHTML = suggestions.slice(0, 5).map((sug) => `<div class="suggestion" data-text="${sug}">${sug}</div>`).join('')
        document.querySelectorAll('.suggestion').forEach((sug) => {
          sug.addEventListener('click', (e) => {
            document.querySelector('.letters').textContent = `${document.querySelector('.letters').textContent.split(' ').slice(0, -1).join(' ')} ${sug.dataset.text} `
            document.querySelector('.suggestions').innerHTML = "";
            if (document.querySelector('.letters').textContent.length > 13) {
              document.querySelector('.type-bar').style.fontSize = `${130 / document.querySelector('.letters').textContent.length}vw`
            }
          })
        })
        break;
    } 
  })
})

document.querySelectorAll('.toggle-modal').forEach(btn => {
  btn.addEventListener('click', (e) => {
    console.log(btn.dataset.modal)
    document.querySelector('.backdrop').style.display = 'flex';
    document.querySelector('.backdrop').addEventListener('click', (e) => {
      document.querySelector('.backdrop').style.display = 'none';
      document.querySelector(`.${btn.dataset.modal}`).style.display = 'none'
    })
    document.querySelector(`.${btn.dataset.modal}`).style.display = 'block'
  })
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
