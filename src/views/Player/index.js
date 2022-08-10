import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import Page from '../../layouts/Page'
import Features from './container/Features'
import Abilities from './container/Abilities'
import Inventory from './container/Inventory'
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
  TAB: 1,
  REFRESH: null,
}

function Player() {

  const setDispatch = useDispatch()

  const character = useSelector(({ reducer }) => reducer.CHARACTER)
  
  const [tab, setTab] = useState(INITIAL.TAB)
  const [values, setValues] = useState(character)
  const [refreshCharacter, setRefreshCharacter] = useState(INITIAL.REFRESH)
  
  useEffect(() => {
    API.get(`characters/read/${character.id}`)
      .then(({ data }) => {
        const [characterData] = data.response
        setValues(characterData)
        setDispatch({
          type: 'CHARACTER',
          data: characterData
        })
      })
  }, [character.id, refreshCharacter, setValues, setDispatch])

  return (
    <Page tab="Jogador" title="Ficha do Jogador" width="80vw">
      <Title type="h6" color="secondary">
        #{character.id} - {character.name}
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
                💪 FOR {values.strength} | 👋 DES {values.dexterity} | ✊ CON {values.constitution}
              </Text>
              <Text fontSize="medium" textAlign="center" whiteSpace="nowrap">
                📙 INT {values.intelligence} | 🙌 SAB {values.wisdom} | 🤝 CAR {values.charisma}
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
                  icon="❤️"
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
                  icon="👣"
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
                  icon="💰"
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
            <Features key="features" character={character} setRefreshCharacter={setRefreshCharacter} />,
            <Abilities key="abilities" character={character} />,
            <Inventory key="inventory" character={character} setRefreshCharacter={setRefreshCharacter} />,
          ]}
        </Tab>
      </Card>
    </Page>
  )
}

export default Player