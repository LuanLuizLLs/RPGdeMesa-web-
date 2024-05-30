import React from 'react'
import { ATTRIBUTE } from 'configs'
import { pointAttribute } from '../../utils'
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
					<Text>
						{ATTRIBUTE.ICONS.VID} {modal.data.life} &nbsp;
						{ATTRIBUTE.ICONS.DAN} {modal.data.damage}
					</Text>
				</Paper>
				<Paper backgroundColor="secondary" margin="10px 0">
					<Tab tabs={[ATTRIBUTE.ICONS.FOR, ATTRIBUTE.ICONS.DES, ATTRIBUTE.ICONS.CON, ATTRIBUTE.ICONS.INT, ATTRIBUTE.ICONS.SAB, ATTRIBUTE.ICONS.CAR]} stateTab={stateTab}>
						{[
							<Text key="strength" color="gray" fontWeight="bold">
								{pointAttribute(modal.data.strength, modal.data.damage)}
							</Text>,
							<Text key="dexterity" color="gray" fontWeight="bold">
								{pointAttribute(modal.data.dexterity, modal.data.damage)}
							</Text>,
							<Text key="constitution" color="gray" fontWeight="bold">
								{pointAttribute(modal.data.constitution, modal.data.damage)}
							</Text>,
							<Text key="intelligence" color="gray" fontWeight="bold">
								{pointAttribute(modal.data.intelligence, modal.data.damage)}
							</Text>,
							<Text key="wisdom" color="gray" fontWeight="bold">
								{pointAttribute(modal.data.wisdom, modal.data.damage)}
							</Text>,
							<Text key="charisma" color="gray" fontWeight="bold">
								{pointAttribute(modal.data.charisma, modal.data.damage)}
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