import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import useMessage from '../../../hooks/message'
import useLoading from '../../../hooks/loading'
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
import { formatAttribute } from '../../../utils'

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

function Features({
  user,
  character,
  setRefreshCharacter,
}) {

  const { openMessage } = useMessage()
  const { startLoading, stopLoading } = useLoading()

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [features, setFeatures] = useState(INITIAL.FEATURES)

  useEffect(() => {
    if (character.id) {
      API('features', {
        id_character: character.id,
      })
        .read(({ data }) => {
          setFeatures((state) => ({
            ...state, rows: data.response,
          }))
        })
    }
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetFeature: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      stopLoading({})
    },
    createFeature: () => {
      startLoading('bar')

      API('features', {
        ...values,
        user: user.id,
        id_character: character.id,
      })
        .create(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetFeature)
    },
    deleteFeature: () => {
      startLoading('bar')

      API('features', values)
        .delete(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
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
                    start="💪"
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
                    start="👋"
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
                    start="✊"
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
                    start="📙"
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
                    start="🙌"
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
                    start="🤝"
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