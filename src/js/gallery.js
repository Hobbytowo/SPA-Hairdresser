const gallery = document.querySelector('.gallery__container')
const modalBody = document.querySelector('.modal__Body')
const modal = document.querySelector('.modal')
const closeBtn = document.querySelector('.modal__closeBtn')

gallery.addEventListener('click', e => {
  // remove img if modal has been opened earlier

  if (modalBody.firstChild !== null) {
    const oldImg = document.querySelector('.modalImg')
    modalBody.removeChild(oldImg)
  }

  // create new img

  const imgBigSrc = e.target.attributes.src.nodeValue

  const bigImg = document.createElement('img')
  bigImg.setAttribute('src', `${ imgBigSrc }`)
  bigImg.setAttribute('alt', 'duży obraz fryzura')
  bigImg.setAttribute('class', 'modalImg')

  modalBody.appendChild(bigImg)

  // closing/opening modal
  modal.style.display = 'block'

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  window.addEventListener('click', e => {
    e.target === modal && (modal.style.display = 'none')
  })
})
