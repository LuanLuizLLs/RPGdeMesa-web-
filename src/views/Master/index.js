import React, { useContext, useEffect, useState } from 'react'
import API from '../../services/api'
import Page from '../../layouts/Page'
import Exploration from './containers/Exploration'
import Interaction from './containers/Interaction'
import Combat from './containers/Combat'
import Characters from './containers/Characters'
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
import theme from '../../theme'
import Context from '../../global/context'

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
  COLLAPSE: {
    adventure: false,
    scenary: false,
  },
  ADVENTURES: {
    rows: [
      {
        adventure: 'Aventura',
        description: 'Descrição da aventura',
      }
    ],
  },
  SCENARIOS: {
    rows: [
      {
        adventure: 'Cenário',
        description: 'Descrição do cenário',
      }
    ],
  },
}

function Master() {

  const setDispatch = useDispatch()

  const { setLoading, setMessage } = useContext(Context)

  const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

  const [tab, setTab] = useState(INITIAL.TAB)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)
  const [adventures, setAdventures] = useState(INITIAL.ADVENTURES)
  const [scenarios,] = useState(INITIAL.SCENARIOS)

  useEffect(() => {
    API.get(`campaigns/read/${CAMPAIGN.id}`)
      .then(({ data }) => {
        const [campaignData] = data.response
        setDispatch({
          type: 'CAMPAIGN',
          data: campaignData
        })
      })
  }, [CAMPAIGN.id, setDispatch])

  useEffect(() => {
    API.get('adventures/read', {
      id_campaign: CAMPAIGN.id,
    })
      .then(({ data }) => {
        const { response } = data
        setAdventures({
          rows: response.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
          }))
        })
      })
  }, [])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
    },
    openCollapse: (name) => {
      setCollapse({
        ...collapse, [name]: !collapse[name]
      })
    },
    resetCreate: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createAdventure: () => {
      setLoading({
        type: 'bar'
      })

      API.post('adventures/create', {
        ...values, id_campaign: CAMPAIGN.id,
      })
        .then(({ data }) => {
          setMessage(data.message)
        })
        .finally(handle.resetCreate)
    }
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
                Aventura:
              </Title>
              <Box background={theme.secondary} padding={10} borderRadius={10} marginBottom={10}>
                {false ? (
                  <>
                    <Text fontWeight="bold" color="primary">
                      Teste
                    </Text>
                    <Text fontWeight="bold" color="gray">
                      Teste teste teste teste
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
                <List height={150} {...adventures} />
              </Collapse>
            </Grid>
            <Grid type="column" padding={[10, 10]} minWidth={300}>
              <Title type="h6">
                Cenário:
              </Title>
              <Box background={theme.secondary} padding={10} borderRadius={10} marginBottom={10}>
                {false ? (
                  <>
                    <Text fontWeight="bold" color="primary">
                      Teste
                    </Text>
                    <Text fontWeight="bold" color="gray">
                      Teste teste teste teste
                    </Text>
                  </>
                ) : (
                  <Text fontWeight="bold" color="gray">
                    Nenhum cenário selecionado...
                  </Text>
                )}
                <Box display="flex" justifyContent="flex-end" marginTop={10}>
                  <Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openModal('add_scenary')}>
                    Criar
                  </Button>
                </Box>
              </Box>
              <Button fontSize="larger" type="filled" onClick={() => handle.openCollapse('scenary')}>
                Cenários
              </Button>
              <Collapse name="scenary" stateCollapse={[collapse, setCollapse]}>
                <List height={150} {...scenarios} />
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
      <Modal maxWidth={500} stateModal={[modal, setModal]}>
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
                <Button type="filled" color="secondary" padding={5} onClick={handle.resetCreate}>
                  Cancelar
                </Button>
                <Button type="filled" padding={5} onClick={handle.createAdventure}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          add_scenary: (
            <>
              <Input
                name="name"
                label="Cenário:"
                placeholder="Título"
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                label="Descreva o cenário:"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={5} onClick={handle.resetCreate}>
                  Cancelar
                </Button>
                <Button type="filled" padding={5}>
                  Criar
                </Button>
              </Box>
            </>
          )
        })[modal.content] || null}
      </Modal>
    </Page>
  )
}

export default Master