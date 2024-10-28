import { BOARD, OPTIONS } from 'utils/constants'
import { Box, Button, Grid, Input, Paper, Select, Text, Title } from 'components'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values] = stateValues

	return {
		read_board: (
			<>
				<Title type="h6">
          Tabuleiro ({modal.data.horizontal} x {modal.data.vertical}):
				</Title>
				<Paper backgroundColor="#FFF">
					<Text fontWeight="bold" color="primary">
						{modal.data.name}
					</Text>
					<Text textAlign="center" fontSize="50px" color={modal.data.color}>
						{modal.data.symbol}
					</Text>
				</Paper>
				<Box display="grid" gap={10} gridTemplateColumns="1fr 1fr" padding={10} >
					<Button type="filled" color="secondary" onClick={handle.moveExploration}>
            Mover
					</Button>
					<Button type="filled" color="secondary" onClick={handle.duplicateExploration}>
            Duplicar
					</Button>
					<Button type="filled" color="error" onClick={handle.removeExploration}>
            Remover
					</Button>
					<Button type="filled" color="primary" onClick={() => handle.openExploration('update_board')}>
            Editar
					</Button>
				</Box>
			</>
		),
		update_board: (
			<>
				<Title type="h6">
          Tabuleiro ({modal.data.horizontal} x {modal.data.vertical}):
				</Title>
				<Select
					name="type"
					label="Tipo"
					options={OPTIONS.BOARD.PIECES}
					stateValue={stateValues}
				/>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<Grid type="row">
					<Grid type="column" padding={[0, 5]}>
						<Select
							name="symbol"
							label="Símbolo"
							placeholder="Nenhum"
							options={BOARD.PIECES[values.type]}
							stateValue={stateValues}
						/>
						<Input
							type="color"
							name="color"
							label="Cor"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" padding={[0, 5]}>
						<Box height="100%" display="grid" placeContent="center">
							<Text fontSize="80px" color={values.color}>
								{values.symbol}
							</Text>
						</Box>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="flex-end">
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetExploration}>
            Cancelar
					</Button>
					<Button type="filled" color="primary" padding={10} onClick={handle.updateExploration}>
            Salvar
					</Button>
				</Box>
			</>
		),
		delete_board: (
			<>
				<Title type="h6">
          Deletar exploração:
				</Title>
				<Text>
          Tem certeza que deseja excluir essa exploração <b>{modal.data.name}</b>?
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