export const BREAKPOINT = {
	mobile: 425,
	tablet: 768,
	laptop: 1024,
	desktop: 1440,
}

export const ATTRIBUTE = {
	PHISICAL: [
		'strength',
		'dexterity',
		'constitution',
	],
	MENTAL: [
		'intelligence',
		'wisdom',
		'charisma',
	],
	PRIMARY: {
		'FOR': 'strength',
		'DES': 'dexterity',
		'CON': 'constitution',
		'INT': 'intelligence',
		'SAB': 'wisdom',
		'CAR': 'charisma',
	},
	SECONDARY: {
		'VID': 'life',
		'MOE': 'coins',
		'ACO': 'actions',
		'DAN': 'damage',
	},
	ICONS: {
		'FOR': '💪',
		'DES': '👋',
		'CON': '✊',
		'INT': '📙',
		'SAB': '🙌',
		'CAR': '🤝',
		'VID': '❤️',
		'MOE': '💰',
		'ACO': '👣',
		'DAN': '🩸',
		'DAD': '🎲',
	},
	RANK: [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
	],
}

export const BOARD = {
	ICONS: {
		'HOR': '⬌',
		'VER': '⬍',
	},
	PIECES: {
		'Personagem': [
			'➊',
			'➋',
			'➌',
			'➍',
			'➎',
			'➏',
			'➐',
			'➑',
			'➒',
			'➓',
		],
		'Marcador': [
			'•',
			'▪',
			'▴',
		],
		'Passagem': [
			'☗',
			'⬍',
			'⬌',
		],
		'Bloqueio': [
			'✖',
			'⊗',
			'⊠',
		],
	},
}

export const CONDITIONS = {
	'Dia': {
		'Frio': [-2, 6],
		'Normal': [-4, 4],
		'Quente': [-6, 2],
	},
	'Tarde': {
		'Frio': [-4, 4],
		'Normal': [-6, 2],
		'Quente': [-2, 6],
	},
	'Noite': {
		'Frio': [-2, 6],
		'Normal': [-4, 4],
		'Quente': [-6, 2],
	},
}

export const ABILITY = {
	ACTIVE: {
		'Ativa': true,
		'Passiva': false,
	},
}

export const INVENTORY = {
	USABLE: {
		'Não': false,
		'Sim': true,
	},
}

export const ADVENTURE = {
	ICONS: {
		GOAL: '🎯',
		REWARD: '🏆',
	},
	GOAL: [
		'Atacar',
		'Ajudar',
		'Destruir',
		'Adquirir',
		'Encontrar',
		'Recuperar',
		'Resgatar',
		'Descobrir',
		'Matar',
		'Perseguir',
		'Escapar',
		'Acompanhar',
		'Ganhar',
		'Negociar',
		'Esconder',
		'Defender',
		'Proteger',
		'Escoltar',
		'Chegar',
	],
	REWARD: [
		'Características',
		'Habilidades',
		'Itens',
	],
}

export const SCENERY = {
	ICONS: {
		REGION: '🌐',
		CULTURE: '👥',
	},
	REGION: [
		'Oceano',
		'Costa',
		'Floresta',
		'Selva',
		'Pântano',
		'Colina',
		'Planíce',
		'Montanha',
		'Savana',
		'Planalto',
		'Deserto',
		'Ártico',
		'Urbano',
	],
	CULTURE: [
		'Harmonia',
		'Tensão ou rivalidade',
		'Maioria racial são conquistadores',
		'Minoria racial são governantes',
		'Minoria racial são refugiados',
		'Maioria racial oprime minoria',
		'Minoria racial oprime maioria',
	],
}

export const OPTIONS = {
	ATTRIBUTE: {
		PRIMARY: Object.keys(ATTRIBUTE.PRIMARY),
		SECONDARY: Object.keys(ATTRIBUTE.SECONDARY)
	},
	BOARD: {
		PIECES: Object.keys(BOARD.PIECES),
	},
	CAMPAIGN: {
		PERIOD: Object.keys(CONDITIONS),
		CLIMATE: Object.keys(CONDITIONS.Dia)
	},
	INVENTORY: {
		USABLE: Object.keys(INVENTORY.USABLE)
	}
}