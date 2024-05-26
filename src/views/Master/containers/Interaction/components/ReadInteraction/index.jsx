import React from 'react'
import { Box, Button, Paper, Text, Title } from '../../../../../../components'
import { ATTRIBUTE } from '../../../../../../configs'

export function ReadInteraction({ stateModal, onReset, onStart }) {
	const [modal] = stateModal

	return (
		<>
			<Title type="h6">
        Detalhes da interação:
			</Title>
			<Paper backgroundColor="secondary">
				<Text fontWeight="bold" color="primary">
					{modal.data.name} (Lv {modal.data.level})
				</Text>
				<Text fontWeight="bold" color="gray">
					{modal.data.description}
				</Text>
				<Text>
					{ATTRIBUTE.ICONS.VID} {modal.data.life} &nbsp;
					{ATTRIBUTE.ICONS.DAN} {modal.data.damage}
				</Text>
			</Paper>
			<Paper backgroundColor="secondary" margin="10px 0">
				<Text inline display="inline">
					{ATTRIBUTE.ICONS.FOR} {modal.data.strength} &nbsp;
				</Text>
				<Text inline display="inline">
					{ATTRIBUTE.ICONS.DES} {modal.data.dexterity} &nbsp;
				</Text>
				<Text inline display="inline">
					{ATTRIBUTE.ICONS.CON} {modal.data.constitution} &nbsp;
				</Text>
				<Text inline display="inline">
					{ATTRIBUTE.ICONS.INT} {modal.data.intelligence} &nbsp;
				</Text>
				<Text inline display="inline">
					{ATTRIBUTE.ICONS.SAB} {modal.data.wisdom} &nbsp;
				</Text>
				<Text inline display="inline">
					{ATTRIBUTE.ICONS.CAR} {modal.data.charisma}
				</Text>
			</Paper>
			<Box display="flex" justifyContent="flex-end">
				<Button type="bottomless" padding={10} onClick={onReset}>
          Fechar
				</Button>
				<Button type="filled" padding={10} onClick={onStart}>
          Interagir
				</Button>
			</Box>
		</>
	)
}