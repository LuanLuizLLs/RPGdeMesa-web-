import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import useLoading from '../../../../hooks/useLoading'
import useMessage from '../../../../hooks/useMessage'
import { INITIAL } from './initial'
import {
	Box,
	Button,
	Grid,
	Input,
	List,
	Modal,
	Paper,
	Text,
	TextArea,
	Title,
} from '../../../../components'
import { ATTRIBUTE } from '../../../../configs'

function Interaction({ campaign }) {

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [refresh, setRefresh] = useState(null)

	useEffect(() => {
		API('interactions', {
			id_campaign: campaign.id,
		})
			.read(({ data }) => {
				setList((state) => ({
					...state,
					rows: data.response,
				}))
			})
	}, [refresh, campaign.id])

	const handle = {
		openModal: (content, data = modal.data) => {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetInteraction: () => {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		createInteraction: () => {
			startLoading('bar')

			API('interactions', {
				...values,
				id_campaign: campaign.id,
			})
				.create(({ data }) => {
					setRefresh(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		updateInteraction: () => {
			startLoading('bar')

			API('interactions', values)
				.update(({ data }) => {
					setRefresh(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		deleteInteraction: () => {
			startLoading('bar')

			API('interactions', values)
				.delete(({ data }) => {
					setRefresh(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		},
	}

	return (
		<>
			<Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetInteraction}>
				{{
					create_interaction: (
						<>
							<Title type="h6">
                Adicionar interação:
							</Title>
							<Input
								name="name"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Grid type="container">
								<Grid type="row" padding={[5, 0]}>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="❤️"
											name="life"
											label="Vida"
											type="number"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="🩸"
											type="number"
											label="Dano"
											name="damage"
											stateValue={[values, setValues]}
										/>
									</Grid>
								</Grid>
								<Grid type="row" padding={[5, 0]}>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="💪"
											type="number"
											name="strength"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="👋"
											type="number"
											name="dexterity"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="✊"
											type="number"
											name="constitution"
											stateValue={[values, setValues]}
										/>
									</Grid>
								</Grid>
								<Grid type="row">
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="📙"
											type="number"
											name="intelligence"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="🙌"
											type="number"
											name="wisdom"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="🤝"
											type="number"
											name="charisma"
											stateValue={[values, setValues]}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={10} onClick={handle.resetInteraction}>
                  Cancelar
								</Button>
								<Button type="filled" padding={10} onClick={handle.createInteraction}>
                  Criar
								</Button>
							</Box>
						</>
					),
					read_interaction: (
						<>
							<Title type="h6">
                Detalhes da interação:
							</Title>
							<Paper backgroundColor="secondary">
								<Text fontWeight="bold" color="primary">
									{modal.data.name} (Lv {modal.data.level})
								</Text>
								<Text fontWeight="bold" color="gray">
									{modal.data.description}
								</Text>
								<Text>
									{ATTRIBUTE.ICONS.VID} {modal.data.life} &nbsp;
									{ATTRIBUTE.ICONS.DAN} {modal.data.damage}
								</Text>
							</Paper>
							<Paper backgroundColor="secondary" margin="10px 0">
								<Text inline display="inline">
									{ATTRIBUTE.ICONS.FOR} {modal.data.strength} &nbsp;
								</Text>
								<Text inline display="inline">
									{ATTRIBUTE.ICONS.DES} {modal.data.dexterity} &nbsp;
								</Text>
								<Text inline display="inline">
									{ATTRIBUTE.ICONS.CON} {modal.data.constitution} &nbsp;
								</Text>
								<Text inline display="inline">
									{ATTRIBUTE.ICONS.INT} {modal.data.intelligence} &nbsp;
								</Text>
								<Text inline display="inline">
									{ATTRIBUTE.ICONS.SAB} {modal.data.wisdom} &nbsp;
								</Text>
								<Text inline display="inline">
									{ATTRIBUTE.ICONS.CAR} {modal.data.charisma}
								</Text>
							</Paper>
							<Box display="flex" justifyContent="flex-end">
								<Button type="bottomless" padding={10} onClick={handle.resetInteraction}>
                  Fechar
								</Button>
								<Button type="filled" padding={10} onClick={handle.resetInteraction}>
                  Interagir
								</Button>
							</Box>
						</>
					),
					update_interaction: (
						<>
							<Title type="h6">
                Editar interação:
							</Title>
							<Input
								name="name"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Grid type="container">
								<Grid type="row" padding={[5, 0]}>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="❤️"
											name="life"
											label="Vida"
											type="number"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="🩸"
											type="number"
											label="Dano"
											name="damage"
											stateValue={[values, setValues]}
										/>
									</Grid>
								</Grid>
								<Grid type="row" padding={[5, 0]}>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="💪"
											type="number"
											name="strength"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="👋"
											type="number"
											name="dexterity"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="✊"
											type="number"
											name="constitution"
											stateValue={[values, setValues]}
										/>
									</Grid>
								</Grid>
								<Grid type="row">
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="📙"
											type="number"
											name="intelligence"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="🙌"
											type="number"
											name="wisdom"
											stateValue={[values, setValues]}
										/>
									</Grid>
									<Grid type="column" margin={[0, 5]}>
										<Input
											start="🤝"
											type="number"
											name="charisma"
											stateValue={[values, setValues]}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={10} onClick={handle.resetInteraction}>
                  Cancelar
								</Button>
								<Button type="filled" padding={10} onClick={handle.updateInteraction}>
                  Salvar
								</Button>
							</Box>
						</>
					),
					delete_interaction: (
						<>
							<Title type="h6">
                Deletar interação:
							</Title>
							<Text>
                Tem certeza que deseja excluir a interação <b>{modal.data.name}</b>?
							</Text>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="bottomless" padding={10} onClick={handle.resetInteraction}>
                  Cancelar
								</Button>
								<Button type="filled" color="error" padding={10} onClick={handle.deleteInteraction}>
                  Excluir
								</Button>
							</Box>
						</>
					)
				}}
			</Modal>
			<List
				{...list}
				height={200}
				onClick={(row) => handle.openModal('read_interaction', row)}
				actions={{
					update: (row) => handle.openModal('update_interaction', row),
					delete: (row) => handle.openModal('delete_interaction', row),
				}}
			/>
			<Box display="flex" justifyContent="end" margin={10}>
				<Button type="filled" onClick={() => handle.openModal('create_interaction')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Interaction