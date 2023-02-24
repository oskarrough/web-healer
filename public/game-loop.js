import {Loop} from './web_modules/vroum.js'
import Player from './player.js'
import Tank from './tank.js'
import Boss from './boss.js'
import Audio from './audio.js'
import UI from './ui.js'
import {log, render} from './utils.js'

export class WebHealer extends Loop {
	gameOver = false

	// A global cooldown window that starts after each successful cast.
	// Spells can not be cast during global cooldown.
	gcd = 1500

	// Where the UI will be rendered.
	element = undefined

	mount() {
		this.add(new Player(), new Tank(), new Boss(), new Audio())
		log(this)
	}

	tick = () => {
		if (this.gameOver) {
			log('game over')
			this.pause()
		}
		if (!this.element) throw new Error('Cant render game, missing element')
		render(this.element, UI(this))
	}
}
