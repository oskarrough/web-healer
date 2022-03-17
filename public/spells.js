const spells = {
	heal: {
		name: 'Heal',
		heal: 40, // 307-353
		cost: 35,
		cast: 1000,
	},
	greaterheal: {
		name: 'Greater Heal',
		heal: 90, // 307-353
		cost: 170,
		cast: 3000,
	},
	renew: {
		name: 'Renew',
		heal: 45,
		cost: 30,
		cast: 0,
		duration: 15000, // ticks ever 3 secs?
	},
}

export default spells
