import { Box, Button, Text, Title } from 'components'

export function Modals({ handle, stateModal }) {
	const [modal] = stateModal

	return {
		invite_campaign: (
			<>
				<Title type="h6">
					Convite de campanha:
				</Title>
				<Text>
					Deseja entrar na campanha <b>{modal.data.name_campaign}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="error" padding={10} onClick={handle.declineNotification}>
						Recusar
					</Button>
					<Button type="filled" color="success" padding={10} onClick={handle.acceptNotification}>
						Aceitar
					</Button>
				</Box>
			</>
		),
	}
}