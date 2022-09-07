import React, { useContext, useEffect, useState } from 'react'
import theme from '../../theme'
import Context from '../../global/context'
import Page from '../../layouts/Page'
import Exploration from './containers/Exploration'
import Interaction from './containers/Interaction'
import Combat from './containers/Combat'
import Characters from './containers/Characters'
import { requestAPI } from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Input,
  List,
  Modal,
  Tab,
  Text,
  TextArea,
  Title,
} from '../../components'

const INITIAL = {
  TAB: 0,
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    name: '',
    description: '',
  },
  REFRESH: null,
  COLLAPSE: {
    adventure: false,
    scenary: false,
  },
  ADVENTURES: {
    columns: {
      name: true,
      description: true,
    },
    rows: [],
  },
  SCENARIOS: {
    columns: {
      name: true,
      description: true,
    },
    rows: [],
  },
}

function Master() {

  const setDispatch = useDispatch()

  const { setLoading, setMessage } = useContext(Context)

  const { CAMPAIGN, ADVENTURE } = useSelector(({ reducer }) => reducer)

  const [tab, setTab] = useState(INITIAL.TAB)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)
  const [adventures, setAdventures] = useState(INITIAL.ADVENTURES)
  const [scenarios,] = useState(INITIAL.SCENARIOS)

  useEffect(() => {
    requestAPI('campaigns', {
      id: CAMPAIGN.id,
    })
      .read(({ data }) => {
        const [campaign = {}] = data.response
        setDispatch({
          type: 'CAMPAIGN',
          data: campaign,
        })
      })
  }, [refresh, CAMPAIGN.id, setDispatch])

  useEffect(() => {
    requestAPI('adventures', {
      id_campaign: CAMPAIGN.id,
    })
      .read(({ data }) => {
        setAdventures((state) => ({
          ...state, rows: data.response,
        }))
        setDispatch({
          type: 'ADVENTURE',
          data: data.response.find(({ id }) => (id === CAMPAIGN.id_adventure)) || {},
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
        ...collapse, [name]: !collapse[name]
      })
    },
    resetAdventure: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createAdventure: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('adventures', {
        ...values, 
        id_campaign: CAMPAIGN.id,
      })
        .create(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetAdventure)
    },
    deleteAdventure: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('adventures', values)
        .delete(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetAdventure)
    },
    startAdventure: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('campaigns', {
        ...CAMPAIGN,
        id_adventure: values.id,
      })
        .update(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetAdventure)
    },
    updateAdventure: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('adventures', values)
        .update(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetAdventure)
    },
  }

  return (
    <Page tab="Mestre" title="Escudo do Mestre" width="90vw">
      <Title type="h6" color="secondary">
        #{CAMPAIGN.id} - {CAMPAIGN.name}
      </Title>
      <Card>
        <Title type="h6" textAlign="center">
          {CAMPAIGN.name}
        </Title>
        <Text textAlign="center">
          {CAMPAIGN.description}
        </Text>
      </Card>
      <Divider borderStyle="solid" />
      <Card>
        <Title type="h1" color="primary" textAlign="center" textDecoration="underline">
          MESA
        </Title>
        <Grid type="row">
          <Grid type="column" padding={[5, 0]} minWidth={300}>
            <Title type="h6">
              Personagens:
            </Title>
            <Characters campaign={CAMPAIGN} />
          </Grid>
        </Grid>
        <Grid type="container">
          <Grid type="row">
            <Grid type="column" padding={[10, 10]} minWidth={300}>
              <Title type="h6">
                Aventura atual:
              </Title>
              <Box background={theme.secondary} padding={10} borderRadius={10} marginBottom={10}>
                {Boolean(ADVENTURE.id) ? (
                  <>
                    <Text fontWeight="bold" color="gray">
                      <Text inline fontWeight="bold" color="primary">
                        {ADVENTURE.name}:&nbsp;
                      </Text>
                      {ADVENTURE.description}
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
              </Box>
              <Button fontSize="larger" type="filled" onClick={() => handle.openCollapse('adventure')}>
                Aventuras
              </Button>
              <Collapse name="adventure" stateCollapse={[collapse, setCollapse]}>
                <List
                  height={150}
                  noColumns={true}
                  {...adventures}
                  onClick={(row) => handle.openModal('detail_adventure', row)}
                  actions={(row) => ({
                    update: () => handle.openModal('edit_adventure', row),
                  })}
                />
              </Collapse>
            </Grid>
            <Grid type="column" padding={[10, 10]} minWidth={300}>
              <Title type="h6">
                Cenário atual:
              </Title>
              <Box background={theme.secondary} padding={10} borderRadius={10} marginBottom={10}>
                {false ? (
                  <>
                    <Text fontWeight="bold" color="gray">
                      <Text inline fontWeight="bold" color="primary">
                        {'name'}:&nbsp;
                      </Text>
                      {'description'}
                    </Text>
                  </>
                ) : (
                  <Text fontWeight="bold" color="gray">
                    Nenhum cenário selecionado...
                  </Text>
                )}
                <Box display="flex" justifyContent="flex-end" marginTop={10}>
                  <Button fontSize="medium" type="filled" padding={5}>
                    Criar
                  </Button>
                </Box>
              </Box>
              <Button fontSize="larger" type="filled">
                Cenários
              </Button>
              <Collapse name="scenary" stateCollapse={[collapse, setCollapse]}>
                <List noColumns={true} height={150} {...scenarios} />
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Divider borderStyle="solid" />
      <Card>
        <Tab tabs={['Exploração', 'Interação', 'Combate']} stateTab={[tab, setTab]}>
          {[
            <Exploration key="exploration" campaign={CAMPAIGN} />,
            <Interaction key="interaction" campaign={CAMPAIGN} />,
            <Combat key="combat" campaign={CAMPAIGN} />,
          ]}
        </Tab>
      </Card>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetAdventure}>
        {({
          add_adventure: (
            <>
              <Input
                name="name"
                label="Aventura:"
                placeholder="Título"
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                label="Descreva a aventura:"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={5} onClick={handle.resetAdventure}>
                  Cancelar
                </Button>
                <Button type="filled" padding={5} onClick={handle.createAdventure}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          detail_adventure: (
            <>
              <Title type="h6" color="primary">
                {modal.data.name}
              </Title>
              <Text>
                {modal.data.description}
              </Text>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="error" padding={5} onClick={handle.deleteAdventure}>
                  Remover
                </Button>
                <Button type="filled" padding={5} onClick={handle.startAdventure}>
                  Iniciar
                </Button>
              </Box>
            </>
          ),
          edit_adventure: (
            <>
              <Input
                name="name"
                label="Aventura:"
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                label="Descrição da aventura:"
                stateValue={[values, setValues]}
              />
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={5} onClick={handle.resetAdventure}>
                  Cancelar
                </Button>
                <Button type="filled" padding={5} onClick={handle.updateAdventure}>
                  Salvar
                </Button>
              </Box>
            </>
          ),
        })[modal.content] || null}
      </Modal>
    </Page>
  )
}

export default Master