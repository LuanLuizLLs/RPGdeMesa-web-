import React, { useState } from 'react'
import Page from '../../layouts/Page'
import Exploration from './containers/Exploration'
import Interaction from './containers/Interaction'
import Combat from './containers/Combat'
import Characters from './containers/Characters'
import { useSelector } from 'react-redux'
import {
  Card,
  Divider,
  Grid,
  Tab,
  Text,
  Title,
} from '../../components'


const INITIAL = {
  TAB: 0,
}

function Master() {

  const campaing = useSelector(({ reducer }) => reducer.CAMPAING)

  const [tab, setTab] = useState(INITIAL.TAB)

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
        <Grid type="container">
          <Grid type="row">
            <Grid type="column" padding={[5, 0]} minWidth={300}>
              <Title type="h6">
                Aventura:
              </Title>
              <Text fontWeight="bold" color="gray">
                Nenhuma aventura iniciada...
              </Text>
            </Grid>
            <Grid type="column" padding={[5, 0]} minWidth={300}>
              <Title type="h6">
                Cenário:
              </Title>
              <Text fontWeight="bold" color="gray">
                Nenhum cenário selecionado...
              </Text>
            </Grid>
          </Grid>
          <Grid type="row">
            <Grid type="column" padding={[5, 0]} minWidth={300}>
              <Title type="h6">
                Personagens:
              </Title>
              <Characters campaing={campaing} />
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
    </Page>
  )
}

export default Master