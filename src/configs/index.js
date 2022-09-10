import {
  numberRandow,
} from '../utils'

/** Screen size breakpoint  */
export const BREAKPOINT = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
}

/** Race configs */
export const RACE = {
  'Anão': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(2, 3),
    intelligence: numberRandow(0, 1),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(0, 1),
  }, 
  'Elfo': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(1, 2),
  }, 
  'Halfling': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(2, 3),
  }, 
  'Humano': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(1, 2),
  }, 
  'Gnomo': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(1, 2),
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(0, 1),
    charisma: numberRandow(2, 3),
  }, 
  'Orc': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(2, 3),
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(0, 1),
    charisma: numberRandow(0, 1),
  }, 
  'Goblinoide': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(2, 3),
    intelligence: numberRandow(0, 1),
    wisdom: numberRandow(0, 1),
    charisma: numberRandow(1, 2),
  }, 
  'Tiefling': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(0, 1),
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(2, 3),
  }, 
  'Nefilim': {
    strength: numberRandow(1, 2),
    dexterity: numberRandow(0, 1),
    constitution: numberRandow(1, 2),
    intelligence: numberRandow(2, 3),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(0, 1),
  }, 
  'Licantropo': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(1, 2),
    constitution: numberRandow(2, 3),
    intelligence: numberRandow(0, 1),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(0, 1),
  }, 
  'Gigante': {
    strength: numberRandow(2, 3),
    dexterity: numberRandow(0, 1),
    constitution: numberRandow(2, 3),
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(1, 2),
    charisma: numberRandow(0, 1),
  }, 
  'Fada': {
    strength: numberRandow(0, 1),
    dexterity: numberRandow(2, 3),
    constitution: numberRandow(0, 1),
    intelligence: numberRandow(1, 2),
    wisdom: numberRandow(2, 3),
    charisma: numberRandow(1, 2),
  },
}

/** Caste configs */
export const CASTE = {
  'Bárbaro': 20,
  'Bardo': 50,
  'Bruxo': 40,
  'Clérigo': 50,
  'Druida': 20,
  'Feiticeiro': 30,
  'Guerreiro': 50,
  'Ladino': 40,
  'Mago': 40,
  'Monge': 10,
  'Paladino': 50,
  'Patrulheiro': 50,
}

/** Tendecy options */
export const TENDENCY = {
  'Bom': 2, 
  'Leal': 1, 
  'Neutro': 0, 
  'Caótico': 1,
  'Mau': 2,
}

/** Attributes options */
export const ATTRIBUTE = {
  PHISICAL: ['strength', 'dexterity', 'constitution'],
  MENTAL: ['intelligence', 'wisdom', 'charisma'],
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

/** Items options */
export const items = {
  'LOCAL': 'places',
  'OBJETO': 'objects',
  'VEICULO': 'vehicles',
}