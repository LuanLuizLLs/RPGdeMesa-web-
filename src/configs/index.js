/** Screen size breakpoint  */
export const BREAKPOINT = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
}

/** Attributes configs */
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
  }
}

/** Race configs */
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

/** Caste configs */
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

/** Conditions configs */
export const CONDITIONS = {
  'Dia': {
    'Frio': [-1, 3],
    'Normal': [-2, 2],
    'Quente': [-3, 1],
  },
  'Tarde': {
    'Frio': [-2, 2],
    'Normal': [-3, 1],
    'Quente': [-1, 3],
  },
  'Noite': {
    'Frio': [-1, 3],
    'Normal': [-2, 2],
    'Quente': [-3, 1],
  },
}

/** Inventory configs */
export const INVENTORY = {
  USABLE: {
    'Não': false,
    'Sim': true,
  },
}