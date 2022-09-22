import {
  numberRandow, optionRandow,
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
  'Bárbaro': 2,
  'Bardo': 5,
  'Bruxo': 4,
  'Clérigo': 5,
  'Druida': 2,
  'Feiticeiro': 3,
  'Guerreiro': 5,
  'Ladino': 4,
  'Mago': 4,
  'Monge': 1,
  'Paladino': 5,
  'Patrulheiro': 5,
}

/** Tendecy configs */
export const TENDENCY = {
  'Bom': 6,
  'Leal': 3,
  'Neutro': 0,
  'Caótico': 3,
  'Mau': 6,
}

/** Conditions configs */
export const CONDITIONS = {
  GROUND: [
    'Fácil',
    'Médio',
    'Dificíl',
  ],
  RESOURCES: [
    'Fácil',
    'Médio',
    'Dificíl',
  ],
  LIGHTING: [
    'Baixa',
    'Normal',
    'Alta',
  ],
  TEMPERATURE: [
    'Baixa',
    'Normal',
    'Alta',
  ],
  WIND: [
    'Fraco',
    'Nenhum',
    'Forte',
  ],
  PRECIPITATION: [
    'Fraca',
    'Nenhuma',
    'Forte',
  ],
}

export const PERIODS = {
  'Dia': {
    ground: numberRandow(0, 3),
    resources: numberRandow(0, 3),
    lighting: numberRandow(0, 3),
    temperature: numberRandow(0, 3),
    wind: numberRandow(0, 3),
    precipitation: numberRandow(0, 3),
  },
  'Tarde': {
    ground: numberRandow(0, 3),
    resources: numberRandow(0, 3),
    lighting: numberRandow(0, 3),
    temperature: numberRandow(0, 3),
    wind: numberRandow(0, 3),
    precipitation: numberRandow(0, 3),
  },
  'Noite': {
    ground: numberRandow(0, 3),
    resources: numberRandow(0, 3),
    lighting: numberRandow(0, 3),
    temperature: numberRandow(0, 3),
    wind: numberRandow(0, 3),
    precipitation: numberRandow(0, 3),
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
  'Selva',
  'Pântano',
  'Colina',
  'Planíce',
  'Montanha',
  'Mar',
  'Ártico',
  'Deserto',
  'Povoado',
  'Aldeia',
  'Vila',
  'Cidade',
  'Metrópole',
  'Reino',
]