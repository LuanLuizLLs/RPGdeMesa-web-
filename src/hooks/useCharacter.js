import { CASTE, RACE } from '../configs'
import { numberRandow } from '../utils'

const useCharacter = () => {
  const additionalAttributes = (race = '', caste = '') => {
    const [strength, dexterity, constitution] = RACE[race]
    const [intelligence, wisdom, charisma] = CASTE[caste]

    return {
      strength: numberRandow(0, strength),
      dexterity: numberRandow(0, dexterity),
      constitution: numberRandow(0, constitution),
      intelligence: numberRandow(0, intelligence),
      wisdom: numberRandow(0, wisdom),
      charisma: numberRandow(0, charisma),
    }
  }

  return {
    additionalAttributes,
  }
}

export default useCharacter