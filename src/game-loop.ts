import {Loop} from 'vroum'
import Player from './nodes/player'
import Tank from './nodes/tank'
import Boss from './nodes/boss'
import Audio from './nodes/audio'
import UI from './ui'
import {logger, render} from './utils'

export class WebHealer extends Loop {
	gameOver = false

	// A global cooldown window that starts after each successful cast.
	// Spells can not be cast during global cooldown.
	gcd = 1500

	// Where the UI will be rendered.
	element: HTMLElement | null = null

	build() {
		return [new Player(), new Tank(), new Boss(), new Audio()]
	}

	tick = () => {
		if (this.gameOver) {
			log('game over')
			// this.find(Audio)?.disconnect()
			this.pause()
		}

		if (!this.element) throw new Error('Cant render game, missing element')
		render(this.element, UI(this))
		setTimeout(() => this.element?.classList.add('is-ready'), 500)
	}
}
