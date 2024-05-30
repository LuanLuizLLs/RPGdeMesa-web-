import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { INITIAL } from '../constants/initial'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function usePlayer() {
	const setDispatch = useDispatch()

	const { id_character } = useParams()
	const { USER, CHARACTER, CAMPAIGN } = useSelector(({ reducer }) => reducer)
	
	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(id_character ? INITIAL.VALUES : CHARACTER)

	useSse('player', () => {
		API('characters', {
			id: id_character || CHARACTER.id,
			user: USER.id,
			campaign: CAMPAIGN.id,
		})
			.read(({ data }) => {
				const [character = INITIAL.VALUES] = data.response
				setValues(character)
				setDispatch({
					type: 'CHARACTER',
					data: character,
				})
			})
	}, [id_character, USER.id, CAMPAIGN.id, CHARACTER.id])

	return {
		stateTabs: [tab, setTab],
		stateValues: [values, setValues],
	}
}