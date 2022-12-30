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
  'Anão': [3, 1, 2],
  'Elfo': [2, 3, 1],
  'Halfling': [1, 3, 2],
  'Humano': [3, 2, 1],
  'Gnomo': [1, 3, 2],
  'Orc': [2, 1, 3],
  'Goblinoide': [2, 3, 1],
  'Tiefling': [1, 3, 2],
  'Nefilim': [2, 3, 1],
  'Licantropo': [1, 2, 3],
  'Gigante': [2, 1, 3],
  'Fada': [2, 3, 1],
}

/** Caste configs */
export const CASTE = {
  'Bárbaro': [1, 3, 2],
  'Bardo': [2, 1, 3],
  'Bruxo': [2, 1, 3],
  'Clérigo': [2, 3, 1],
  'Druida': [1, 3, 2],
  'Feiticeiro': [2, 3, 1],
  'Guerreiro': [1, 3, 2],
  'Ladino': [3, 1, 2],
  'Mago': [3, 2, 1],
  'Monge': [2, 3, 1],
  'Paladino': [2, 1, 3],
  'Patrulheiro': [2, 3, 1],
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