import { Box, Button, Input, Text, Title } from 'components'
import React from 'react'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values] = stateValues

	return {
		add_character: (
			<>
				<Title type="h6">
          Adicionar personagem:
				</Title>
				<Box marginBottom={20}>
					<Input
						name={values.name ? 'name' : 'id'}
						label="Personagem"
						placeholder="ID do personagem"
						onEnter={handle.searchCharacter}
						stateValue={stateValues}
						readOnly={Boolean(values.name)}
					/>
				</Box>
				<Box display="flex" justifyContent="flex-end">
					<Button type="filled" color="secondary" width="fit-content" padding={10} onClick={values.name ? handle.clearValues : handle.resetCharacter}>
						{values.name ? 'Limpar' : 'Cancelar'}
					</Button>
					<Button type="filled" width="fit-content" padding={10} onClick={values.name ? handle.addCharacter : handle.searchCharacter}>
						{values.name ? 'Confirmar' : 'Pesquisar'}
					</Button>
				</Box>
			</>
		),
		remove_character: (
			<>
				<Title type="h6">
          Remover personagem:
				</Title>
				<Text>
          Tem certeza que deseja remover <b>{modal.data.name}</b> da campanha?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" width="fit-content" padding={10} onClick={handle.resetCharacter}>
            Cancelar
					</Button>
					<Button type="filled" color="error" width="fit-content" padding={10} onClick={handle.removeCharacter}>
            Remover
					</Button>
				</Box>
			</>
		)
	}
}