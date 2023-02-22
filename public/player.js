import {Node} from './web_modules/vroum.js'
import * as actions from './actions.js'
import {clamp, log} from './utils.js'

export default class Player extends Node {
	// keep track of Player mana
	mana = 400
	baseMana = 500

	/** @prop {{time: Number, spell: Spell}} */
	casting = undefined

	get castTime() {
		return this.parent.elapsedTime - this.casting?.time
	}

	/**
	 * Global cooldown is active X ms after finishing a spell cast.
	 * @returns {Boolean} */
	get gcd() {
		return this.castTime > this.parent.gcd
	}

	tick() {
		// const now = performance.now()
		const {casting} = this
		const elapsedTime = this.parent.elapsedTime

		// Clear any spell that finished casting.
		if (casting && casting.spell.cast === 0) {
			log('apply effect')
			actions.applyTankEffects(this.parent)
		}

		// Finish spell
		if (this.casting) {
			const done = elapsedTime - casting.time >= casting.spell.cast
			if (done) {
				actions.applySpell(this.parent, casting.spell)
				this.casting = false
			}
		}

		// Regenerate mana after X seconds
		const timeSinceLastCast = elapsedTime - (casting?.time || 0)
		if (timeSinceLastCast > 2000) {
			this.mana = clamp(this.mana + 0.3, 0, this.baseMana)
		}
	}

	// owns a list of Spell
	// spells = []
	// has a method to start casting spells
}
