import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../global/context'
import { requestAPI } from '../../../services/api'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Paper,
  Text,
  Title,
} from '../../../components'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    name: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  REFRESH: null,
  FEATURES: {
    columns: {
      id: 'ID',
      name: 'Característica',
      strength: 'FOR',
      dexterity: 'DES',
      constitution: 'CON',
      intelligence: 'INT',
      wisdom: 'SAB',
      charisma: 'CAR',
    },
    rows: []
  },
}

const formatAttribute = (text = '', point = 0) => {
  const attribute = { text, point }
  if (attribute.point) {
    attribute.point = attribute.point >= 0 ? `+${attribute.point}` : `${attribute.point}`
    return `${attribute.text}${attribute.point} `
  }
  return ''
}

function Features({
  player,
  character,
  setRefreshCharacter,
}) {

  const { setMessage, setLoading } = useContext(Context)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [features, setFeatures] = useState(INITIAL.FEATURES)

  useEffect(() => {
    character.id && requestAPI('features', {
      id_character: character.id,
    })
      .read(({ data }) => {
        setFeatures((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetFeature: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createFeature: () => {
      setLoading({
        type: 'bar',
      })

      requestAPI('features', {
        ...values,
        player,
        id_character: character.id,
      })
        .create(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetFeature)
    },
    deleteFeature: () => {
      setLoading({
        type: 'bar',
      })

      requestAPI('features', values)
        .delete(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetFeature)
    }
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetFeature}>
        {{
          add_feature: (
            <>
              <Title type="h6">
                Adicionar característica:
              </Title>
              <Input
                name="name"
                label="Característica"
                placeholder="Nome (adjetivo)"
                stateValue={[values, setValues]}
              />
              <Grid type="row" padding={[5, 0]}>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    max={1}
                    min={-1}
                    icon="💪"
                    label="FOR"
                    type="number"
                    name="strength"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    max={1}
                    min={-1}
                    icon="👋"
                    label="DES"
                    type="number"
                    name="dexterity"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    max={1}
                    min={-1}
                    icon="✊"
                    label="CON"
                    type="number"
                    name="constitution"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Grid type="row">
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    max={1}
                    min={-1}
                    icon="📙"
                    label="INT"
                    type="number"
                    name="intelligence"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    max={1}
                    min={-1}
                    icon="🙌"
                    label="SAB"
                    type="number"
                    name="wisdom"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    max={1}
                    min={-1}
                    icon="🤝"
                    label="CAR"
                    type="number"
                    name="charisma"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetFeature}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.createFeature}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          detail_feature: (
            <>
              <Title type="h6">
                Detalhes da característica:
              </Title>
              <Paper backgroundColor="secondary">
                <Text fontWeight="bold" color="primary">
                  {modal.data.name}
                </Text>
                <Text fontWeight="bold">
                  <Text inline display="inline" color="gray">
                    {formatAttribute('FOR', modal.data.strength)}
                  </Text>
                  <Text inline display="inline" color="gray">
                    {formatAttribute('DES', modal.data.dexterity)}
                  </Text>
                  <Text inline display="inline" color="gray">
                    {formatAttribute('CON', modal.data.constitution)}
                  </Text>
                  <Text inline display="inline" color="gray">
                    {formatAttribute('INT', modal.data.intelligence)}
                  </Text>
                  <Text inline display="inline" color="gray">
                    {formatAttribute('SAB', modal.data.wisdom)}
                  </Text>
                  <Text inline display="inline" color="gray">
                    {formatAttribute('CAR', modal.data.charisma)}
                  </Text>
                </Text>
              </Paper>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" padding={10} onClick={handle.resetFeature}>
                  Fechar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteFeature}>
                  Remover
                </Button>
              </Box>
            </>
          ),
        }}
      </Modal>
      <List
        height={200}
        onClick={(row) => handle.openModal('detail_feature', row)}
        {...features}
      />
      <Box display="flex" justifyContent="flex-end" margin={10}>
        <Button type="filled" onClick={() => Boolean(character.id) && handle.openModal('add_feature')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Features