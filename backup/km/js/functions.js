
const getSavedGamePlay = () => {
    const gamePlayJSON = localStorage.getItem('gameplay')
    return gamePlayJSON ? JSON.parse(gamePlayJSON) : []
}

const getRandomKitty = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const kittyLookUp = function (randomSelection) {
    let kitty
    if (randomSelection === 1) {
        kitty = 'max'
    } else if (randomSelection === 2) {
        kitty = 'coco'
    } else if (randomSelection === 3) {
        kitty = 'smokey'
    } else if (randomSelection === 4) {
        kitty = 'molly'
    }
    return kitty
}

const processUserInput = function (e, kitty) {

    let userInitals = e.target.elements.getPlayer.value.toLowerCase()
    let userSelection = e.target.elements.getGuess.value
    let win
    const h3 = document.createElement('h3')
    
    if (userSelection.toLowerCase() === kitty.toLowerCase()) {
        win = 1
        h3.textContent = "Congrats you WON"
    } else {
        win = 0
        h3.textContent = `Bummer!! Give it another TRY! We selected ${kitty}!`
    }

    e.target.elements.getPlayer.value = ''
    e.target.elements.getGuess.value = ''
    
    document.querySelector('#game-results').appendChild(h3)
    document.querySelector('#getPlayer').focus()
    
    gameid = uuidv4();
    const timestamp = moment().valueOf()
    
    gamePlay.push({
        id: gameid,
        player: userInitals.toLowerCase(),
        outcome: win ? 1 : 0,
        userSelection: userSelection,
        appSelection: kitty,
        gamePlayedAt: timestamp,
        gameReview: null,
        gameReviewedAt: '' 
    })
}

const sortGameDetailByPlayer = function(gamePlay) {
    gamePlay.sort(function (a, b) {
        if (a.gamePlayedAt > b.gamePlayedAt) {
            return -1
        } else if (b.gamePlayedAt > a.gamePlayedAt) {
            return 1
        } else {
            return 0
        }
    })
}

//https://stackoverflow.com/questions/50664773/lodash-groupby-alphabet

const groupByPlayerGame = function(gamePlay){
    let lbArr = []

    const result = _(gamePlay)
        .groupBy(o => o.player)
        .map((gameplay, player) => ({
             player, gameplay
        }))
        .value();
        console.log(result)
    result.forEach(function(data){
        let player = data.player
        let attempts = data.gameplay.length
        let numbOfWins = 0 
        data.gameplay.forEach(function(entry){
            numbOfWins += entry.outcome
        })
        lbArr.push({
            player: player,
            attempts: attempts,
            wins: numbOfWins
        }) 
    })    
    return lbArr    
}


const generateGameDetailDOM =  function(gamePlay) {
    document.querySelector('#game-detail').innerHTML = ''
    gamePlay.forEach(function (person) {
        const a = document.createElement('a')
        const br = document.createElement('br')
        const span = document.createElement('span')

        if (person.gameReview !== null) {
            const r = document.createElement('span')
            r.textContent = '\u{1F31F}  '
            document.querySelector('#game-detail').appendChild(r)
        }

        a.setAttribute('href', `review.html#${person.id}`)
        span.textContent = `${person.player} played ${generateLastUpdated(person.gamePlayedAt)}`
        a.textContent = `Details`

        document.querySelector('#game-detail').appendChild(span)
        document.querySelector('#game-detail').appendChild(a)
        document.querySelector('#game-detail').appendChild(br)
    })
}

const generatelbDOM = function(arr){
    arr.sort(function(a, b){
        if(a.wins > b.wins){
            return -1
        } else if(a.wins < b.wins) {
            return 1
        } else {
            return 0
        }
    })
    document.querySelector('#leaderboard').innerHTML = ''
    const lbEl = document.createElement('div')
    arr.forEach(function (entry) {
        const p = document.createElement('p')
        p.textContent = `${entry.player} has ${entry.wins} wins ${entry.attempts} attempts! `
        lbEl.appendChild(p)
        document.querySelector('#leaderboard').appendChild(lbEl)
    })
         
}



const saveGamePlay = () => {
    localStorage.setItem('gameplay', JSON.stringify(gamePlay))
}

const generateLastUpdated = (timestamp) => ` ${moment(timestamp).fromNow()} `