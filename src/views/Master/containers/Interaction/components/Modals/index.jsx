import { Box, Button, Grid, Input, Paper, Text, TextArea, Title } from 'components'
import { ATTRIBUTE } from 'utils/configs'
import React from 'react'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		create_interaction: (
			<>
				<Title type="h6">
          Adicionar interação:
				</Title>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Grid type="container">
					<Grid type="row" padding={[5, 0]}>
						<Grid type="column" margin={[0, 5]} minWidth={180}>
							<Input
								name="life"
								label="Vida"
								type="number"
								start={ATTRIBUTE.ICONS.VID}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={180}>
							<Input
								type="number"
								label="Dano"
								name="damage"
								start={ATTRIBUTE.ICONS.DAN}
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
					<Grid type="row" padding={[5, 0]}>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="strength"
								end="FOR"
								start={ATTRIBUTE.ICONS.FOR}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="dexterity"
								end="DES"
								start={ATTRIBUTE.ICONS.DES}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="constitution"
								end="CON"
								start={ATTRIBUTE.ICONS.CON}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="intelligence"
								end="INT"
								start={ATTRIBUTE.ICONS.INT}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="wisdom"
								end="SAB"
								start={ATTRIBUTE.ICONS.SAB}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="charisma"
								end="CAR"
								start={ATTRIBUTE.ICONS.CAR}
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetInteraction}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.createInteraction}>
            Criar
					</Button>
				</Box>
			</>
		),
		read_interaction: (
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
					<Button type="bottomless" padding={10} onClick={handle.resetInteraction}>
            Fechar
					</Button>
					<Button type="filled" padding={10} onClick={handle.startInteraction}>
            Interagir
					</Button>
				</Box>
			</>
		),
		update_interaction: (
			<>
				<Title type="h6">
          Editar interação:
				</Title>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Grid type="container">
					<Grid type="row" padding={[5, 0]}>
						<Grid type="column" margin={[0, 5]} minWidth={180}>
							<Input
								name="life"
								label="Vida"
								type="number"
								start={ATTRIBUTE.ICONS.VID}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={180}>
							<Input
								type="number"
								label="Dano"
								name="damage"
								start={ATTRIBUTE.ICONS.DAN}
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
					<Grid type="row" padding={[5, 0]}>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="strength"
								end="FOR"
								start={ATTRIBUTE.ICONS.FOR}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="dexterity"
								end="DES"
								start={ATTRIBUTE.ICONS.DES}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="constitution"
								end="CON"
								start={ATTRIBUTE.ICONS.CON}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="intelligence"
								end="INT"
								start={ATTRIBUTE.ICONS.INT}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="wisdom"
								end="SAB"
								start={ATTRIBUTE.ICONS.SAB}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={140}>
							<Input
								type="number"
								name="charisma"
								end="CAR"
								start={ATTRIBUTE.ICONS.CAR}
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetInteraction}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.updateInteraction}>
            Salvar
					</Button>
				</Box>
			</>
		),
		delete_interaction: (
			<>
				<Title type="h6">
          Deletar interação:
				</Title>
				<Text>
          Tem certeza que deseja excluir a interação <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetInteraction}>
            Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteInteraction}>
            Excluir
					</Button>
				</Box>
			</>
		)
	}

}