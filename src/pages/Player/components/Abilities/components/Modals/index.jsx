import { ATTRIBUTE, ABILITY } from 'utils/constants'
import { characterStore } from 'pages/Player/utils/store'
import { Box, Button, Grid, Input, Paper, Radio, Select, Text, TextArea, Title } from 'components'
import { modifierPoints } from 'pages/Player/utils/functions'
import { optionsActive } from '../../utils/functions'
import { useEffect } from 'react'
import useStore from 'hooks/useStore'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values, setValues] = stateValues

	const CHARACTER = useStore(characterStore)

	useEffect(() => {
		if (modal.content === 'create_ability') {
			const [attribute] = optionsActive(values.active)
			setValues((state) => ({
				...state,
				attribute,
			}))
		}
	}, [values.active])

	return {
		create_ability: (
			<>
				<Title type="h6" color="primary">
					Criar habilidade:
				</Title>
				<Radio
					name="active"
					label="Tipo"
					options={ABILITY.ACTIVE}
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
							options={optionsActive(values.active)}
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
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetAbility}>
						Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.createAbility}>
						Criar
					</Button>
				</Box>
			</>
		),
		read_ability: (
			<>
				<Title type="h6">
					Detalhes da habilidade:
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
						{modal.data.active ? modifierPoints(CHARACTER.modified, modal.data) : modifierPoints(CHARACTER, modal.data, 'SECONDARY')}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetAbility}>
						Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.resetAbility}>
						Fechar
					</Button>
				</Box>
			</>
		),
		update_ability: (
			<>
				<Title type="h6" color="primary">
					Editar habilidade:
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
							options={optionsActive(values.active)}
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
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetAbility}>
						Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.updateAbility}>
						Editar
					</Button>
				</Box>
			</>
		),
		delete_ability: (
			<>
				<Title type="h6" color="primary">
					Deletar habilidade:
				</Title>
				<Text>
					Tem certeza que deseja excluir a habilidade <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetAbility}>
						Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteAbility}>
						Deletar
					</Button>
				</Box>
			</>
		),
	}
}