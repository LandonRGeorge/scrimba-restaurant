import {menuArray} from './data.js'

const menuEl = document.querySelector('#menu')
const orderEl = document.querySelector('#order')
const orderLinesEl = document.querySelector('.order-lines')
const orderLineTotalEl = document.querySelector('.order-line-total')
const orderCompleteEl = document.querySelector('#order-complete')
const cardDetailsEl = document.querySelector('#card-details')
const confirmationBannerEl = document.querySelector('#confirmation-banner')
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

      // reset the order confirmation banner in case it is showing
      confirmationBannerEl.classList.add('hidden')
      confirmationBannerEl.innerHTML = ''

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

// when submit button clicked...
orderCompleteEl.addEventListener('click', () => {
  // ...show the card details modal
  cardDetailsEl.classList.remove('hidden')
})

cardDetailsEl.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()

  // hide the card details modal
  cardDetailsEl.classList.add('hidden')

  // reset the order
  lines = []
  orderLinesEl.innerHTML = ''
  orderEl.classList.add('hidden')

  // add banner message
  const p = document.createElement('p')
  p.classList.add('font-lg')
  p.textContent = `Thanks, ${e.target.elements.name.value}! Your order is on its way!`
  confirmationBannerEl.append(p)

  // show the banner
  confirmationBannerEl.classList.remove('hidden')

  // reset the form
  e.target.reset()
})

