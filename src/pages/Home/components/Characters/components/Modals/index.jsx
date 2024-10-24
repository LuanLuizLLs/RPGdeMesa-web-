import { Box, Button, Input, Paper, Select, Text, TextArea, Title } from 'components'
import { OPTIONS } from 'utils/constants'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		character_start: (
			<>
				<Title type="h6">
          Detalhes do personagem:
				</Title>
				<Paper backgroundColor="secondary">
					<Text color="primary" fontWeight="bold">
						{modal.data.name}
					</Text>
					<Text>
						{modal.data.description}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" color="primary" padding={10} onClick={handle.resetCharacter}>
            Voltar
					</Button>
					<Button type="filled" padding={10} onClick={handle.startCharacter}>
            Jogar
					</Button>
				</Box>
			</>
		),
		character_create: (
			<>
				<Title type="h6">
          Criar personagem:
				</Title>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<Select
					name="race"
					placeholder="Raça"
					options={OPTIONS.CHARACTERS.RACE}
					stateValue={stateValues}
				/>
				<Select
					name="caste"
					placeholder="Classe"
					options={OPTIONS.CHARACTERS.CASTE}
					stateValue={stateValues}
				/>
				<Select
					name="tendency"
					placeholder="Tendência"
					options={OPTIONS.CHARACTERS.TENDENCY}
					stateValue={stateValues}
				/>
				<TextArea
					rows={3}
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Box display="flex" justifyContent="flex-end">
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetCharacter}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.createCharacter}>
            Criar
					</Button>
				</Box>
			</>
		),
		character_update: (
			<>
				<Title type="h6">
          Editar personagem:
				</Title>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					rows={3}
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Box display="flex" justifyContent="flex-end">
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetCharacter}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.updateCharacter}>
            Salvar
					</Button>
				</Box>
			</>
		),
		character_delete: (
			<>
				<Title type="h6">
          Deletar personagem:
				</Title>
				<Text>
          Tem certeza que deseja excluir o personagem <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetCharacter}>
            Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteCharacter}>
            Excluir
					</Button>
				</Box>
			</>
		)
	}
}