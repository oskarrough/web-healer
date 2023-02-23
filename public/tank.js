import {Task} from './web_modules/vroum.js'
import * as actions from './actions.js'

export default class Tank extends Task {
	// keep track of Tank health
	health = 500
	baseHealth = 500

	// owns a list of Effects
	effects = []

	// apply different kind of DamageEffect to Boss
	tick = () => {
		if (this.health > 0) {
			this.health = this.health - 0.2
		} else {
			this.health = 0
			this.parent.gameOver = true
		}

		actions.reduceTankEffects(this.parent)
	}
}