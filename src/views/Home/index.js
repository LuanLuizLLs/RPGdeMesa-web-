import React, { useContext, useEffect, useState } from 'react'
import Page from '../../layouts/Page'
import Context from '../../global/context'
import imageMaster from '../../assets/img/master.png'
import imagePlayer from '../../assets/img/player.png'
import { requestAPI } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CASTE, RACE, TENDENCY } from '../../configs'
import {
  Box,
  Button,
  Card,
  Grid,
  Image,
  Input,
  List,
  TextArea,
  Title,
  Modal,
  Text,
  Select,
  Paper,
} from '../../components'

const INITIAL = {
  MODAL: {
    content: '',
    data: {}
  },
  VALUES: {
    name: '',
    description: '',
  },
  REFRESH: {
    campaign: null,
    character: null,
  },
  LIST_CAMPAIGNS: {
    columns: {
      id: 'ID',
      name: 'Campanha',
      description: 'Descrição',
    },
    rows: [],
  },
  LIST_CHARACTERS: {
    columns: {
      id: 'ID',
      name: 'Personagem',
      description: 'Descrição',
    },
    rows: [],
  },
}

function Home() {

  const setNavigate = useNavigate()
  const setDispatch = useDispatch()

  const { USER } = useSelector(({ reducer }) => reducer)

  const { setLoading, setMessage } = useContext(Context)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [campaigns, setCampaigns] = useState(INITIAL.LIST_CAMPAIGNS)
  const [characters, setCharacters] = useState(INITIAL.LIST_CHARACTERS)

  useEffect(() => {
    requestAPI('campaigns', {
      id_user: USER.id
    })
      .read(({ data }) => {
        setCampaigns((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh.campaign, USER.id])

  useEffect(() => {
    requestAPI('characters', {
      id_user: USER.id
    })
      .read(({ data }) => {
        setCharacters((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh.character, USER.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetCampaign: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createCampaign: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('campaigns', {
        ...values,
        id_user: USER.id
      })
        .create(({ data }) => {
          setRefresh({
            campaign: data,
          })
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCampaign)
    },
    updateCampaign: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('campaigns', values)
        .update(({ data }) => {
          setRefresh({
            campaign: data
          })
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCampaign)
    },
    deleteCampaign: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('campaigns', values)
        .delete(({ data }) => {
          setMessage(data.message)
          setRefresh(({
            campaign: data
          }))
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCampaign)
    },
    startCampaign: () => {
      setDispatch({
        type: 'CAMPAIGN',
        data: values,
      })
      setNavigate('/master')
    },
    resetCharacter: () => {
      setLoading({})
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
    createCharacter: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', {
        ...values,
        ...RACE[values.race],
        ...CASTE[values.caste],
        id_user: USER.id,
      })
        .create(({ data }) => {
          setRefresh({
            character: data
          })
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCharacter)
    },
    updateCharacter: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', values)
        .update(({ data }) => {
          setRefresh({
            character: data
          })
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCharacter)
    },
    deleteCharacter: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', values)
        .delete(({ data }) => {
          setRefresh(({
            character: data
          }))
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCharacter)
    },
    startCharacter: () => {
      setDispatch({
        type: 'CHARACTER',
        data: values,
      })
      setNavigate('/player')
    },
  }

  return (
    <Page tab="Home">
      <Modal
        maxWidth={450}
        stateModal={[modal, setModal]}
        onClose={() => {
          handle.resetCampaign()
          handle.resetCharacter()
        }}
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
                <Button type="bottomless" color="primary" padding={10} onClick={handle.resetCampaign}>
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
              <TextArea
                rows={3}
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetCampaign}>
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
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetCampaign}>
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
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" padding={10} onClick={handle.resetCampaign}>
                  Cancelar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteCampaign}>
                  Excluir
                </Button>
              </Box>
            </>
          ),
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
                stateValue={[values, setValues]}
              />
              <Select
                name="race"
                placeholder="Escolha uma raça"
                options={Object.keys(RACE)}
                stateValue={[values, setValues]}
              />
              <Select
                name="caste"
                placeholder="Escolha uma classe"
                options={Object.keys(CASTE)}
                stateValue={[values, setValues]}
              />
              <Select
                name="tendency"
                placeholder="Escolha uma tendência"
                options={Object.keys(TENDENCY)}
                stateValue={[values, setValues]}
              />
              <TextArea
                rows={3}
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
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
                stateValue={[values, setValues]}
              />
              <TextArea
                rows={3}
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
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
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" padding={10} onClick={handle.resetCharacter}>
                  Cancelar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteCharacter}>
                  Excluir
                </Button>
              </Box>
            </>
          )
        }}
      </Modal>
      <Grid type="container" padding={[0, 20]}>
        <Grid type="row">
          <Grid type="column" padding={[20, 20]} minWidth={300}>
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
                {...campaigns}
                onClick={(row) => handle.openModal('campaign_start', row)}
                actions={(row) => ({
                  update: () => handle.openModal('campaign_update', row),
                  delete: () => handle.openModal('campaign_delete', row),
                })}
              />
              <Button type="filled" padding={10} onClick={() => handle.openModal('campaign_create')}>
                Criar campanha
              </Button>
            </Card>
          </Grid>
          <Grid type="column" padding={[20, 20]} minWidth={300}>
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
                {...characters}
                onClick={(row) => handle.openModal('character_start', row)}
                actions={(row) => ({
                  update: () => handle.openModal('character_update', row),
                  delete: () => handle.openModal('character_delete', row),
                })}
              />
              <Button type="filled" padding={10} onClick={() => handle.openModal('character_create')}>
                Criar personagem
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Home