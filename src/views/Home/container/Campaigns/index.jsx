import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import useLoading from '../../../../hooks/useLoading'
import useMessage from '../../../../hooks/useMessage'
import useCampaign from '../../../../hooks/useCampaign'
import imageMaster from '../../../../assets/img/master.png'
import { INITIAL } from './initial'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CAMPAIGNS } from '../../../../constants'
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

function Campaigns({ user }) {

  const setNavigate = useNavigate()
  const setDispatch = useDispatch()

  const { openMessage } = useMessage()
  const { additionalAttributes } = useCampaign()
  const { startLoading, stopLoading } = useLoading()

  const [list, setList] = useState(INITIAL.LIST)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)

  useEffect(() => {
    API('campaigns', {
      id_user: user.id
    })
      .read(({ data }) => {
        setList((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh, user.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetValues: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      stopLoading()
    },
    createCampaign: () => {
      startLoading('bar')

      API('campaigns', {
        ...values,
        ...additionalAttributes(values.period, values.climate),
        id_user: user.id,
      })
        .create(({ data }) => {
          setRefresh(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetValues)
    },
    updateCampaign: () => {
      startLoading('bar')

      API('campaigns', values)
        .update(({ data }) => {
          setRefresh(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetValues)
    },
    deleteCampaign: () => {
      startLoading('bar')

      API('campaigns', values)
        .delete(({ data }) => {
          openMessage(data.status, data.message)
          setRefresh(data)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetValues)
    },
    startCampaign: () => {
      setDispatch({
        type: 'CAMPAIGN',
        data: values,
      })
      setNavigate('/master')
    },
  }

  return (
    <>
      <Modal
        maxWidth={450}
        stateModal={[modal, setModal]}
        onClose={handle.resetValues}
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
                <Button type="bottomless" color="primary" padding={10} onClick={handle.resetValues}>
                  Voltar
                </Button>
                <Button type="filled" padding={10} onClick={handle.startCampaign}>
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
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetValues}>
                  Cancelar
                </Button>
                <Button type="filled" color="primary" padding={10} onClick={handle.createCampaign}>
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
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetValues}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.updateCampaign}>
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
                <Button type="bottomless" padding={10} onClick={handle.resetValues}>
                  Cancelar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteCampaign}>
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
          onClick={(row) => handle.openModal('campaign_start', row)}
          actions={{
            update: (row) => handle.openModal('campaign_update', row),
            delete: (row) => handle.openModal('campaign_delete', row),
          }}
        />
        <Button type="filled" padding={10} onClick={() => handle.openModal('campaign_create')}>
          Criar campanha
        </Button>
      </Card>
    </>
  )
}

export default Campaigns