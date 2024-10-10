import { BOARD } from 'configs'
import { Box, Button, Grid, Input, Select, Text, Title } from 'components'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values] = stateValues

	return {
		exploration_board: (
			<>
				<Title type="h6">
          Tabuleiro ({modal.data.horizontal} x {modal.data.vertical}):
				</Title>
				<Select
					name="type"
					label="Tipo"
					options={Object.keys(BOARD.PIECES)}
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
					<Button type="filled" color="error" padding={10} onClick={handle.removeExploration}>
            Remover
					</Button>
					<Button type="filled" color="primary" padding={10} onClick={handle.updateExploration}>
            Salvar
					</Button>
				</Box>
			</>
		)
	}
}