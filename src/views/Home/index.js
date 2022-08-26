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
    campaing: null,
    character: null,
  },
  LIST_CAMPAINGS: {
    columns: ['ID', 'Campanha', 'Descrição'],
    rows: [],
  },
  LIST_CHARACTERS: {
    columns: ['ID', 'Personagem', 'Descrição'],
    rows: [],
  },
}

function Home() {

  const setNavigate = useNavigate()
  const setDispatch = useDispatch()

  const user = useSelector(({ reducer }) => reducer.USER)

  const setLoading = useContext(Context).loading[1]
  const setMessage = useContext(Context).message[1]

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [valuesCampaing, setValuesCampaing] = useState(INITIAL.VALUES)
  const [valuesCharacter, setValuesCharacter] = useState(INITIAL.VALUES)
  const [listCampaings, setListCampaings] = useState(INITIAL.LIST_CAMPAINGS)
  const [listCharacters, setListCharacters] = useState(INITIAL.LIST_CHARACTERS)

  useEffect(() => {
    API.get('campaings/read', {
      params: {
        id_user: user.id,
      }
    })
      .then(({ data }) => {
        setListCampaings((state) => ({
          ...state, 
          rows: data.response.map((campaing) => ({
            id: campaing.id,
            name: campaing.name,
            description: campaing.description,
            data: campaing,
          }))
        }))
      })
  }, [refresh.campaing, user.id])

  useEffect(() => {
    API.get('characters/read', {
      params: {
        id_user: user.id,
      }
    })
      .then(({ data }) => {
        setListCharacters((state) => ({
          ...state, 
          rows: data.response.map((character) => ({
            id: character.id,
            name: character.name,
            description: character.description,
            data: character,
          }))
        }))
      })
  }, [refresh.character, user.id])

  const handle = {
    openCampaing: (content, data) => {
      setModal({ content, data })
      if (content === 'campaing_update') {
        setValuesCampaing(data)
      }
    },
    resetCampaing: () => {
      setLoading({})
      setModal(INITIAL.MODAL)
      setValuesCampaing(INITIAL.VALUES)
    },
    createCampaing: () => {
      setLoading({
        type: 'circular'
      })

      API.post('campaings/create', {
        id_user: user.id,
        ...valuesCampaing,
      })
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh({
            ...refresh, campaing: data
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao criar a campanha',
          })
        })
        .finally(handle.resetCampaing)
    },
    updateCampaing: (id) => {
      setLoading({
        type: 'circular'
      })

      API.patch(`campaings/update/${id}`, valuesCampaing)
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh({
            ...refresh,
            campaing: data
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao atualizar a campanha',
          })
        })
        .finally(handle.resetCampaing)
    },
    deleteCampaing: (id) => {
      setLoading({
        type: 'bar'
      })

      API.delete((`campaings/delete/${id}`))
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh(({
            ...refresh,
            campaing: data
          }))
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao deletar a campanha'
          })
        })
        .finally(handle.resetCampaing)
    },
    startCampaing: ({ data }) => {
      setDispatch({
        type: 'CAMPAING', data,
      })
      setNavigate('/master')
    },
    openCharacter: (content, data) => {
      setModal({ content, data })
      if (content === 'character_update') {
        setValuesCharacter(data)
      }
    },
    resetCharacter: () => {
      setLoading({})
      setModal(INITIAL.MODAL)
      setValuesCharacter(INITIAL.VALUES)
    },
    createCharacter: () => {
      setLoading({
        type: 'circular'
      })

      API.post('characters/create', {
        id_user: user.id,
        ...valuesCharacter,
        ...RACE[valuesCharacter.race],
        ...CASTE[valuesCharacter.caste],
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

      API.patch(`characters/update/${id}`, valuesCharacter)
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
    startCharacter: ({ data }) => {
      setDispatch({
        type: 'CHARACTER', data,
      })
      setNavigate('/player')
    },
  }

  const ContentModal = ({ content, data = {} }) => {
    return ({
      campaing_start: (
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
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCampaing()}>
              Voltar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.startCampaing(data)}>
              Mestrar
            </Button>
          </Box>
        </>
      ),
      campaing_create: (
        <>
          <Title type="h6">
            Criar campanha:
          </Title>
          <Input
            name="name"
            placeholder="Campanha"
            stateValue={[valuesCampaing, setValuesCampaing]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva a campanha"
            stateValue={[valuesCampaing, setValuesCampaing]}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCampaing()}>
              Cancelar
            </Button>
            <Button type="filled" color="primary" padding={10} onClick={() => handle.createCampaing()}>
              Criar
            </Button>
          </Box>
        </>
      ),
      campaing_update: (
        <>
          <Title type="h6">
            Editar campanha:
          </Title>
          <Input
            name="name"
            placeholder="Campanha"
            stateValue={[valuesCampaing, setValuesCampaing]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva a campanha"
            stateValue={[valuesCampaing, setValuesCampaing]}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" color="secondary" padding={10} onClick={() => handle.resetCampaing()}>
              Cancelar
            </Button>
            <Button type="filled" padding={10} onClick={() => handle.updateCampaing(data.id)}>
              Salvar
            </Button>
          </Box>
        </>
      ),
      campaing_delete: (
        <>
          <Text>
            Tem certeza que deseja excluir a campanha <b>{data.name}</b>?
          </Text>
          <Box display="flex" justifyContent="flex-end">
            <Button type="filled" padding={10} onClick={() => handle.resetCampaing()}>
              Cancelar
            </Button>
            <Button type="filled" color="error" padding={10} onClick={() => handle.deleteCampaing(data.id)}>
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
          <Box display="flex" justifyContent="flex-end">
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
            stateValue={[valuesCharacter, setValuesCharacter]}
          />
          <Select
            name="race"
            placeholder="Escolha uma raça"
            options={Object.keys(RACE)}
            stateValue={[valuesCharacter, setValuesCharacter]}
          />
          <Select
            name="caste"
            placeholder="Escolha uma classe"
            options={Object.keys(CASTE)}
            stateValue={[valuesCharacter, setValuesCharacter]}
          />
          <Select
            name="tendency"
            placeholder="Escolha uma tendência"
            options={Object.keys(TENDENCY)}
            stateValue={[valuesCharacter, setValuesCharacter]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva o personagem"
            stateValue={[valuesCharacter, setValuesCharacter]}
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
            stateValue={[valuesCharacter, setValuesCharacter]}
          />
          <TextArea
            rows={3}
            name="description"
            placeholder="Descreva o personagem"
            stateValue={[valuesCharacter, setValuesCharacter]}
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
    })[content] || 'Conteúdo não encontrado...'
  }

  return (
    <Page tab="Home">
      <Modal
        maxWidth={450}
        stateModal={[modal, setModal]}
        onClose={() => {
          handle.resetCampaing()
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
                {...listCampaings}
                onClick={(row) => handle.openCampaing('campaing_start', row)}
                actions={(row) => [
                  <span key="update" type="update" title="Editar" onClick={() => handle.openCampaing('campaing_update', row)} />,
                  <span key="delete" type="delete" title="Deletar" onClick={() => handle.openCampaing('campaing_delete', row)} />,
                ]}
              />
              <Button type="filled" padding={10} onClick={() => handle.openCampaing('campaing_create')}>
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
                {...listCharacters}
                onClick={(row) => handle.openCharacter('character_start', row)}
                actions={(row) => [
                  <span key="update" type="update" title="Editar" onClick={() => handle.openCharacter('character_update', row)} />,
                  <span key="delete" type="delete" title="Deletar" onClick={() => handle.openCharacter('character_delete', row)} />,
                ]}
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