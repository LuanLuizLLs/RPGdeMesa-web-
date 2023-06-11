import React, { useEffect, useState } from 'react'
import useAPI from '../../../../hooks/useAPI'
import useRedux from '../../../../hooks/useRedux'
import imageMaster from '../../../../assets/img/master.png'
import { INITIAL } from './initial'
import { useNavigate } from 'react-router-dom'
import { CAMPAIGNS } from '../../../../constants'
import { campaignAttributes } from '../../../../utils'
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

function Campaigns() {
	const navigate = useNavigate()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { getRedux, setRedux } = useRedux()
	const { USER } = getRedux()

	const {
		list: campaignList,
		fetch: fetchCampaign,
		create: createCampaign,
		update: updateCampaign,
		delete: deleteCampaign,
	} = useAPI('campaigns', {
		id_user: USER.id
	})

	useEffect(() => {
		setList((state) => ({
			...state, rows: campaignList,
		}))
	}, [campaignList])


	const handleOpenModal = (content, data = {}) => {
		setModal({ content, data })
		setValues({ ...values, ...data })
	}

	const handleResetValues = () => {
		setModal(INITIAL.MODAL)
		setValues(INITIAL.VALUES)
	}

	const handleCreateCampaign = () => {
		createCampaign({
			...values,
			...campaignAttributes(values.period, values.climate),
			id_user: USER.id,
		})
			.then(fetchCampaign)
			.finally(handleResetValues)
	}

	const handleUpdateCampaign = () => {
		updateCampaign(values)
			.then(fetchCampaign)
			.finally(handleResetValues)
	}

	const handleDeleteCampaign = () => {
		deleteCampaign(values)
			.then(fetchCampaign)
			.finally(handleResetValues)
	}

	const handleStartCampaign = () => {
		setRedux('CAMPAIGN', values)
		navigate('/master')
	}

	return (
		<>
			<Modal
				maxWidth={450}
				stateModal={[modal, setModal]}
				onClose={handleResetValues}
			>
				{{
					campaign_start: (
						<>
							<Title type="h6">
                Detalhes da campanha:
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
								<Button type="filled" padding={10} onClick={handleStartCampaign}>
                  Mestrar
								</Button>
							</Box>
						</>
					),
					campaign_create: (
						<>
							<Title type="h6">
                Criar campanha:
							</Title>
							<Input
								name="name"
								placeholder="Nome"
								stateValue={[values, setValues]}
							/>
							<Select
								name="period"
								placeholder="Período"
								options={CAMPAIGNS.PERIOD}
								stateValue={[values, setValues]}
							/>
							<Select
								name="climate"
								placeholder="Clima"
								options={CAMPAIGNS.CLIMATE}
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
								<Button type="filled" color="primary" padding={10} onClick={handleCreateCampaign}>
                  Criar
								</Button>
							</Box>
						</>
					),
					campaign_update: (
						<>
							<Title type="h6">
                Editar campanha:
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
								<Button type="filled" padding={10} onClick={handleUpdateCampaign}>
                  Salvar
								</Button>
							</Box>
						</>
					),
					campaign_delete: (
						<>
							<Title type="h6">
                Deletar campanha:
							</Title>
							<Text>
                Tem certeza que deseja excluir a campanha <b>{modal.data.name}</b>?
							</Text>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="bottomless" padding={10} onClick={handleResetValues}>
                  Cancelar
								</Button>
								<Button type="filled" color="error" padding={10} onClick={handleDeleteCampaign}>
                  Excluir
								</Button>
							</Box>
						</>
					),
				}}
			</Modal>
			<Card>
				<Image
					maxHeight={100}
					maxWidth={100}
					margin="0 auto"
					alt="mapa de aventura"
					src={imageMaster}
				/>
				<Title type="h4" textAlign="center">
          Lista de Campanhas:
				</Title>
				<List
					height={300}
					{...list}
					onClick={(row) => handleOpenModal('campaign_start', row)}
					actions={{
						update: (row) => handleOpenModal('campaign_update', row),
						delete: (row) => handleOpenModal('campaign_delete', row),
					}}
				/>
				<Button type="filled" padding={10} onClick={() => handleOpenModal('campaign_create')}>
          Criar campanha
				</Button>
			</Card>
		</>
	)
}

export default Campaigns