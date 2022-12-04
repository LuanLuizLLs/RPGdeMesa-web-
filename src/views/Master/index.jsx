import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import Page from '../../layouts/Page'
import Combat from './containers/Combat'
import Scenarios from './containers/Scenarios'
import Adventures from './containers/Adventures'
import Exploration from './containers/Exploration'
import Interaction from './containers/Interaction'
import Characters from './containers/Characters'
import useMessage from '../../hooks/message'
import useLoading from '../../hooks/loading'
import { INITIAL } from './initial'
import { addSignal } from '../../utils'
import { colorConditions } from './utils'
import { CONDITIONS } from '../../configs'
import { CAMPAIGNS } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Divider,
  Grid,
  Select,
  Tab,
  Text,
  Title,
} from '../../components'

function Master() {

  const setDispatch = useDispatch()

  const { openMessage } = useMessage()
  const { startLoading, stopLoading } = useLoading()
  const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

  const [tab, setTab] = useState(INITIAL.TAB)
  const [values, setValues] = useState(CAMPAIGN)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)

  useEffect(() => {
    API('campaigns', {
      id: CAMPAIGN.id,
    })
      .read(({ data }) => {
        const [campaign = {}] = data.response
        setDispatch({
          type: 'CAMPAIGN',
          data: campaign,
        })
      })
  }, [refresh, setDispatch, CAMPAIGN.id])

  const handle = {
    updateCampaign: (update) => {
      startLoading('bar')

      API('campaigns', {
        ...update,
        ...CONDITIONS[update.season][update.period],
      })
        .update(({ data }) => {
          setRefresh(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(stopLoading)
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
      <Card margin="20px 0">
        <Grid type="row">
          <Grid type="column" padding={[10, 10]} minWidth={250}>
            <Adventures campaign={CAMPAIGN} setRefreshCampaign={setRefresh} />
          </Grid>
          <Grid type="column" padding={[10, 10]} minWidth={250}>
            <Scenarios campaign={CAMPAIGN} setRefreshCampaign={setRefresh} />
          </Grid>
        </Grid>
      </Card>
      <Divider borderStyle="solid" />
      
      <Card>
        <Grid type="container">
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
            <Grid type="row">
              <Grid type="column" padding={[0, 10]} minWidth={200}>
                <Select
                  name="period"
                  label="Período"
                  options={CAMPAIGNS.PERIOD}
                  onSelect={handle.updateCampaign}
                  stateValue={[values, setValues]}
                />
              </Grid>
              <Grid type="column" padding={[0, 10]} minWidth={200}>
                <Select
                  name="season"
                  label="Estação do ano"
                  options={CAMPAIGNS.SEASON}
                  onSelect={handle.updateCampaign}
                  stateValue={[values, setValues]}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid type="column" padding={[0, 10]} minWidth={250}>
          <Card margin="20px 0">
            <Text color="primary" fontWeight="bold" textAlign="center">
              Terreno: <Text inline color={colorConditions(CAMPAIGN.ground)}>{addSignal(CAMPAIGN.ground)}</Text> |
              Recursos: <Text inline color={colorConditions(CAMPAIGN.resources)}>{addSignal(CAMPAIGN.resources)}</Text> |
              Clima: <Text inline color={colorConditions(CAMPAIGN.climate)}>{addSignal(CAMPAIGN.climate)}</Text>
            </Text>
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
    </Page>
  )
}

export default Master