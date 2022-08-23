import React, { useEffect, useState } from 'react'
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
  Divider,
  Grid,
  List,
  Modal,
  Tab,
  Text,
  Title,
} from '../../components'
import theme from '../../theme'

const INITIAL = {
  TAB: 0,
  MODAL: {
    content: '',
    data: {},
  },
  ADVENTURES: {
    columns: ['Aventura', 'Descrição'],
    rows: [
      {
        adventure: 'Aventura',
        description: 'Descrição da aventura',
      }
    ],
  }
}

function Master() {

  const setDispatch = useDispatch()

  const campaing = useSelector(({ reducer }) => reducer.CAMPAING)

  const [tab, setTab] = useState(INITIAL.TAB)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [adventures, ] = useState(INITIAL.ADVENTURES)

  useEffect(() => {
    API.get(`campaings/read/${campaing.id}`)
      .then(({ data }) => {
        const [campaingData] = data.response
        setDispatch({
          type: 'CAMPAING',
          data: campaingData
        })
      })
  }, [campaing.id, setDispatch])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
    },
  }

  return (
    <Page tab="Mestre" title="Escudo do Mestre" width="90vw">
      <Title type="h6" color="secondary">
        #{campaing.id} - {campaing.name}
      </Title>
      <Card>
        <Title type="h6" textAlign="center">
          {campaing.name}
        </Title>
        <Text textAlign="center">
          {campaing.description}
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
            <Characters campaing={campaing} />
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
              </Box>
              <Button fontSize="larger" type="filled" onClick={() => handle.openModal('add_adventure')}>
                Aventuras
              </Button>
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
              </Box>
              <Button fontSize="larger" type="filled" onClick={() => handle.openModal('add_scenary')}>
                Cenários
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Divider borderStyle="solid" />
      <Card>
        <Tab tabs={['Exploração', 'Interação', 'Combate']} stateTab={[tab, setTab]}>
          {[
            <Exploration key="exploration" campaing={campaing} />,
            <Interaction key="interaction" campaing={campaing} />,
            <Combat key="combat" campaing={campaing} />,
          ]}
        </Tab>
      </Card>
      <Modal maxWidth={500} stateModal={[modal, setModal]}>
        {({
          add_adventure: (
            <>
              <List height={200} {...adventures} />
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={5}>
                  Voltar
                </Button>
                <Button type="filled" padding={5}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          add_scenary: (
            <>
              CENÁRIO
            </>
          )
        })[modal.content] || null}
      </Modal>
    </Page>
  )
}

export default Master