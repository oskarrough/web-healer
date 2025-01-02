import {html} from 'uhtml'
import {WebHealer} from '../web-healer'
import {Audio} from '../nodes/audio'
import {logger} from '../combatlog'
import {Boss} from '../nodes/boss'
import {Tank} from '../nodes/tank'
import gsap from 'gsap'

export function Menu(game: WebHealer) {
	const audio = game.query(Audio)!

	//@ts-ignore
	const handleChange = ({target}) => {
		// @todo audio doesn't exist because dungeon wasn't started..
		if (!audio) return
		audio.disabled = !target.checked
		if (audio.element) audio.element.volume = target.checked ? 0.5 : 0
	}

	const start = () => animatedStartGame(game)

	return html`
		<div class="Menu">
			<h1>Web Healer</h1>
			<p style="font-size: 2vw">How long can you keep the tank alive?</p>
			<nav>
				<button class="Spell Button" type="button" onclick=${() => start()}>
					Enter dungeon
				</button>
			</nav>
			<label> <input type="checkbox" onchange=${handleChange} checked /> Sound </label>
		</div>

		<div class="IngameMenu">
			<nav>
				<a class="Spell Button" type="button" href="/?debug"> Try again </a>
				<button class="Spell Button" type="button" onclick=${() => game.play()}>
					Play
				</button>
				<button class="Spell Button" type="button" onclick=${() => game.pause()}>
					Pause
				</button>
			</nav>
			<nav hidden>
				<button class="Spell Button" type="button" onclick=${() => game.add(Tank.new())}>
					Add tank
				</button>
				<button class="Spell Button" type="button" onclick=${() => game.add(Boss.new())}>
					Add boss
				</button>
			</nav>
		</div>
	`
}

function animatedStartGame(game: WebHealer) {
		logger.info('animating new game start')
		game.stop()
		game.gameOver = false
		gsap
			.timeline({
				onComplete: () => {
					game.start()
				},
			})
			.to('.Frame-splashImage', {width: 100, marginTop: 0, duration: 1})
			.to('.Menu', {autoAlpha: 0, duration: 1}, '<')
			.to('.Frame-game', {opacity: 1, duration: 1}, '>-0.2')
			.to('.IngameMenu', {opacity: 1, duration: 0.5}, '<')
			.to('.Game-bg', {opacity: 0.2, duration: 0.5}, '<')
			.fromTo('.Player', {y: 40, autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 1}, '1')
			.fromTo(
				'.ActionBar',
				{y: 100, autoAlpha: 0},
				{y: 0, autoAlpha: 1, duration: 1},
				'<'
			)
			.fromTo('.Enemies', {x: 300, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1}, '<50%')
	
}
