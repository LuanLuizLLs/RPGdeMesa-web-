import { ATTRIBUTE, OPTIONS } from 'utils/configs'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Input, Paper, Select, Text, TextArea, Title } from 'components'
import { modifierPoints, scrollingPoints } from 'pages/Player/utils/functions'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal
	const [values] = stateValues

	const { CHARACTER } = useSelector(({ reducer }) => reducer)

	return {
		add_ability: (
			<>
				<Title type="h6" color="primary">
          Adicionar habilidade:
				</Title>
				<Input
					name="name"
					placeholder="Nome (verbo)"
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
							options={OPTIONS.ATTRIBUTE.PRIMARY}
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
		detail_ability: (
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
					<Text>
						{modifierPoints(CHARACTER, modal.data)}
					</Text>
				</Paper>
				<Paper backgroundColor="secondary" margin="10px 0">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Text color="gray" fontWeight="bold">
							{scrollingPoints(CHARACTER[ATTRIBUTE.PRIMARY[modal.data.attribute]], modal.data.level)}
						</Text>
						<Button type="filled" color="success" fontSize="medium" onClick={handle.updateAbility}>
              Aprimorar
						</Button>
					</Box>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" padding={10} onClick={handle.resetAbility}>
            Fechar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteAbility}>
            Remover
					</Button>
				</Box>
			</>
		),
	}
}