import React, { useEffect, useState } from 'react'
import useAPI from '../../../../hooks/useAPI'
import useRedux from '../../../../hooks/useRedux'
import imagePlayer from '../../../../assets/img/player.png'
import { INITIAL } from './initial'
import { useNavigate } from 'react-router-dom'
import { characterAttributes } from '../../../../utils'
import { CHARACTERS } from '../../../../constants'
import {
	Box,
	Button,
	Card,
	Image,
	Input,
	List,
	TextArea,
	Title,
	Modal,
	Text,
	Select,
	Paper,
} from '../../../../components'

function Characters() {
	const navigate = useNavigate()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { setRedux, getRedux } = useRedux()
	const { USER } = getRedux()

	const {
		list: characterList,
		fetch: fetchCharacter,
		create: createCharacter,
		update: updateCharacter,
		delete: deleteCharacter,
	} = useAPI('characters', {
		id_user: USER.id
	})

	useEffect(() => {
		setList((state) => ({
			...state, rows: characterList,
		}))
	}, [characterList])

	const handleOpenModal = (content, data = {}) => {
		setModal({ content, data })
		setValues({ ...values, ...data })
	}

	const handleResetValues = () => {
		setModal(INITIAL.MODAL)
		setValues(INITIAL.VALUES)
	}

	const handleCreateCharacter = () => {
		createCharacter({
			...values,
			...characterAttributes(values.race, values.caste),
			id_user: USER.id,
		})
			.then(fetchCharacter)
			.finally(handleResetValues)
	}

	const handleUpdateCharacter = () => {
		updateCharacter(values)
			.then(fetchCharacter)
			.finally(handleResetValues)
	}

	const handleDeleteCharacter = () => {
		deleteCharacter(values)
			.then(fetchCharacter)
			.finally(handleResetValues)
	}

	const handleStartCharacter = () => {
		setRedux('CHARACTER', values)
		navigate('/player')
	}

	return (
		<>
			<Modal
				maxWidth={450}
				stateModal={[modal, setModal]}
				onClose={handleResetValues}
			>
				{{
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
								<Button type="bottomless" color="primary" padding={10} onClick={handleResetValues}>
                  Voltar
								</Button>
								<Button type="filled" padding={10} onClick={handleStartCharacter}>
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
								stateValue={[values, setValues]}
							/>
							<Select
								name="race"
								placeholder="Raça"
								options={CHARACTERS.RACE}
								stateValue={[values, setValues]}
							/>
							<Select
								name="caste"
								placeholder="Classe"
								options={CHARACTERS.CASTE}
								stateValue={[values, setValues]}
							/>
							<Select
								name="tendency"
								placeholder="Tendência"
								options={CHARACTERS.TENDENCY}
								stateValue={[values, setValues]}
							/>
							<TextArea
								rows={3}
								name="description"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Box display="flex" justifyContent="flex-end">
								<Button type="filled" color="secondary" padding={10} onClick={handleResetValues}>
                  Cancelar
								</Button>
								<Button type="filled" padding={10} onClick={handleCreateCharacter}>
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
								stateValue={[values, setValues]}
							/>
							<TextArea
								rows={3}
								name="description"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Box display="flex" justifyContent="flex-end">
								<Button type="filled" color="secondary" padding={10} onClick={handleResetValues}>
                  Cancelar
								</Button>
								<Button type="filled" padding={10} onClick={handleUpdateCharacter}>
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
								<Button type="bottomless" padding={10} onClick={handleResetValues}>
                  Cancelar
								</Button>
								<Button type="filled" color="error" padding={10} onClick={handleDeleteCharacter}>
                  Excluir
								</Button>
							</Box>
						</>
					)
				}}
			</Modal>
			<Card>
				<Image
					maxHeight={100}
					maxWidth={100}
					margin="0 auto"
					alt="armadura de cavaleiro"
					src={imagePlayer}
				/>
				<Title type="h4" textAlign="center">
          Lista de Personagens:
				</Title>
				<List
					height={300}
					{...list}
					onClick={(row) => handleOpenModal('character_start', row)}
					actions={{
						update: (row) => handleOpenModal('character_update', row),
						delete: (row) => handleOpenModal('character_delete', row),
					}}
				/>
				<Button type="filled" padding={10} onClick={() => handleOpenModal('character_create')}>
          Criar personagem
				</Button>
			</Card>
		</>
	)
}

export default Characters