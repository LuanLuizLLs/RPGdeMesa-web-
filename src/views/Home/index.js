import React, { useContext, useEffect, useState } from 'react'
import Page from '../../layouts/Page'
import Context from '../../global/context'
import imageMaster from '../../assets/img/master.png'
import imagePlayer from '../../assets/img/player.png'
import API from '../../services/api'
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
    API.get('campaigns/read', {
      params: {
        id_user: USER.id,
      }
    })
      .then(({ data }) => {
        setCampaigns((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh.campaign, USER.id])

  useEffect(() => {
    API.get('characters/read', {
      params: {
        id_user: USER.id,
      }
    })
      .then(({ data }) => {
        setCharacters((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh.character, USER.id])

  const handle = {
    openCampaign: (content, data) => {
      setModal({ content, data })
      if (content === 'campaign_update') {
        setValues(data)
      }
    },
    resetCampaign: () => {
      setLoading({})
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
    createCampaign: () => {
      setLoading({
        type: 'circular'
      })

      API.post('campaigns/create', {
        id_user: USER.id,
        ...values,
      })
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh({
            ...refresh, campaign: data
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao criar a campanha',
          })
        })
        .finally(handle.resetCampaign)
    },
    updateCampaign: (id) => {
      setLoading({
        type: 'circular'
      })

      API.patch(`campaigns/update/${id}`, values)
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh({
            ...refresh,
            campaign: data
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao atualizar a campanha',
          })
        })
        .finally(handle.resetCampaign)
    },
    deleteCampaign: (id) => {
      setLoading({
        type: 'bar'
      })

      API.delete((`campaigns/delete/${id}`))
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh(({
            ...refresh,
            campaign: data
          }))
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao deletar a campanha'
          })
        })
        .finally(handle.resetCampaign)
    },
    startCampaign: (data) => {
      setDispatch({
        type: 'CAMPAIGN', data,
      })
      setNavigate('/master')
    },
    openCharacter: (content, data) => {
      setModal({ content, data })
      if (content === 'character_update') {
        setValues(data)
      }
    },
    resetCharacter: () => {
      setLoading({})
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
    createCharacter: () => {
      setLoading({
        type: 'circular'
      })

      API.post('characters/create', {
        id_user: USER.id,
        ...values,
        ...RACE[values.race],
        ...CASTE[values.caste],
      })
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh({
            ...refresh,
            character: data
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao criar o personagem',
          })
        })
        .finally(handle.resetCharacter)
    },
    updateCharacter: (id) => {
      setLoading({
        type: 'circular'
      })

      API.patch(`characters/update/${id}`, values)
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh({
            ...refresh,
            character: data
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao atualizar o personagem',
          })
        })
        .finally(handle.resetCharacter)
    },
    deleteCharacter: (id) => {
      setLoading({
        type: 'bar'
      })

      API.delete((`characters/delete/${id}`))
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh(({
            ...refresh,
            character: data
          }))
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao deletar o personagem'
          })
        })
        .finally(handle.resetCharacter)
    },
    startCharacter: (data) => {
      setDispatch({
        type: 'CHARACTER', data,
      })
      setNavigate('/player')
    },
  }

  const ContentModal = ({ content, data = {} }) => {
    return ({
      campaign_start: (
        <>
          <Title type="h6">
            Campanha
          </Title>
          <Text>
            {data.name}
          </Text>
          <Title type="h6">
            Descrição
          </Title>
          <Text>
            {data.description}
          </Text>
          <Box display="flex" justifyContent="flex-end" marginTop={10}>
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCampaign()}>
              Voltar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.startCampaign(data)}>
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
            placeholder="Campanha"
            stateValue={[values, setValues]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva a campanha"
            stateValue={[values, setValues]}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCampaign()}>
              Cancelar
            </Button>
            <Button type="filled" color="primary" padding={10} onClick={() => handle.createCampaign()}>
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
            placeholder="Campanha"
            stateValue={[values, setValues]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva a campanha"
            stateValue={[values, setValues]}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCampaign()}>
              Cancelar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.updateCampaign(data.id)}>
              Salvar
            </Button>
          </Box>
        </>
      ),
      campaign_delete: (
        <>
          <Text>
            Tem certeza que deseja excluir a campanha <b>{data.name}</b>?
          </Text>
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" padding={10} onClick={() => handle.resetCampaign()}>
              Cancelar
            </Button>
            <Button type="filled" color="error" padding={10} onClick={() => handle.deleteCampaign(data.id)}>
              Excluir
            </Button>
          </Box>
        </>
      ),
      character_start: (
        <>
          <Title type="h6">
            Personagem
          </Title>
          <Text>
            {data.name}
          </Text>
          <Title type="h6">
            Descrição
          </Title>
          <Text>
            {data.description}
          </Text>
          <Box display="flex" justifyContent="flex-end" marginTop={10}>
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCharacter()}>
              Voltar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.startCharacter(data)}>
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
            placeholder="Personagem"
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
            placeholder="Descreva o personagem"
            stateValue={[values, setValues]}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCharacter()}>
              Cancelar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.createCharacter()}>
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
            placeholder="Personagem"
            stateValue={[values, setValues]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva o personagem"
            stateValue={[values, setValues]}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCharacter()}>
              Cancelar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.updateCharacter(data.id)}>
              Salvar
            </Button>
          </Box>
        </>
      ),
      character_delete: (
        <>
          <Text>
            Tem certeza que deseja excluir o personagem <b>{data.name}</b>?
          </Text>
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" padding={10} onClick={() => handle.resetCharacter()}>
              Cancelar
            </Button>
            <Button type="filled" color="error" padding={10} onClick={() => handle.deleteCharacter(data.id)}>
              Excluir
            </Button>
          </Box>
        </>
      ),
    })[content] || null
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
        {ContentModal(modal)}
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
                onClick={(row) => handle.openCampaign('campaign_start', row)}
                actions={(row) => ({
                  update: () => handle.openCampaign('campaign_update', row),
                  delete: () => handle.openCampaign('campaign_delete', row),
                })}
              />
              <Button type="filled" padding={10} onClick={() => handle.openCampaign('campaign_create')}>
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
                onClick={(row) => handle.openCharacter('character_start', row)}
                actions={(row) => ({
                  update: () => handle.openCharacter('character_update', row),
                  delete: () => handle.openCharacter('character_delete', row),
                })}
              />
              <Button type="filled" padding={10} onClick={() => handle.openCharacter('character_create')}>
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