import React from 'react'
import { Box, Button, Text, Title } from 'components'

export function DeleteInteraction({ stateModal, onReset, onDelete }) {
	const [modal] = stateModal

	return (
		<>
			<Title type="h6">
        Deletar interação:
			</Title>
			<Text>
        Tem certeza que deseja excluir a interação <b>{modal.data.name}</b>?
			</Text>
			<Box display="flex" justifyContent="flex-end" marginTop={10}>
				<Button type="bottomless" padding={10} onClick={onReset}>
          Cancelar
				</Button>
				<Button type="filled" color="error" padding={10} onClick={onDelete}>
          Excluir
				</Button>
			</Box>
		</>
	)
}