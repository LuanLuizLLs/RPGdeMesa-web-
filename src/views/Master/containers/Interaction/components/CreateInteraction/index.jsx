import React from 'react'
import API from '../../../../../../services/api'
import useMessage from '../../../../../../hooks/useMessage'
import useLoading from '../../../../../../hooks/useLoading'
import { Box, Button, Grid, Input, TextArea, Title } from '../../../../../../components'

export function CreateInteraction({ campaign, stateValues, onReset, onRefresh }) {
	const [values, setValues] = stateValues

	const { openMessage } = useMessage()
	const { startLoading } = useLoading()

	function handleCreateInteraction() {
		startLoading('bar')

		API('interactions', {
			...values,
			id_campaign: campaign.id,
		})
			.create(({ data }) => {
				onRefresh(data)
				openMessage(data.status, data.message)
			})
			.catch(({ response }) => {
				openMessage(response.data.status, response.data.message)
			})
			.finally(onReset)
	}

	return (
		<>
			<Title type="h6">
        Adicionar interação:
			</Title>
			<Input
				name="name"
				placeholder="Nome"
				stateValue={[values, setValues]}
			/>
			<TextArea
				name="description"
				placeholder="Descrição"
				stateValue={[values, setValues]}
			/>
			<Grid type="container">
				<Grid type="row" padding={[5, 0]}>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="❤️"
							name="life"
							label="Vida"
							type="number"
							stateValue={[values, setValues]}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="🩸"
							type="number"
							label="Dano"
							name="damage"
							stateValue={[values, setValues]}
						/>
					</Grid>
				</Grid>
				<Grid type="row" padding={[5, 0]}>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="💪"
							type="number"
							name="strength"
							stateValue={[values, setValues]}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="👋"
							type="number"
							name="dexterity"
							stateValue={[values, setValues]}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="✊"
							type="number"
							name="constitution"
							stateValue={[values, setValues]}
						/>
					</Grid>
				</Grid>
				<Grid type="row">
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="📙"
							type="number"
							name="intelligence"
							stateValue={[values, setValues]}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="🙌"
							type="number"
							name="wisdom"
							stateValue={[values, setValues]}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="🤝"
							type="number"
							name="charisma"
							stateValue={[values, setValues]}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Box display="flex" justifyContent="flex-end" marginTop={10}>
				<Button type="filled" color="secondary" padding={10} onClick={onReset}>
          Cancelar
				</Button>
				<Button type="filled" padding={10} onClick={handleCreateInteraction}>
          Criar
				</Button>
			</Box>
		</>
	)
}