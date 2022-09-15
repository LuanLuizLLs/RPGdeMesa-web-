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

/** Attributes configs */
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

/** Tendecy configs */
export const TENDENCY = {
  'Bom': 2, 
  'Leal': 1, 
  'Neutro': 0, 
  'Caótico': 1,
  'Mau': 2,
}

/** Conditions configs */
export const CONDITIONS = {
  'TER': 'ground',
  'REC': 'resources',
  'ILU': 'lighting',
  'TEM': 'temperature',
  'VEN': 'wind',
  'PRE': 'precipitation',
}

/** Periods configs */
export const PERIODS = {
  'Dia': {
    ground: numberRandow(3, 6),
    resources: numberRandow(2, 5),
    lighting: numberRandow(1, 4),
  },
  'Tarde': {
    ground: numberRandow(1, 4),
    resources: numberRandow(3, 6),
    lighting: numberRandow(2, 5),
  },
  'Noite': {
    ground: numberRandow(2, 5),
    resources: numberRandow(1, 4),
    lighting: numberRandow(3, 6),
  },
}

/** Seasons configs */
export const SEASONS = {
  'Outono': {
    temperature: numberRandow(1, 4),
    wind: numberRandow(2, 5),
    precipitation: numberRandow(3, 6),
  }, 
  'Inverno': {
    temperature: numberRandow(3, 6),
    wind: numberRandow(2, 5),
    precipitation: numberRandow(1, 4),
  }, 
  'Primavera': {
    temperature: numberRandow(1, 4),
    wind: numberRandow(3, 6),
    precipitation: numberRandow(2, 5),
  }, 
  'Verão': {
    temperature: numberRandow(3, 6),
    wind: numberRandow(1, 4),
    precipitation: numberRandow(2, 5),
  },
}

/** Adventures options */
export const ADVENTURES = [
  'Matar um personagem',
  'Proteger um personagem',
  'Capturar um personagem',
  'Libertar um personagem',
  'Encontrar um personagem',
  'Investigar um personagem',
  'Matar um monstro',
  'Proteger um monstro',
  'Capturar um monstro',
  'Libertar um monstro',
  'Encontrar um monstro',
  'Escapar de um monstro',
  'Matar um animal',
  'Proteger um animal',
  'Capturar um animal',
  'Libertar um animal',
  'Encontrar um animal',
  'Destruir um objeto',
  'Encontrar um objeto',
  'Proteger um objeto',
  'Roubar um objeto',
  'Recuperar um objeto',
  'Transportar um objeto',
  'Destruir um local',
  'Encontrar um local',
  'Chegar em um local',
  'Proteger um local',
  'Investigar um local',
  'Escapar de um local',
  'Destruir um veículo',
  'Encontrar um veículo',
  'Chegar em um veículo',
  'Proteger um veículo',
  'Investigar um veículo',
  'Escapar de um veículo',
]

/** Adventures options */
export const SCENARIOS = [
  'Floresta',
  'Pântano',
  'Montanha',
  'Mar',
  'Ártico',
  'Deserto',
  'Colina',
  'Planíce',
  'Metrópole',
  'Reino',
  'Cidade',
  'Vila',
  'Aldeia',
  'Povoado',
]