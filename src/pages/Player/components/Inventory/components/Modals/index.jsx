import { useSelector } from 'react-redux'
import { optionsUsable } from '../../utils/functions'
import { ATTRIBUTE, INVENTORY } from 'utils/constants'
import { modifierPoints, scrollingPoints } from 'pages/Player/utils/functions'
import { Box, Button, Grid, Input, Paper, Radio, Select, Text, TextArea, Title } from 'components'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values] = stateValues

	const { CHARACTER } = useSelector(({ reducer }) => reducer)

	return {
		add_item: (
			<>
				<Title type="h6" color="primary">
          Adicionar item:
				</Title>
				<Radio
					name="usable"
					label="Usável"
					options={INVENTORY.USABLE}
					stateValue={stateValues}
				/>
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
				<Grid type="row">
					<Grid type="column" padding={[0, 5]}>
						<Select
							name="attribute"
							label="Atributo"
							options={optionsUsable(values.usable)}
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" padding={[0, 5]}>
						<Input
							min={1}
							max={6}
							type="number"
							name="level"
							label="Nível"
							end={ATTRIBUTE.ICONS[values.attribute]}
							stateValue={stateValues}
						/>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetInventory}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.createInventory}>
            Criar
					</Button>
				</Box>
			</>
		),
		detail_item: modal.data.usable ? (
			<>
				<Title type="h6">
          Detalhes do item:
				</Title>
				<Paper backgroundColor="secondary">
					<Text color="primary" fontWeight="bold">
						{modal.data.name} (Lv {modal.data.level})
					</Text>
					<Text color="gray" fontWeight="bold">
						{modal.data.description}
					</Text>
				</Paper>
				<Paper backgroundColor="secondary" margin="10px 0">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Text fontWeight="bold" color="gray">
							{ATTRIBUTE.ICONS[modal.data.attribute]} 1d6+{modal.data.level}
						</Text>
						<Button type="filled" color="success" fontSize="medium" onClick={handle.deleteInventory}>
              Usar
						</Button>
					</Box>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" padding={10} onClick={handle.resetInventory}>
            Fechar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteInventory}>
            Remover
					</Button>
				</Box>
			</>
		) : (
			<>
				<Title type="h6">
          Detalhes do item:
				</Title>
				<Paper backgroundColor="secondary">
					<Text color="primary" fontWeight="bold">
						{modal.data.name} (Lv {modal.data.level})
					</Text>
					<Text color="gray" fontWeight="bold">
						{modal.data.description}
					</Text>
					<Text>
						{modifierPoints(CHARACTER, modal.data)}
					</Text>
				</Paper>
				<Paper backgroundColor="secondary" margin="10px 0">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Text color="gray" fontWeight="bold">
							{scrollingPoints(CHARACTER[ATTRIBUTE.PRIMARY[modal.data.attribute]], modal.data.level)}
						</Text>
						<Button type="filled" color="success" fontSize="medium" onClick={handle.updateInventory}>
              Aprimorar
						</Button>
					</Box>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" padding={10} onClick={handle.resetInventory}>
            Fechar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteInventory}>
            Remover
					</Button>
				</Box>
			</>
		)
	}
}