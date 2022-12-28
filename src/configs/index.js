import { numberRandow } from '../utils'

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
  }
}

/** Race configs */
export const RACE = {
  'Anão': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(0, 1),
    constitution: numberRandow(2, 3),
  },
  'Elfo': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
  },
  'Halfling': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
  },
  'Humano': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
  },
  'Gnomo': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(1, 2),
  },
  'Orc': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(0, 1),
    constitution: numberRandow(1, 2),
  },
  'Goblinoide': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(0, 1),
  },
  'Tiefling': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
  },
  'Nefilim': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(1, 2),
  },
  'Licantropo': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(0, 1),
  },
  'Gigante': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(0, 1),
    constitution: numberRandow(1, 2),
  },
  'Fada': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
  },
}

/** Caste configs */
export const CASTE = {
  'Bárbaro': {
    intelligence: numberRandow(0, 1),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(1, 2),
  },
  'Bardo': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(0, 1),
    charisma: numberRandow(2, 3),
  },
  'Bruxo': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  },
  'Clérigo': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  },
  'Druida': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  },
  'Feiticeiro': {
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(0, 1),
  },
  'Guerreiro': {
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(0, 1),
  },
  'Ladino': {
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(0, 1),
    charisma: numberRandow(1, 2),
  },
  'Mago': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(0, 1),
    charisma: numberRandow(2, 3),
  },
  'Monge': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  },
  'Paladino': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  },
  'Patrulheiro': {
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  },
}

/** Conditions configs */
export const CONDITIONS = {
  'Frio': {
    'Dia': {
      ground: numberRandow(-2, 2),
      resources: numberRandow(-2, 2),
    },
    'Tarde': {
      ground: numberRandow(-3, 1),
      resources: numberRandow(-3, 1),
    },
    'Noite': {
      ground: numberRandow(-1, 3),
      resources: numberRandow(-1, 3),
    },
  },
  'Normal': {
    'Dia': {
      ground: numberRandow(-3, 1),
      resources: numberRandow(-3, 1),
    },
    'Tarde': {
      ground: numberRandow(-2, 2),
      resources: numberRandow(-2, 2),
    },
    'Noite': {
      ground: numberRandow(-1, 3),
      resources: numberRandow(-1, 3),
    },
  },
  'Calor': {
    'Dia': {
      ground: numberRandow(-3, 1),
      resources: numberRandow(-3, 1),
    },
    'Tarde': {
      ground: numberRandow(-1, 3),
      resources: numberRandow(-1, 3),
    },
    'Noite': {
      ground: numberRandow(-2, 2),
      resources: numberRandow(-2, 2),
    },
  },
}

/** Inventory configs */
export const INVENTORY = {
  USABLE: {
    'Não': false,
    'Sim': true,
  },
}