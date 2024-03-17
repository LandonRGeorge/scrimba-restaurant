import {menuArray} from './data.js'

const menuEl = document.querySelector('#menu')
const orderEl = document.querySelector('#order')
const orderLinesEl = document.querySelector('.order-lines')
const orderLineTotalEl = document.querySelector('.order-line-total')
let lines = []

const render = () => {
  // update the total
  updateOrder(lines)

  menuArray.forEach(m => {

    // add item to menu
    const menuLineEl = document.createElement('div')
    menuLineEl.classList.add('menu-line')
    menuLineEl.innerHTML = `
        <div class="menu-line-img">${m.emoji}</div>
        <div class="menu-line-details">
          <h3 class="menu-linedetails-name font-lg">${m.name}</h3>
          <p class="menu-line-details-ingredients font-sm color-gray">${m.ingredients.join(', ')}</p>
          <p class="menu-line-details-price">$${m.price}</p>
        </div>
    `

    // create "add" btn
    const addBtnEl = document.createElement('button')
    addBtnEl.classList.add('menu-line-add-btn')
    addBtnEl.textContent = '+'

    // when "add" btn is clicked...
    addBtnEl.addEventListener('click', e => {

      // ...push item to array
      const line = {...m, lineID: Date.now()}
      lines.push(line)

      // ...add line to order
      const orderLineEl = document.createElement('li')
      orderLineEl.classList.add('order-line')
      orderLineEl.innerHTML = `
        <div class="order-line-item">
          <span class="order-line-item-name font-lg">${m.name}</span>
        </div>
        <span class="order-line-price">$${m.price}</span>
    `
      const removeBtnEl = document.createElement('button')
      removeBtnEl.classList.add('order-line-item-remove', 'font-sm', 'color-gray')
      removeBtnEl.textContent = 'remove'
      orderLineEl.children[0].append(removeBtnEl)
      orderLinesEl.append(orderLineEl)

      // update the total
      updateOrder(lines)

      // remove button has been clicked
      removeBtnEl.addEventListener('click', () => {
        // remove line from UI
        orderLineEl.remove()
        // remove it from the array
        lines = lines.filter(l => l !== line)
        // update the total
        updateOrder(lines)
      })
    })

    menuLineEl.append(addBtnEl)
    menuEl.append(menuLineEl)
  })
}

function updateOrder(lines) {
  const total = lines.reduce((total, cur) => total + cur.price, 0)
  orderLineTotalEl.textContent = `$${total}`
  if (lines.length === 0) {
    orderEl.classList.add('hidden')
  } else {
    orderEl.classList.remove('hidden')
  }
}

render()



