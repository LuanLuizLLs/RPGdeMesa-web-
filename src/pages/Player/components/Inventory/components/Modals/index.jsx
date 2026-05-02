import { characterStore } from 'pages/Player/utils/store'
import { optionsUsable } from '../../utils/functions'
import { ATTRIBUTE, INVENTORY } from 'utils/constants'
import { modifierPoints } from 'pages/Player/utils/functions'
import { Box, Button, Grid, Input, Paper, Radio, Select, Text, TextArea, Title } from 'components'
import { useLayoutEffect } from 'react'
import useStore from 'hooks/useStore'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values, setValues] = stateValues

	const CHARACTER = useStore(characterStore)

	useLayoutEffect(() => {
		if (modal.content === 'create_item') {
			const [attribute] = optionsUsable(values.usable)
			setValues((state) => ({
				...state,
				attribute,
			}))
		}
	}, [values.usable])

	return {
		create_item: (
			<>
				<Title type="h6" color="primary">
					Criar item:
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
		read_item: (
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
					<Text fontWeight="bold">
						{modal.data.usable ? modifierPoints(CHARACTER, modal.data, 'SECONDARY') : modifierPoints(CHARACTER.modified, modal.data)}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetInventory}>
						Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.resetInventory}>
						Fechar
					</Button>
				</Box>
			</>
		),
		update_item: (
			<>
				<Title type="h6" color="primary">
					Editar item:
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
					<Button type="filled" padding={10} onClick={handle.updateInventory}>
						Editar
					</Button>
				</Box>
			</>
		),
		delete_item: (
			<>
				<Title type="h6" color="primary">
					Deletar item:
				</Title>
				<Text>
					Tem certeza que deseja excluir o item <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetInventory}>
						Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteInventory}>
						Deletar
					</Button>
				</Box>
			</>
		)
	}
}