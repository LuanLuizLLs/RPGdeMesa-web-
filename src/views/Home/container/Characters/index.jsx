import React from 'react'
import imagePlayer from 'assets/img/player.png'
import { Modals } from './components/Modals'
import { useCharacters } from './hooks/useCharacters'
import { Button, Card, Image, List, Title, Modal } from 'components'

function Characters() {
	const { list, handle, stateModal, stateValues } = useCharacters()

	return (
		<>
			<Modal
				maxWidth={450}
				stateModal={stateModal}
				onClose={handle.resetValues}
			>
				<Modals
					handle={handle}
					stateModal={stateModal}
					stateValues={stateValues}
				/>
			</Modal>
			<Card>
				<Image
					maxHeight={100}
					maxWidth={100}
					margin="0 auto"
					alt="armadura de cavaleiro"
					src={imagePlayer}
				/>
				<Title type="h4" textAlign="center">
          Lista de Personagens:
				</Title>
				<List
					height={300}
					{...list}
					onClick={(row) => handle.openModal('character_start', row)}
					actions={{
						update: (row) => handle.openModal('character_update', row),
						delete: (row) => handle.openModal('character_delete', row),
					}}
				/>
				<Button type="filled" padding={10} onClick={() => handle.openModal('character_create')}>
          Criar personagem
				</Button>
			</Card>
		</>
	)
}

export default Characters