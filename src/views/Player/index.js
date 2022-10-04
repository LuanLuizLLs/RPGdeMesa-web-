import React, { useContext, useEffect, useState } from 'react'
import Page from '../../layouts/Page'
import Features from './container/Features'
import Abilities from './container/Abilities'
import Inventory from './container/Inventory'
import Context from '../../global/context'
import { maxLife } from '../../utils'
import { requestAPI } from '../../services/api'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Card,
  Divider,
  Grid,
  Input,
  Tab,
  Text,
  TextArea,
  Title,
} from '../../components'

const INITIAL = {
  TAB: 2,
  REFRESH: null,
  VALUES: {},
}

function Player() {

  const setDispatch = useDispatch()

  const { id_character } = useParams()
  const { setLoading, setMessage } = useContext(Context)
  const { USER, CHARACTER, CAMPAIGN } = useSelector(({ reducer }) => reducer)

  const [tab, setTab] = useState(INITIAL.TAB)
  const [values, setValues] = useState(id_character ? INITIAL.VALUES : CHARACTER)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)

  useEffect(() => {
    id_character && setLoading({
      type: 'circular'
    })

    requestAPI('characters', {
      id: id_character || CHARACTER.id,
      ...id_character && ({
        user: USER.id,
        campaign: CAMPAIGN.id,
      })
    })
      .read(({ data }) => {
        const [character = {}] = data.response
        setValues(character)
        setDispatch({
          type: 'CHARACTER',
          data: character,
        })
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
      })
      .finally(() => {
        setLoading({})
      })
  }, [refresh, id_character, CHARACTER.id, CAMPAIGN.id, USER.id, setLoading, setMessage, setValues, setDispatch])

  return (
    <Page tab="Jogador" title="Ficha do Jogador" width="80vw">
      <Title type="h6" color="secondary">
        #{CHARACTER.id || 'ID'} - {CHARACTER.name || 'Personagem'}
      </Title>
      <Card>
        <Grid type="container">
          <Grid type="row">
            <Grid type="column" padding={[0, 5]} minWidth={200}>
              <Input
                readOnly
                name="name"
                label="Nome"
                stateValue={[values, setValues]}
              />
            </Grid>
            <Grid type="column" padding={[0, 5]} minWidth={200}>
              <Input
                readOnly
                name="race"
                label="Raça"
                stateValue={[values, setValues]}
              />
            </Grid>
            <Grid type="column" padding={[0, 5]} minWidth={200}>
              <Input
                readOnly
                name="caste"
                label="Classe"
                stateValue={[values, setValues]}
              />
            </Grid>
            <Grid type="column" padding={[0, 5]} minWidth={200}>
              <Input
                readOnly
                name="tendency"
                label="Tendência"
                stateValue={[values, setValues]}
              />
            </Grid>
          </Grid>
          <Grid type="row">
            <Grid type="column" padding={[0, 5]}>
              <TextArea
                readOnly
                name="description"
                label="Descrição"
                stateValue={[values, setValues]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Grid type="row" margin={[10, 0]} alignItems="center">
        <Grid type="column" padding={[10, 10]} minWidth={250}>
          <Card>
            <Box display="flex" justifyContent="space-around" flexWrap="wrap">
              <Text fontSize="medium" textAlign="center" whiteSpace="nowrap">
                💪 FOR {CHARACTER.strength || 0} | 👋 DES {CHARACTER.dexterity || 0} | ✊ CON {CHARACTER.constitution || 0}
              </Text>
              <Text fontSize="medium" textAlign="center" whiteSpace="nowrap">
                📙 INT {CHARACTER.intelligence || 0} | 🙌 SAB {CHARACTER.wisdom || 0} | 🤝 CAR {CHARACTER.charisma || 0}
              </Text>
            </Box>
          </Card>
        </Grid>
        <Grid type="column" padding={[10, 10]} minWidth={250}>
          <Card>
            <Grid type="row">
              <Grid type="column" padding={[0, 5]} minWidth={150}>
                <Input
                  readOnly
                  start="❤️"
                  end={`+${maxLife(CHARACTER)}`}
                  name="life"
                  type="number"
                  label="Vida"
                  fontSize="medium"
                  stateValue={[values, setValues]}
                />
              </Grid>
              <Grid type="column" padding={[0, 5]} minWidth={150}>
                <Input
                  readOnly
                  start="👣"
                  name="actions"
                  type="number"
                  label="Ações"
                  fontSize="medium"
                  stateValue={[values, setValues]}
                />
              </Grid>
              <Grid type="column" padding={[0, 5]} minWidth={150}>
                <Input
                  readOnly
                  start="💰"
                  name="coins"
                  type="number"
                  label="Moedas"
                  fontSize="medium"
                  stateValue={[values, setValues]}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Divider borderStyle="solid" />
      <Card>
        <Tab tabs={['Características', 'Habilidades', 'Invetário']} stateTab={[tab, setTab]}>
          {[
            <Features key="features" user={USER} character={CHARACTER} setRefreshCharacter={setRefresh} />,
            <Abilities key="abilities" user={USER} character={CHARACTER} setRefreshCharacter={setRefresh} />,
            <Inventory key="inventory" user={USER} character={CHARACTER} setRefreshCharacter={setRefresh} />,
          ]}
        </Tab>
      </Card>
    </Page>
  )
}

export default Player