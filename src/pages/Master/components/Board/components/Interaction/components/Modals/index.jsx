import { ATTRIBUTE, OPTIONS } from 'utils/constants'
import { pointAttribute } from '../../utils/functions'
import { Box, Button, Paper, Tab, Text, Title } from 'components'

export function Modals({ handle, stateTab, stateModal }) {
	const [modal] = stateModal

	return {
		interaction_details: (
			<>
				<Title type="h6">
          Detalhes da interação:
				</Title>
				<Paper backgroundColor="secondary">
					<Text fontWeight="bold" color="primary">
						{modal.data.shape.name} (Lv {modal.data.shape.level})
					</Text>
					<Text fontWeight="bold" color="gray">
						{modal.data.shape.description}
					</Text>
					<Text fontWeight="bold">
						{ATTRIBUTE.ICONS.VID} {modal.data.life} &nbsp;
						{ATTRIBUTE.ICONS.DAD} {modal.data.modifier}
					</Text>
				</Paper>
				<Paper backgroundColor="secondary" margin="10px 0">
					<Tab tabs={OPTIONS.ATTRIBUTE.PRIMARY} stateTab={stateTab}>
						{[
							<Text key="strength" color="gray" fontWeight="bold">
								{pointAttribute(ATTRIBUTE.ICONS.FOR, modal.data.strength, modal.data.modifier)}
							</Text>,
							<Text key="dexterity" color="gray" fontWeight="bold">
								{pointAttribute(ATTRIBUTE.ICONS.DES, modal.data.dexterity, modal.data.modifier)}
							</Text>,
							<Text key="constitution" color="gray" fontWeight="bold">
								{pointAttribute(ATTRIBUTE.ICONS.CON, modal.data.constitution, modal.data.modifier)}
							</Text>,
							<Text key="intelligence" color="gray" fontWeight="bold">
								{pointAttribute(ATTRIBUTE.ICONS.INT, modal.data.intelligence, modal.data.modifier)}
							</Text>,
							<Text key="wisdom" color="gray" fontWeight="bold">
								{pointAttribute(ATTRIBUTE.ICONS.SAB, modal.data.wisdom, modal.data.modifier)}
							</Text>,
							<Text key="charisma" color="gray" fontWeight="bold">
								{pointAttribute(ATTRIBUTE.ICONS.CAR, modal.data.charisma, modal.data.modifier)}
							</Text>,
						]}
					</Tab>
				</Paper>
				<Box display="flex" justifyContent="flex-end">
					<Button type="bottomless" padding={10} onClick={handle.resetInteraction}>
            Fechar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.removeInteraction}>
            Remover
					</Button>
				</Box>
			</>
		)
	}
}