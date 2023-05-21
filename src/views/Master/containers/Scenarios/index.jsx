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

function Scenarios({
	campaign,
	setRefreshCampaign,
}) {

	const setDispatch = useDispatch()

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()
	const { SCENERY } = useSelector(({ reducer }) => reducer)

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)

	useEffect(() => {
		API('scenarios', {
			id_campaign: campaign.id,
		})
			.read(({ data }) => {
				const scenerySelected = data.response.find(({ id }) => (id === campaign.id_scenery))
				setList((state) => ({
					...state, rows: data.response,
				}))
				setDispatch({
					type: 'SCENERY',
					data: scenerySelected || {},
				})
			})
	}, [campaign, setDispatch])

	const handle = {
		openModal: (content, data = {}) => {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		openCollapse: (name) => {
			setCollapse({
				...collapse, [name]: !collapse[name]
			})
		},
		resetValues: () => {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		generateSecenery: () => {
			setValues({
				...values,
				name: optionRandow(CAMPAIGNS.SCENARIOS),
			})
		},
		createScenery: () => {
			startLoading('bar')

			API('scenarios', {
				...values,
				id_campaign: campaign.id,
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
		deleteScenery: () => {
			startLoading('bar')

			API('scenarios', values)
				.delete(({ data }) => {
					setRefreshCampaign(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		startScenery: () => {
			startLoading('bar')

			API('campaigns', {
				...campaign,
				id_scenery: values.id,
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
		updateScenery: () => {
			startLoading('bar')

			API('scenarios', values)
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
        Cenário:
			</Title>
			<Paper backgroundColor="secondary" margin="10px 0">
				{SCENERY.id ? (
					<>
						<Text fontWeight="bold" color="gray">
							<Text inline fontWeight="bold" color="primary" textTransform="capitalize">{SCENERY.name}</Text>: {SCENERY.description}
						</Text>
					</>
				) : (
					<Text fontWeight="bold" color="gray">
            Nenhum cenário selecionado...
					</Text>
				)}
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openModal('add_scenery')}>
            Criar
					</Button>
				</Box>
			</Paper>
			<Button fontSize="larger" type="filled" onClick={() => handle.openCollapse('scenery')}>
        Cenários
			</Button>
			<Collapse name="scenery" stateCollapse={[collapse, setCollapse]}>
				{Boolean(list.rows.length) && (
					<List
						{...list}
						height={150}
						noColumns={true}
						onClick={(row) => handle.openModal('detail_scenery', row)}
						actions={{
							update: (row) => handle.openModal('edit_scenery', row),
						}}
					/>
				)}
			</Collapse>
			<Modal maxWidth={450} stateModal={[modal, setModal]} onClose={handle.resetValues}>
				{{
					add_scenery: (
						<>
							<Title type="h6">
                Criar cenário:
							</Title>
							<Input
								name="name"
								label="Cenário:"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								label="Descreva o cenário:"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={5} onClick={handle.generateSecenery}>
                  Gerar
								</Button>
								<Button type="filled" padding={5} onClick={handle.createScenery}>
                  Criar
								</Button>
							</Box>
						</>
					),
					detail_scenery: (
						<>
							<Title type="h6">
                Detalhes do cenário:
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
								<Button type="filled" color="error" padding={5} onClick={handle.deleteScenery}>
                  Excluir
								</Button>
								<Button type="filled" padding={5} onClick={handle.startScenery}>
                  Selecionar
								</Button>
							</Box>
						</>
					),
					edit_scenery: (
						<>
							<Title type="h6">
                Editar cenário:
							</Title>
							<Input
								name="name"
								label="Cenário:"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								label="Descrição da cenário:"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={5} onClick={handle.resetValues}>
                  Cancelar
								</Button>
								<Button type="filled" padding={5} onClick={handle.updateScenery}>
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

export default Scenarios