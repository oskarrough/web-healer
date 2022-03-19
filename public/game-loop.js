const {render} = window.uhtml
import Game from './game.js'
// import {roundOne} from './utils.js'
import {newGame} from './actions.js'

const state = newGame()

// The game loop.
// On every frame it will update the state and render the game.

const rootEl = document.querySelector('#root')
const fps = 30
const frameDuration = 1000 / fps

const startTime = performance.now()
let prevTime = performance.now()
let accumulatedFrameTime = 0
let timer

export default function gameLoop(time) {
	const elapsedTimeBetweenFrames = time - prevTime
	prevTime = time
	accumulatedFrameTime += elapsedTimeBetweenFrames

	let numberOfUpdates = 0

	while (accumulatedFrameTime >= frameDuration) {
		updateGame(frameDuration)
		accumulatedFrameTime -= frameDuration

		// do a sanity check
		if (numberOfUpdates++ >= 200) {
			accumulatedFrameTime = 0
			console.error('whaaat')
			// restoreTheGameState()
			break
		}
	}

	// this is a percentage of time
	const interpolate = accumulatedFrameTime / frameDuration
	renderGame(interpolate)

	timer = requestAnimationFrame(gameLoop)
}

function renderGame(interpolate) {
	render(rootEl, Game(state))
}

function updateGame(delta) {
	const sinceStart = performance.now() - state.beginningOfTime
	state.elapsedTime = Math.round((sinceStart / 1000) * 100) / 100

	state.time = delta

	// Reduce the tank's health slowly..
	state.party.tank.health = state.party.tank.health - 1

	// Regenerate mana.
	const newMana = state.mana + 0.2
	state.mana = newMana > state.maxMana ? state.maxMana : newMana

	// Count down cast time, if needed
	const {castTime} = state
	if (castTime > 0) {
		const newTime = castTime - delta
		state.castTime = newTime > 0 ? newTime : 0
	}

	// Reset global cooldown.
	const {gcd} = state
	if (gcd > 0) {
		const newTime = gcd - delta
		state.gcd = newTime > 0 ? newTime : 0
	}

	// Stop game if the tank has died.
	if (state.party.tank.health < 0) {
		state.party.tank.health = 0
		window.cancelAnimationFrame(timer)
		return
	}
}
