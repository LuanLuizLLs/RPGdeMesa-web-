import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { INITIAL } from '../constants/initial'
import useSse from 'hooks/useSse'
import API from 'services/api'
import useMessage from 'hooks/useMessage'

export function usePlayer() {
	const setNavigate = useNavigate()
	const setDispatch = useDispatch()

	const { id_character } = useParams()
	const { openMessage } = useMessage()
	const { CHARACTER, USER } = useSelector(({ reducer }) => reducer)
	
	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(CHARACTER)

	const handle = {
		loadCharacter() {
			API('characters', {
				id: id_character || CHARACTER.id,
				user: USER.id,
			})
				.read(({ data }) => {
					if (data.blocked) {
						openMessage(data.status, data.message)
						setDispatch({
							type: 'CHARACTER',
							data: {},
						})
						return setNavigate('/')
					}
					const [character = INITIAL.VALUES] = data.response
					setValues(character)
					setDispatch({
						type: 'CHARACTER',
						data: character,
					})
				})
		}
	}

	useSse('player', () => {
		handle.loadCharacter()
	}, [id_character, CHARACTER.id, USER.id])

	return {
		stateTabs: [tab, setTab],
		stateValues: [values, setValues],
	}
}