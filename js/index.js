const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
const pairsClicked = document.getElementById('pairs-clicked')
const pairsGuessed = document.getElementById('pairs-guessed')
const restartBtn = document.getElementById('restart')
const endCard = document.querySelector('.restart.hidden')

window.addEventListener('load', () => {
  
  start()


})

function checkTwoCards() {
  return memoryGame.pickedCards.length === 2;
}

function lockCards() {
  let locked = document.querySelectorAll('.turned')
  locked.forEach(card => {
    card.classList.add('blocked')
  })

  updateScore()
}

function returnCards() {
  setTimeout(() => {
    let turn = document.querySelectorAll('.turned:not(.blocked)')
    turn.forEach(card => {
      card.classList.toggle('turned')
  })
  pairsClicked.textContent = memoryGame.pairsClicked
  memoryGame.pickedCards = []
  },1000)
}

function endGame () {
  endCard.classList.toggle('hidden')
  restartBtn.onclick = () => {
    resetGame()
    
  }
}


function resetGame() {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    card.classList.remove('blocked')
    card.classList.toggle('turned')
    memoryGame.pickedCards = []
    memoryGame.pairsClicked = 0
    memoryGame.pairsGuessed = 0
    updateScore()
  })
  endCard.classList.toggle('hidden')
  start()
}

function updateScore() {
  pairsClicked.textContent = memoryGame.pairsClicked
  pairsGuessed.textContent = memoryGame.pairsGuessed
  memoryGame.pickedCards = []
}

function start() { 
  memoryGame.shuffleCards()

  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;
  

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {

      if(!card.classList.contains('blocked') && memoryGame.pickedCards.length < 2) {
        card.classList.toggle('turned')
        memoryGame.pickedCards.push(card)
      }
      if (checkTwoCards()) {
        let card1 = memoryGame.pickedCards[0].dataset.cardName
        let card2 = memoryGame.pickedCards[1].dataset.cardName
        if (memoryGame.checkIfPair(card1, card2)) {
          lockCards()
        } else {
          returnCards()
        }
      }
      if (memoryGame.checkIfFinished()) {
        setTimeout(() => {
          endGame()
        },1000)
      }
    })
  })
}