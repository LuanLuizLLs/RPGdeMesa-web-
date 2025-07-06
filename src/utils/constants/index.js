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

export const RACE = {
	'Anão': {
		strength: [2, 3],
		dexterity: [0, 1],
		constitution: [1, 2],
	},
	'Elfo': {
		strength: [1, 2],
		dexterity: [2, 3],
		constitution: [0, 1],
	},
	'Halfling': {
		strength: [0, 1],
		dexterity: [2, 3],
		constitution: [1, 2],
	},
	'Humano': {
		strength: [2, 3],
		dexterity: [1, 2],
		constitution: [0, 1],
	},
	'Gnomo': {
		strength: [0, 1],
		dexterity: [2, 3],
		constitution: [1, 2],
	},
	'Orc': {
		strength: [1, 2],
		dexterity: [0, 1],
		constitution: [2, 3],
	},
	'Goblinoide': {
		strength: [1, 2],
		dexterity: [2, 3],
		constitution: [0, 1],
	},
	'Tiefling': {
		strength: [2, 3],
		dexterity: [1, 2],
		constitution: [0, 1],
	},
	'Nefilim': {
		strength: [1, 2],
		dexterity: [2, 3],
		constitution: [0, 1],
	},
	'Licantropo': {
		strength: [0, 1],
		dexterity: [1, 2],
		constitution: [2, 3],
	},
	'Gigante': {
		strength: [1, 2],
		dexterity: [0, 1],
		constitution: [2, 3],
	},
	'Fada': {
		strength: [1, 2],
		dexterity: [2, 3],
		constitution: [0, 1],
	},
}

export const CASTE = {
	'Bárbaro': {
		intelligence: [0, 1],
		wisdom: [2, 3],
		charisma: [1, 2],
	},
	'Bardo': {
		intelligence: [1, 2],
		wisdom: [0, 1],
		charisma: [2, 3],
	},
	'Bruxo': {
		intelligence: [1, 2],
		wisdom: [0, 1],
		charisma: [2, 3],
	},
	'Clérigo': {
		intelligence: [1, 2],
		wisdom: [2, 3],
		charisma: [0, 1],
	},
	'Druida': {
		intelligence: [0, 1],
		wisdom: [2, 3],
		charisma: [1, 2],
	},
	'Feiticeiro': {
		intelligence: [1, 2],
		wisdom: [2, 3],
		charisma: [0, 1],
	},
	'Guerreiro': {
		intelligence: [0, 1],
		wisdom: [2, 3],
		charisma: [1, 2],
	},
	'Ladino': {
		intelligence: [1, 2],
		wisdom: [0, 1],
		charisma: [2, 3],
	},
	'Mago': {
		intelligence: [2, 3],
		wisdom: [1, 2],
		charisma: [0, 1],
	},
	'Monge': {
		intelligence: [1, 2],
		wisdom: [2, 3],
		charisma: [0, 1],
	},
	'Paladino': {
		intelligence: [1, 2],
		wisdom: [0, 1],
		charisma: [2, 3],
	},
	'Patrulheiro': {
		intelligence: [1, 2],
		wisdom: [2, 3],
		charisma: [0, 1],
	},
}

export const TENDENCY = {
	'Bom': [0, 3],
	'Leal': [0, 2],
	'Neutro': [0, 1],
	'Caótico': [0, 2],
	'Mau': [0, 3],
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
		'Moedas',
		'Ações',
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
	CHARACTER: {
		RACE: Object.keys(RACE),
		CASTE: Object.keys(CASTE),
		TENDENCY: Object.keys(TENDENCY),
	},
	CAMPAIGN: {
		PERIOD: Object.keys(CONDITIONS),
		CLIMATE: Object.keys(CONDITIONS.Dia)
	},
	INVENTORY: {
		USABLE: Object.keys(INVENTORY.USABLE)
	}
}