let gamePlay = getSavedGamePlay()

document.querySelector('#startGame').addEventListener('submit', function (e) {
    e.preventDefault()
    let gameSelection = getRandomKitty(1, 4)
    let kitty = kittyLookUp(gameSelection)
    processUserInput(e, kitty)
    saveGamePlay()
    sortGameDetailByPlayer(gamePlay)
    generatelbDOM(groupByPlayerGame(gamePlay))
    generateGameDetailDOM(gamePlay)

})

document.querySelector('#getPlayer').addEventListener('input', function (e) {
    document.querySelector('#game-results').innerHTML = ''
})

sortGameDetailByPlayer(gamePlay)
generatelbDOM(groupByPlayerGame(gamePlay))
generateGameDetailDOM(gamePlay)




