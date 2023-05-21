import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import useMessage from '../../../../hooks/useMessage'
import useLoading from '../../../../hooks/useLoading'
import { INITIAL } from './initial'
import { CAMPAIGNS } from '../../../../constants'
import { optionRandow } from '../../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Button,
	Collapse,
	Input,
	List,
	Modal,
	Paper,
	Text,
	TextArea,
	Title,
} from '../../../../components'

function Adventures({
	setRefreshCampaign,
}) {

	const setDispatch = useDispatch()

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()
	const { ADVENTURE, CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)

	useEffect(() => {
		API('adventures', {
			id_campaign: CAMPAIGN.id,
		})
			.read(({ data }) => {
				const adventureStarted = data.response.find(({ id }) => (id === CAMPAIGN.id_adventure))
				setList((state) => ({
					...state, rows: data.response,
				}))
				setDispatch({
					type: 'ADVENTURE',
					data: adventureStarted || {},
				})
			})
	}, [CAMPAIGN, setDispatch])

	const handle = {
		openModal: (content, data = {}) => {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		openCollapse: (name) => {
			setCollapse({
				...collapse,
				[name]: !collapse[name],
			})
		},
		resetValues: () => {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		generateAdventure: () => {
			setValues({
				...values,
				name: optionRandow(CAMPAIGNS.ADVENTURES),
			})
		},
		createAdventure: () => {
			startLoading('bar')

			API('adventures', {
				...values,
				id_campaign: CAMPAIGN.id,
			})
				.create(({ data }) => {
					setRefreshCampaign(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		deleteAdventure: () => {
			startLoading('bar')

			API('adventures', values)
				.delete(({ data }) => {
					setRefreshCampaign(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		startAdventure: () => {
			startLoading('bar')

			API('campaigns', {
				...CAMPAIGN,
				id_adventure: values.id,
			})
				.update(({ data }) => {
					setRefreshCampaign(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		updateAdventure: () => {
			startLoading('bar')

			API('adventures', values)
				.update(({ data }) => {
					setRefreshCampaign(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
	}

	return (
		<>
			<Title type="h6">
        Aventura:
			</Title>
			<Paper backgroundColor="secondary" margin="10px 0">
				{ADVENTURE.id ? (
					<>
						<Text fontWeight="bold" color="gray">
							<Text inline fontWeight="bold" color="primary" textTransform="capitalize">{ADVENTURE.name}:</Text> {ADVENTURE.description}
						</Text>
					</>
				) : (
					<Text fontWeight="bold" color="gray">
            Nenhuma aventura iniciada...
					</Text>
				)}
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openModal('add_adventure')}>
            Criar
					</Button>
				</Box>
			</Paper>
			<Button fontSize="larger" type="filled" onClick={() => handle.openCollapse('adventure')}>
        Aventuras
			</Button>
			<Collapse name="adventure" stateCollapse={[collapse, setCollapse]}>
				{Boolean(list.rows.length) && (
					<List
						{...list}
						height={150}
						noColumns={true}
						onClick={(row) => handle.openModal('detail_adventure', row)}
						actions={{
							update: (row) => handle.openModal('edit_adventure', row),
						}}
					/>
				)}
			</Collapse>
			<Modal maxWidth={450} stateModal={[modal, setModal]} onClose={handle.resetValues}>
				{{
					add_adventure: (
						<>
							<Title type="h6">
                Criar aventura:
							</Title>
							<Input
								name="name"
								label="Aventura:"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								label="Descreva a aventura:"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={5} onClick={handle.generateAdventure}>
                  Gerar
								</Button>
								<Button type="filled" padding={5} onClick={handle.createAdventure}>
                  Criar
								</Button>
							</Box>
						</>
					),
					detail_adventure: (
						<>
							<Title type="h6">
                Detalhes da aventura:
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
								<Button type="filled" color="error" padding={5} onClick={handle.deleteAdventure}>
                  Excluir
								</Button>
								<Button type="filled" padding={5} onClick={handle.startAdventure}>
                  Iniciar
								</Button>
							</Box>
						</>
					),
					edit_adventure: (
						<>
							<Title type="h6">
                Editar aventura:
							</Title>
							<Input
								name="name"
								label="Aventura:"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								label="Descrição da aventura:"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={5} onClick={handle.resetValues}>
                  Cancelar
								</Button>
								<Button type="filled" padding={5} onClick={handle.updateAdventure}>
                  Salvar
								</Button>
							</Box>
						</>
					),
				}}
			</Modal>
		</>
	)
}

export default Adventures