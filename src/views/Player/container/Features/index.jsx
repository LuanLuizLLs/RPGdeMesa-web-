import React, { useState } from 'react'
import API from '../../../../services/api'
import useSse from 'hooks/useSse'
import useMessage from '../../../../hooks/useMessage'
import useLoading from '../../../../hooks/useLoading'
import { INITIAL } from './initial'
import { ATTRIBUTE } from '../../../../configs'
import { useSelector } from 'react-redux'
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

function Features({
	setRefreshCharacter,
}) {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const { USER, CHARACTER } = useSelector(({ reducer }) => reducer)

	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [refresh, setRefresh] = useState(INITIAL.REFRESH)
	const [features, setFeatures] = useState(INITIAL.FEATURES)

	useSse('player', () => {
		if (CHARACTER.id) {
			API('features', {
				id_character: CHARACTER.id,
			})
				.read(({ data }) => {
					setFeatures((state) => ({
						...state, rows: data.response,
					}))
				})
		}
	}, [refresh, CHARACTER.id])

	const handle = {
		openModal: (content, data = {}) => {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetFeature: () => {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading({})
		},
		createFeature: () => {
			startLoading('bar')

			API('features', {
				...values,
				user: USER.id,
				id_character: CHARACTER.id,
			})
				.create(({ data }) => {
					setRefresh(data)
					setRefreshCharacter(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetFeature)
		},
		deleteFeature: () => {
			startLoading('bar')

			API('features', values)
				.delete(({ data }) => {
					setRefresh(data)
					setRefreshCharacter(data)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetFeature)
		}
	}

	return (
		<>
			<Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetFeature}>
				{{
					add_feature: (
						<>
							<Title type="h6" color="primary">
                Adicionar característica:
							</Title>
							<Input
								name="name"
								placeholder="Nome (adjetivo)"
								stateValue={[values, setValues]}
							/>
							<TextArea
								name="description"
								placeholder="Descrição"
								stateValue={[values, setValues]}
							/>
							<Grid type="row" padding={[5, 0]}>
								<Grid type="column" margin={[0, 5]}>
									<Input
										max={1}
										min={-1}
										start="💪"
										label="FOR"
										type="number"
										name="strength"
										stateValue={[values, setValues]}
									/>
								</Grid>
								<Grid type="column" margin={[0, 5]}>
									<Input
										max={1}
										min={-1}
										start="👋"
										label="DES"
										type="number"
										name="dexterity"
										stateValue={[values, setValues]}
									/>
								</Grid>
								<Grid type="column" margin={[0, 5]}>
									<Input
										max={1}
										min={-1}
										start="✊"
										label="CON"
										type="number"
										name="constitution"
										stateValue={[values, setValues]}
									/>
								</Grid>
							</Grid>
							<Grid type="row">
								<Grid type="column" margin={[0, 5]}>
									<Input
										max={1}
										min={-1}
										start="📙"
										label="INT"
										type="number"
										name="intelligence"
										stateValue={[values, setValues]}
									/>
								</Grid>
								<Grid type="column" margin={[0, 5]}>
									<Input
										max={1}
										min={-1}
										start="🙌"
										label="SAB"
										type="number"
										name="wisdom"
										stateValue={[values, setValues]}
									/>
								</Grid>
								<Grid type="column" margin={[0, 5]}>
									<Input
										max={1}
										min={-1}
										start="🤝"
										label="CAR"
										type="number"
										name="charisma"
										stateValue={[values, setValues]}
									/>
								</Grid>
							</Grid>
							<Box display="flex" justifyContent="flex-end" marginTop={10}>
								<Button type="filled" color="secondary" padding={10} onClick={handle.resetFeature}>
                  Cancelar
								</Button>
								<Button type="filled" padding={10} onClick={handle.createFeature}>
                  Criar
								</Button>
							</Box>
						</>
					),
					detail_feature: (
						<>
							<Title type="h6">
                Detalhes da característica:
							</Title>
							<Paper backgroundColor="secondary">
								<Text fontWeight="bold" color="primary">
									{modal.data.name}
								</Text>
								<Text fontWeight="bold" color="gray">
									{modal.data.description}
								</Text>
							</Paper>
							<Paper backgroundColor="secondary" margin="10px 0" overflow="auto">
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
								<Button type="filled" padding={10} onClick={handle.resetFeature}>
                  Fechar
								</Button>
								<Button type="filled" color="error" padding={10} onClick={handle.deleteFeature}>
                  Remover
								</Button>
							</Box>
						</>
					),
				}}
			</Modal>
			<List
				height={200}
				onClick={(row) => handle.openModal('detail_feature', row)}
				{...features}
			/>
			<Box display="flex" justifyContent="flex-end" margin={10}>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('add_feature')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Features