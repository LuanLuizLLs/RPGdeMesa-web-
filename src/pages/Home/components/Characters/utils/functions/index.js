import { RACE, CASTE } from 'utils/constants'
import { numberRandow } from 'utils/functions'

export const characterAttributes = (race = '', caste = '') => {
	try {
		const {
			strength: [strengthMin, strengthMax],
			dexterity: [dexterityMin, dexterityMax],
			constitution: [constitutionMin, constitutionMax],
			intelligence: [intelligenceMin, intelligenceMax],
			wisdom: [wisdomMin, wisdomMax],
			charisma: [charismaMin, charismaMax],
		} = {
			...RACE[race],
			...CASTE[caste],
		}
    
		return {
			strength: numberRandow(strengthMin, strengthMax),
			dexterity: numberRandow(dexterityMin, dexterityMax),
			constitution: numberRandow(constitutionMin, constitutionMax),
			intelligence: numberRandow(intelligenceMin, intelligenceMax),
			wisdom: numberRandow(wisdomMin, wisdomMax),
			charisma: numberRandow(charismaMin, charismaMax),
		}
	} catch {
		return {}
	}
}