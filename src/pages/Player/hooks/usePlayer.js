import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { characterStore } from '../utils/store'
import { INITIAL } from '../utils/constants'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function usePlayer() {
	const setNavigate = useNavigate()

	const { id_character } = useParams()
	const { USER } = useSelector(({ reducer }) => reducer)

	const { openMessage } = useMessage()
	
	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		loadCharacter() {
			API('characters', {
				id: id_character,
				user: USER.id,
			})
				.read(({ data }) => {
					if (data.blocked) {
						openMessage(data.status, data.message)
						characterStore.reset()
						return setNavigate('/')
					}
					const [character = INITIAL.VALUES] = data.response
					characterStore.set(character)
					setValues(character)
				})
		}
	}

	useSse('player', () => {
		handle.loadCharacter()
	}, [USER.id], Boolean(USER.id))

	return {
		stateTabs: [tab, setTab],
		stateValues: [values, setValues],
	}
}