class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
  }


  shuffleCards() {
    // ... write your code here
    const cards = this.cards
    for(let i = 0; i < cards.length; i++) {
      
      const maxIndex = cards.length - i - 1;
      if (maxIndex === 1) break;
      const roll = Math.floor(Math.random() * (maxIndex))

      if (cards[maxIndex] !== cards[roll]) {
        const tmp = cards[maxIndex]
        cards[maxIndex] = cards[roll]
        cards[roll] = tmp 
      }
    }
  }

  checkIfPair(card1, card2) {
    // ... write your code here
    this.pairsClicked += 1
    if (card1 === card2) {
      this.pairsGuessed += 1
      return true
    }
    return false
  }

  checkIfFinished() {
    // ... write your code here
    return this.cards.length / 2 === this.pairsGuessed
  }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;
