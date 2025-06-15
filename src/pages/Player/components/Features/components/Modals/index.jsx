import { Box, Button, Grid, Input, Paper, Text, TextArea, Title } from 'components'
import { featureAttributes } from 'pages/Player/utils/functions'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		create_feature: (
			<>
				<Title type="h6" color="primary">
          Criar característica:
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
		read_feature: (
			<>
				<Title type="h6" color="primary">
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
					<Text fontWeight="bold">
						{featureAttributes(modal.data)}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end">
					<Button type="bottomless" padding={10} onClick={handle.resetFeature}>
            Cancelar
					</Button>
					<Button type="filled" color="primary" padding={10} onClick={handle.resetFeature}>
            Fechar
					</Button>
				</Box>
			</>
		),
		update_feature: (
			<>
				<Title type="h6" color="primary">
          Editar característica:
				</Title>
				<Input
					name="name"
					label="Nome"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					label="Descrição"
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
					<Button type="filled" padding={10} onClick={handle.updateFeature}>
            Editar
					</Button>
				</Box>
			</>
		),
		delete_feature: (
			<>
				<Title type="h6" color="primary">
          Deletar característica:
				</Title>
				<Text>
          Tem certeza que deseja excluir a característica <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetFeature}>
            Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteFeature}>
            Deletar
					</Button>
				</Box>
			</>
		),
	}
}