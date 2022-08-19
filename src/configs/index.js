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
    strength: numberRandow(1, 3),
    dexterity: numberRandow(0, 2),
    constitution: numberRandow(1, 3),
    intelligence: numberRandow(-1, 1),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(-1, 1),
  }, 
  'Elfo': {
    strength: numberRandow(-1, 1),
    dexterity: numberRandow(1, 3),
    constitution: numberRandow(-1, 1),
    intelligence: numberRandow(1, 3),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(0, 2),
  }, 
  'Halfling': {
    strength: numberRandow(-1, 1),
    dexterity: numberRandow(1, 3),
    constitution: numberRandow(-1, 1),
    intelligence: numberRandow(0, 2),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(1, 3),
  }, 
  'Humano': {
    strength: numberRandow(-1, 1),
    dexterity: numberRandow(1, 3),
    constitution: numberRandow(-1, 1),
    intelligence: numberRandow(1, 3),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(0, 2),
  }, 
  'Gnomo': {
    strength: numberRandow(-1, 1),
    dexterity: numberRandow(0, 2),
    constitution: numberRandow(0, 2),
    intelligence: numberRandow(1, 3),
    wisdom: numberRandow(-1, 1),
    charisma: numberRandow(1, 3),
  }, 
  'Orc': {
    strength: numberRandow(1, 3),
    dexterity: numberRandow(0, 2),
    constitution: numberRandow(1, 3),
    intelligence: numberRandow(0, 2),
    wisdom: numberRandow(-1, 1),
    charisma: numberRandow(-1, 1),
  }, 
  'Goblinoide': {
    strength: numberRandow(0, 2),
    dexterity: numberRandow(1, 3),
    constitution: numberRandow(1, 3),
    intelligence: numberRandow(-1, 1),
    wisdom: numberRandow(-1, 1),
    charisma: numberRandow(0, 2),
  }, 
  'Tiefling': {
    strength: numberRandow(-1, 1),
    dexterity: numberRandow(0, 2),
    constitution: numberRandow(-1, 1),
    intelligence: numberRandow(1, 3),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(1, 3),
  }, 
  'Nefilim': {
    strength: numberRandow(0, 2),
    dexterity: numberRandow(-1, 1),
    constitution: numberRandow(0, 2),
    intelligence: numberRandow(1, 3),
    wisdom: numberRandow(1, 3),
    charisma: numberRandow(-1, 1),
  }, 
  'Licantropo': {
    strength: numberRandow(1, 3),
    dexterity: numberRandow(0, 2),
    constitution: numberRandow(1, 3),
    intelligence: numberRandow(-1, 1),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(-1, 1),
  }, 
  'Gigante': {
    strength: numberRandow(1, 3),
    dexterity: numberRandow(-1, 1),
    constitution: numberRandow(1, 3),
    intelligence: numberRandow(0, 2),
    wisdom: numberRandow(0, 2),
    charisma: numberRandow(-1, 1),
  }, 
  'Fada': {
    strength: numberRandow(-1, 1),
    dexterity: numberRandow(1, 3),
    constitution: numberRandow(-1, 1),
    intelligence: numberRandow(0, 2),
    wisdom: numberRandow(1, 3),
    charisma: numberRandow(0, 2),
  },
}

/** Caste configs */
export const CASTE = {
  'Bárbaro': {
    life: numberRandow(12, 16),
    coins: numberRandow(10, 18),
    actions: numberRandow(3, 7),
  },
  'Bardo': {
    life: numberRandow(8, 12),
    coins: numberRandow(10, 20),
    actions: numberRandow(3, 5),
  },
  'Bruxo': {
    life: numberRandow(8, 12),
    coins: numberRandow(10, 16),
    actions: numberRandow(3, 5),
  },
  'Clérigo': {
    life: numberRandow(8, 12),
    coins: numberRandow(10, 20),
    actions: numberRandow(3, 5),
  },
  'Druida': {
    life: numberRandow(8, 12),
    coins: numberRandow(10, 18),
    actions: numberRandow(3, 5),
  },
  'Feiticeiro': {
    life: numberRandow(6, 10),
    coins: numberRandow(8, 12),
    actions: numberRandow(3, 4),
  },
  'Guerreiro': {
    life: numberRandow(10, 14),
    coins: numberRandow(10, 20),
    actions: numberRandow(3, 6),
  },
  'Ladino': {
    life: numberRandow(8, 12),
    coins: numberRandow(10, 16),
    actions: numberRandow(3, 5),
  },
  'Mago': {
    life: numberRandow(6, 10),
    coins: numberRandow(10, 16),
    actions: numberRandow(3, 4),
  },
  'Monge': {
    life: numberRandow(8, 12),
    coins: numberRandow(6, 10),
    actions: numberRandow(3, 5),
  },
  'Paladino': {
    life: numberRandow(10, 14),
    coins: numberRandow(10, 20),
    actions: numberRandow(3, 6),
  },
  'Patrulheiro': {
    life: numberRandow(10, 14),
    coins: numberRandow(8, 12),
    actions: numberRandow(3, 6),
  }
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

/** Attributes options */
export const items = {
  'USO': 'usable',
  'OBJETO': 'equip',
  'VEICULO': 'move',
  'LOCAL': 'property',
}