const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        score: document.querySelector('#score'),
        life: document.querySelector('#lives'),
        timeLeft: document.querySelector('#time-left'),
    },
    values: {
        hitPosition: null,
        result: 0,
        life: 3,
        currentTime: 10,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        moveEnemyTimerId: setInterval(randomSquare,1000)
    }
}

function playSound() {
    const audio = new Audio('./src/audios/hit.m4a')
    audio.volume = 0.2
    audio.play()
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null

                playSound()
            }
        })
    })
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })

    const randomNumber = Math.floor(Math.random() * 9)

    const randomSquare = state.view.squares[randomNumber]

    randomSquare.classList.add('enemy')

    state.values.hitPosition = randomSquare.id
    
}

function countLifes() {
    state.values.life--
    state.view.life.textContent = `x${state.values.life}`

    if(state.values.life > 0) {

        alert(`Tempo esgotado! Você ainda tem mais ${state.values.life} vidas. `)
        
        state.values.currentTime = 10
        state.view.timeLeft.textContent = state.values.currentTime

    } else {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.moveEnemyTimerId)

        alert('GAME OVER!')
    }
}

function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime === 0) {
        countLifes()
    }
}

function setGameRules() {
    state.view.life.textContent = `x${state.values.life}`
    state.view.score.textContent = `${state.values.result}`
    state.view.timeLeft.textContent = `${state.values.currentTime}`
}

function initialize() {
    setGameRules()
    addListenerHitBox()
}

initialize()