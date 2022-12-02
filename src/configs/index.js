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

/** Tendecy configs */
export const TENDENCY = {
  'Bom': 3,
  'Leal': 2,
  'Neutro': 1,
  'Caótico': 2,
  'Mau': 3,
}

/** Conditions configs */
export const CONDITIONS = {
  'Outono': {
    'Dia': {
      ground: numberRandow(-6, 4),
      resources: numberRandow(-6, 4),
      climate: numberRandow(-6, 4),
    },
    'Tarde': {
      ground: numberRandow(-4, 4),
      resources: numberRandow(-4, 4),
      climate: numberRandow(-4, 4),
    },
    'Noite': {
      ground: numberRandow(-2, 4),
      resources: numberRandow(-2, 4),
      climate: numberRandow(-2, 4),
    },
  },
  'Inverno': {
    'Dia': {
      ground: numberRandow(-6, 6),
      resources: numberRandow(-6, 6),
      climate: numberRandow(-6, 6),
    },
    'Tarde': {
      ground: numberRandow(-4, 6),
      resources: numberRandow(-4, 6),
      climate: numberRandow(-4, 6),
    },
    'Noite': {
      ground: numberRandow(-2, 6),
      resources: numberRandow(-2, 6),
      climate: numberRandow(-2, 6),
    },
  },
  'Primavera': {
    'Dia': {
      ground: numberRandow(-6, 3),
      resources: numberRandow(-6, 3),
      climate: numberRandow(-6, 3),
    },
    'Tarde': {
      ground: numberRandow(-4, 3),
      resources: numberRandow(-4, 3),
      climate: numberRandow(-4, 3),
    },
    'Noite': {
      ground: numberRandow(-2, 3),
      resources: numberRandow(-2, 3),
      climate: numberRandow(-2, 3),
    },
  },
  'Verão': {
    'Dia': {
      ground: numberRandow(-6, 5),
      resources: numberRandow(-6, 5),
      climate: numberRandow(-6, 5),
    },
    'Tarde': {
      ground: numberRandow(-4, 5),
      resources: numberRandow(-4, 5),
      climate: numberRandow(-4, 5),
    },
    'Noite': {
      ground: numberRandow(-2, 5),
      resources: numberRandow(-2, 5),
      climate: numberRandow(-2, 5),
    },
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
  'Perseguir um veículo',
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

/** Inventory configs */
export const INVENTORY = {
  USABLE: {
    'Não': false,
    'Sim': true,
  },
}