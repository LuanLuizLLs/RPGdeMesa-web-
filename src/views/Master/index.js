import React, { useContext, useEffect, useState } from 'react'
import Context from '../../global/context'
import Page from '../../layouts/Page'
import Exploration from './containers/Exploration'
import Interaction from './containers/Interaction'
import Combat from './containers/Combat'
import Characters from './containers/Characters'
import { optionRandow } from '../../utils'
import { requestAPI } from '../../services/api'
import { ADVENTURES, CONDITIONS, PERIOD, SCENARIOS, SEASON } from '../../configs'
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
  Paper,
  Select,
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

const colorConditions = (condition = 0) => {
  return condition ? (condition > 0 ? 'error' : 'success') : 'black'
}

function Master() {

  const setDispatch = useDispatch()

  const { setLoading, setMessage } = useContext(Context)

  const { CAMPAIGN, ADVENTURE, SCENERY } = useSelector(({ reducer }) => reducer)

  const [tab, setTab] = useState(INITIAL.TAB)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [campaign, setCampaign] = useState(CAMPAIGN)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)
  const [adventures, setAdventures] = useState(INITIAL.ADVENTURES)
  const [scenarios, setScenarios] = useState(INITIAL.SCENARIOS)

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
        const adventureStarted = data.response.find(({ id }) => (id === CAMPAIGN.id_adventure))
        setAdventures((state) => ({
          ...state, rows: data.response,
        }))
        setDispatch({
          type: 'ADVENTURE',
          data: adventureStarted || {},
        })
      })
  }, [CAMPAIGN, setDispatch])

  useEffect(() => {
    requestAPI('scenarios', {
      id_campaign: CAMPAIGN.id,
    })
      .read(({ data }) => {
        const scenerySelected = data.response.find(({ id }) => (id === CAMPAIGN.id_scenery))
        setScenarios((state) => ({
          ...state, rows: data.response,
        }))
        setDispatch({
          type: 'SCENERY',
          data: scenerySelected || {},
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
    resetValues: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    generateAdventure: () => {
      setValues({
        ...values,
        name: optionRandow(ADVENTURES),
      })
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
        .finally(handle.resetValues)
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
        .finally(handle.resetValues)
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
        .finally(handle.resetValues)
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
        .finally(handle.resetValues)
    },
    generateSecenery: () => {
      setValues({
        ...values,
        name: optionRandow(SCENARIOS),
      })
    },
    createScenery: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('scenarios', {
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
        .finally(handle.resetValues)
    },
    deleteScenery: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('scenarios', values)
        .delete(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetValues)
    },
    startScenery: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('scenarios', {
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
        .finally(handle.resetValues)
    },
    updateScenery: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('scenarios', values)
        .update(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetValues)
    },
    updateCampaign: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('campaign', {
        ...campaign,
        ...CONDITIONS[campaign.season][campaign.period],
      })
        .update(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetValues)
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
        <Grid type="container">
          <Grid type="row">
            <Grid type="column" padding={[10, 10]} minWidth={250}>
              <Title type="h6">
                Aventura:
              </Title>
              <Paper backgroundColor="secondary" margin="10px 0">
                {Boolean(ADVENTURE.id) ? (
                  <>
                    <Text fontWeight="bold" color="gray" textTransform="lowercase">
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
                {Boolean(adventures.rows.length) && (
                  <List
                    height={150}
                    noColumns={true}
                    {...adventures}
                    onClick={(row) => handle.openModal('detail_adventure', row)}
                    actions={(row) => ({
                      update: () => handle.openModal('edit_adventure', row),
                    })}
                  />
                )}
              </Collapse>
            </Grid>
            <Grid type="column" padding={[10, 10]} minWidth={250}>
              <Title type="h6">
                Cenário:
              </Title>
              <Paper backgroundColor="secondary" margin="10px 0">
                {Boolean(SCENERY.id) ? (
                  <>
                    <Text fontWeight="bold" color="gray" textTransform="lowercase">
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
                {Boolean(scenarios.rows.length) && (
                  <List
                    height={150}
                    noColumns={true}
                    {...scenarios}
                    onClick={(row) => handle.openModal('detail_scenery', row)}
                    actions={(row) => ({
                      update: () => handle.openModal('edit_scenery', row),
                    })}
                  />
                )}
              </Collapse>
            </Grid>
          </Grid>
          <Grid type="row">
            <Grid type="column" padding={[5, 0]} minWidth={250}>
              <Title type="h6">
                Personagens:
              </Title>
              <Characters campaign={CAMPAIGN} />
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Grid type="row" alignItems="center">
        <Grid type="column" padding={[0, 10]} minWidth={250}>
          <Card margin="20px 0">
            <Text color="primary" fontWeight="bold" textAlign="center">
              Terreno: <Text inline color={colorConditions(CAMPAIGN.ground)}>{CAMPAIGN.ground}</Text> |
              Recursos: <Text inline color={colorConditions(CAMPAIGN.resources)}>{CAMPAIGN.resources}</Text> |
              Clima: <Text inline color={colorConditions(CAMPAIGN.climate)}>{CAMPAIGN.climate}</Text>
            </Text>
          </Card>
        </Grid>
        <Grid type="column" padding={[0, 10]} minWidth={250}>
          <Card margin="20px 0">
            <Grid type="row">
              <Grid type="column" padding={[0, 10]} minWidth={200}>
                <Select
                  name="period"
                  label="Período"
                  options={Object.keys(PERIOD)}
                  stateValue={[campaign, setCampaign]}
                />
              </Grid>
              <Grid type="column" padding={[0, 10]} minWidth={200}>
                <Select
                  name="season"
                  label="Estação do ano"
                  options={Object.keys(SEASON)}
                  stateValue={[campaign, setCampaign]}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Divider borderStyle="solid" />
      <Card>
        <Tab tabs={['Interação', 'Exploração', 'Combate']} stateTab={[tab, setTab]}>
          {[
            <Interaction key="interaction" campaign={CAMPAIGN} />,
            <Exploration key="exploration" campaign={CAMPAIGN} />,
            <Combat key="combat" campaign={CAMPAIGN} />,
          ]}
        </Tab>
      </Card>
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
    </Page>
  )
}

export default Master