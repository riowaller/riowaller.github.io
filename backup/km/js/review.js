const reviewElement = document.querySelector('#review-body')
const gameId = location.hash.substring(1)

let gamePlay = getSavedGamePlay()
let game = gamePlay.find((game) => game.id === gameId)

reviewElement.value = game.gameReview


reviewElement.addEventListener('input', (e) => {
    game.gameReview = e.target.value
    game.gameReviewedAt = moment().valueOf()
    saveGamePlay(gamePlay)
})

