import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { characterStore } from '../utils/store'
import { INITIAL } from '../utils/constants'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'
import useLoading from 'hooks/useLoading'

export function usePlayer() {
	const setNavigate = useNavigate()

	const { id_character } = useParams()
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()
	
	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		loadCharacter() {
			startLoading('bar')

			API('characters', {
				id: id_character,
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
				.finally(stopLoading)
		}
	}

	useSse('player', () => {
		handle.loadCharacter()
	})

	return {
		stateTabs: [tab, setTab],
		stateValues: [values, setValues],
	}
}