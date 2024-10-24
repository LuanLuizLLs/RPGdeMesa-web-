import { Box, Button, Grid, Input, Paper, Text, TextArea, Title } from 'components'
import { BOARD } from 'utils/configs'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		create_exploration: (
			<>
				<Title type="h6">
          Adicionar exploração:
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
								min={1}
								type="number"
								name="horizontal"
								label="Horizontal"
								start={BOARD.ICONS.HOR}
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" margin={[0, 5]} minWidth={180}>
							<Input
								min={1}
								type="number"
								name="vertical"
								label="Vertical"
								start={BOARD.ICONS.VER}
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetExploration}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.createExploration}>
            Criar
					</Button>
				</Box>
			</>
		),
		read_exploration: (
			<>
				<Title type="h6">
          Detalhes da exploração:
				</Title>
				<Paper backgroundColor="secondary">
					<Text fontWeight="bold" color="primary">
						{modal.data.name}
					</Text>
					<Text fontWeight="bold" color="gray">
						{modal.data.description}
					</Text>
					<Text fontWeight="bold" color="primary">
						{BOARD.ICONS.HOR} {modal.data.horizontal} &nbsp;
						{BOARD.ICONS.VER} {modal.data.vertical}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end">
					<Button type="bottomless" padding={10} onClick={handle.resetExploration}>
            Fechar
					</Button>
					<Button type="filled" padding={10} onClick={handle.startExploration}>
            Explorar
					</Button>
				</Box>
			</>
		),
		update_exploration: (
			<>
				<Title type="h6">
          Editar exploração:
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
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetExploration}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.updateExploration}>
            Salvar
					</Button>
				</Box>
			</>
		),
		delete_exploration: (
			<>
				<Title type="h6">
          Deletar exploração:
				</Title>
				<Text>
          Tem certeza que deseja excluir a exploração <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetExploration}>
            Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteExploration}>
            Excluir
					</Button>
				</Box>
			</>
		)
	}

}