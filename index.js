import { menuArray } from './data.js'

const menuEl = document.querySelector('#menu')

const menuItemsHTML = () => {
  return menuArray.map(m => {
    return `
        <div class="menu-item">
        <div class="menu-item-img">${m.emoji}</div>
        <div class="menu-item-details">
          <h3 class="menu-item-details-name">${m.name}</h3>
          <p class="menu-item-details-ingredients">${m.ingredients.join(', ')}</p>
          <p class="menu-item-details-price">$${m.price}</p>
        </div>
        <img class="menu-item-add" src="./imgs/add.png" alt="">
      </div>
    `
  }).join('')
}

menuEl.innerHTML = menuItemsHTML()