import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import useMessage from '../../../hooks/message'
import useLoading from '../../../hooks/loading'
import { ATTRIBUTE } from '../../../configs'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Paper,
  Select,
  Text,
  TextArea,
  Title,
} from '../../../components'
import { pointAttribute, mentalCapacity } from '../../../utils'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    name: '',
    description: '',
    attribute: 'FOR',
    level: 1,
  },
  REFRESH: null,
  ABILITIES: {
    columns: {
      id: 'ID',
      name: 'Habilidade',
      description: 'Descrição',
      attribute: 'Atributo',
      level: 'Nível',
    },
    rows: []
  },
}

function Abilities({
  user,
  character,
  setRefreshCharacter,
}) {

  const { openMessage } = useMessage()
  const { startLoading, stopLoading } = useLoading()

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [abilities, setAbilities] = useState(INITIAL.ABILITIES)

  useEffect(() => {
    if (character.id) {
      API('abilities', {
        id_character: character.id,
      })
        .read(({ data }) => {
          setAbilities((state) => ({
            ...state, rows: data.response,
          }))
        })
    }
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data, })
      setValues({ ...values, ...data })
    },
    resetAbility: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      stopLoading()
    },
    createAbility: () => {
      startLoading('bar')

      API('abilities', {
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
        .finally(handle.resetAbility)
    },
    updateAbility: () => {
      startLoading('bar')

      API('abilities', {
        ...values,
        user: user.id,
        level: values.level + 1,
      })
        .update(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetAbility)
    },
    deleteAbility: () => {
      startLoading('bar')

      API('abilities', values)
        .delete(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetAbility)
    },
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetAbility}>
        {{
          add_ability: (
            <>
              <Title type="h6">
                Adicionar habilidade:
              </Title>
              <Input
                name="name"
                label="Habilidade"
                placeholder="Nome (verbo)"
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Grid type="row">
                <Grid type="column" padding={[0, 5]}>
                  <Select
                    name="attribute"
                    label="Atributo"
                    options={Object.keys(ATTRIBUTE.PRIMARY)}
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" padding={[0, 5]}>
                  <Input
                    readOnly
                    type="number"
                    name="level"
                    label="Nível"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetAbility}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.createAbility}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          detail_ability: (
            <>
              <Title type="h6">
                Detalhes da habilidade:
              </Title>
              <Paper backgroundColor="secondary">
                <Text color="primary" fontWeight="bold">
                  {modal.data.name} (Lv {modal.data.level})
                </Text>
                <Text>
                  {modal.data.description}
                </Text>
              </Paper>
              <Paper backgroundColor="secondary" margin="10px 0">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" color="gray">
                    {pointAttribute(modal.data.attribute, character[ATTRIBUTE.PRIMARY[modal.data.attribute]], modal.data.level)}
                  </Text>
                  <Button type="filled" color="success" fontSize="medium" onClick={handle.updateAbility}>
                    Aprimorar
                  </Button>
                </Box>
              </Paper>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" padding={10} onClick={handle.resetAbility}>
                  Fechar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteAbility}>
                  Remover
                </Button>
              </Box>
            </>
          ),
        }}
      </Modal>
      <List height={200} onClick={(row) => handle.openModal('detail_ability', row)} {...abilities} />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Text fontWeight="bold">
          <Text inline color="primary">Capacidade: </Text> {mentalCapacity(character)}
        </Text>
        <Button type="filled" onClick={() => Boolean(character.id) && handle.openModal('add_ability')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Abilities