import React, { useState, useEffect } from 'react'
import API from '../../../../../../services/api'
import { INITIAL } from './initial'
import {
  Box,
  Divider,
  Grid,
  Input,
  Link,
  Paper,
  Text,
  Title,
} from '../../../../../../components'

function Interactions() {

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [interactions, setInteractions] = useState(INITIAL.INTERACTIONS)

  useEffect(() => {
    API('/interactions-board').read(({ data }) => {
      setInteractions(Object.assign({}, data.response))
    })
  }, [])

  const handle = {
    openModal: (content, data = values) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetInteraction: () => {
      setValues(INITIAL.VALUES)
      setModal(INITIAL.MODAL)
    },
  }

  return (
    <>
      <Title type="h6">
        Quadro de interações:
      </Title>
      {Object.values(interactions).map((interaction, i) => (
        <Paper key={i} backgroundColor="secondary" margin="10px 0">
          <Box margin={5}>
            <Text inline color="primary" fontWeight="bold">
              #{i + 1}&nbsp;
              <Link target="_blank" onClick={() => handle.openModal('interaction_detail', interaction)}>
                {interaction.shape.name}
              </Link>
              &nbsp;(Lv {interaction.shape.level})
            </Text>
            <Text color="gray" fontSize="small">
              {interaction.shape.description}
            </Text>
          </Box>
          <Divider borderStyle="solid" margin="0" />
          <Grid type="row" margin={[5, 0]}>
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="❤️"
                name="life"
                type="number"
                fontSize="medium"
                max={interaction.shape.life}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="🩸"
                name="damage"
                type="number"
                fontSize="medium"
                max={interaction.shape.damage}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Divider borderStyle="solid" margin="0 10px" />
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="💪"
                name="strength"
                type="number"
                fontSize="medium"
                max={interaction.strength}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="👋"
                name="dexterity"
                type="number"
                fontSize="medium"
                max={interaction.dexterity}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="✊"
                name="constitution"
                type="number"
                fontSize="medium"
                max={interaction.constitution}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Divider borderStyle="solid" margin="0 10px" />
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="📙"
                name="intelligence"
                type="number"
                fontSize="medium"
                max={interaction.intelligence}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="🙌"
                name="wisdom"
                type="number"
                fontSize="medium"
                max={interaction.wisdom}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
            <Grid type="column">
              <Input
                noLabel
                index={i}
                start="🤝"
                name="charisma"
                type="number"
                fontSize="medium"
                max={interaction.charisma}
                stateValue={[interactions, setInteractions]}
                onEnter={() => null}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  )
}

export default Interactions