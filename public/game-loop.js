import App from './app.js'
import {newGame, tick, castSpell, interrupt} from './actions.js'
const {uhtml} = window

/*
	Here's a simplified version of how this works:

	game loop is called every frame.
	  it updates the previous state,
		and renders the new state

	in other words:

	WebHealer() {
		state = newGame()
		gameLoop() {
			newState = update(oldState)
			render(newState)
		}
		start = requestAnimationFrame(gameLoop)
	}

	.. if only it was this simple. Let's continue.
*/

export function WebHealer(element) {
	// Here we store global timers for easy access.
	window.webhealer = window.webhealer || {}

	let state = newGame()
	let prevTime = 0
	let accumulatedFrameTime = 0

	const queue = []
	function addAction(action) {
		queue.push(action)
	}

	function gameLoop(time) {
		const frameDuration = 1000 / state.config.fps

		if (!prevTime) prevTime = performance.now()

		const elapsedTimeBetweenFrames = time - prevTime

		prevTime = time

		accumulatedFrameTime += elapsedTimeBetweenFrames

		let numberOfUpdates = 0

		// Update as many times as needed to catch up with the frame rate.
		// In other words, if enough time has passed, update
		while (accumulatedFrameTime >= frameDuration) {
			state = updateGameState(state, frameDuration)

			accumulatedFrameTime -= frameDuration

			// do a sanity check
			if (numberOfUpdates++ >= 200) {
				accumulatedFrameTime = 0
				console.error('whaaat')
				break
			}

			// And it will render the state.
			// const interpolate = accumulatedFrameTime / frameDuration
			renderGame(state)
		}

		// And call itself, since this is a loop.
		window.webhealer.timer = requestAnimationFrame(gameLoop)
	}

	function updateGameState(baseState, delta) {
		// console.debug('update')
		let state = tick(baseState, delta)

		// Go through the queue and execute actions.
		for (let action of queue) {
			console.info('action', action.type)

			if (action.type === 'castSpell') {
				try {
					state = castSpell(state, action.spellId)
				} catch (error) {
					console.warn(error.message)
				}
			}
			if (action.type === 'interrupt') state = interrupt(state)

			queue.pop()
		}

		if (state.gameOver) {
			setTimeout(() => {
				cancelAnimationFrame(window.webhealer.timer)
			}, 1000 / state.config.fps)
		}

		return state
	}

	function renderGame(state) {
		uhtml.render(element, App(state, addAction))
	}

	return {
		start: () => requestAnimationFrame(gameLoop),
		stop: () => cancelAnimationFrame(window.webhealer.timer),
	}
}

const rootEl = document.querySelector('#root')
const webHealer = WebHealer(rootEl)
webHealer.start()

// setTimeout(webHealer.stop, 3000)
