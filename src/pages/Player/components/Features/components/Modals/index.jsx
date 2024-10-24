import { Box, Button, Grid, Input, Paper, Text, TextArea, Title } from 'components'
import { ATTRIBUTE } from 'utils/constants'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		add_feature: (
			<>
				<Title type="h6" color="primary">
          Adicionar característica:
				</Title>
				<Input
					name="name"
					placeholder="Nome (adjetivo)"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Grid type="row" padding={[5, 0]}>
					<Grid type="column" margin={[0, 5]}>
						<Input
							max={1}
							min={-1}
							start="💪"
							label="FOR"
							type="number"
							name="strength"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							max={1}
							min={-1}
							start="👋"
							label="DES"
							type="number"
							name="dexterity"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							max={1}
							min={-1}
							start="✊"
							label="CON"
							type="number"
							name="constitution"
							stateValue={stateValues}
						/>
					</Grid>
				</Grid>
				<Grid type="row">
					<Grid type="column" margin={[0, 5]}>
						<Input
							max={1}
							min={-1}
							start="📙"
							label="INT"
							type="number"
							name="intelligence"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							max={1}
							min={-1}
							start="🙌"
							label="SAB"
							type="number"
							name="wisdom"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							max={1}
							min={-1}
							start="🤝"
							label="CAR"
							type="number"
							name="charisma"
							stateValue={stateValues}
						/>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetFeature}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.createFeature}>
            Criar
					</Button>
				</Box>
			</>
		),
		detail_feature: (
			<>
				<Title type="h6">
          Detalhes da característica:
				</Title>
				<Paper backgroundColor="secondary">
					<Text fontWeight="bold" color="primary">
						{modal.data.name}
					</Text>
					<Text fontWeight="bold" color="gray">
						{modal.data.description}
					</Text>
				</Paper>
				<Paper backgroundColor="secondary" margin="10px 0" overflow="auto">
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
					<Button type="filled" padding={10} onClick={handle.resetFeature}>
            Fechar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteFeature}>
            Remover
					</Button>
				</Box>
			</>
		),
	}
}