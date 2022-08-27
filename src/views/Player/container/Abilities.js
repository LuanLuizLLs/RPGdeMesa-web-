import React, { useContext, useEffect, useState } from 'react'
import API from '../../../services/api'
import theme from '../../../theme'
import Context from '../../../global/context'
import { ATTRIBUTE } from '../../../configs'
import { averageAttributes } from '../../../utils'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Select,
  Text,
  TextArea,
  Title,
} from '../../../components'

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
    columns: ['ID', 'Habilidade', 'Descrição', 'Atributo', 'Nível'],
    rows: []
  },
}

const formatAttribute = (attr = '', attrCurrent = 0, attrAdditional = 0) => {
  const some = attrCurrent + attrAdditional
  if (some > 0) {
    return `${attr}+${some}`
  }
  return `${attr}${some}`
}

function Abilities({
  player,
  character,
  setRefreshCharacter,
}) {

  const capacity = averageAttributes([character.intelligence, character.wisdom, character.charisma], 2)

  const { setMessage } = useContext(Context)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [abilities, setAbilities] = useState(INITIAL.ABILITIES)

  useEffect(() => {
    API.get('abilities/read', {
      params: {
        id_character: character.id,
      }
    })
      .then(({ data }) => {
        setAbilities((state) => ({
          ...state, rows: data.response.map(({
            id, name, description, attribute, level,
          }) => ({
            id, name, description, attribute, level,
          }))
        }))
      })
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({
        content, data,
      })
    },
    resetAbility: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
    createAbility: () => {
      API.post('abilities/create', {
        id_character: character.id,
        player,
        ...values,
      })
        .then(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao criar a habilidade',
          })
        })
        .finally(handle.resetAbility)
    },
    updateAbility: (updateData) => {
      API.patch(`abilities/update/${updateData.id}`, {
        player,
        ...updateData,
        level: updateData.level + 1,
      })
        .then(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao atualizar a habilidade',
          })
        })
        .finally(handle.resetAbility)
    },
    deleteAbility: (id) => {
      API.delete(`abilities/delete/${id}`)
        .then(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .finally(handle.resetAbility)
    },
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]}>
        {({
          add_ability: (
            <>
              <Title type="h6" color="primary">
                Adicionar habilidade:
              </Title>
              <Input
                name="name"
                placeholder="Habilidade (verbo)"
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                placeholder="Descreva a habilidade"
                stateValue={[values, setValues]}
              />
              <Grid type="row" padding={[10, 0]}>
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
          update_ability: (
            <>
              <Title type="h6" color="primary">
                {modal.data.name} (Lv {modal.data.level})
              </Title>
              <Text fontWeight="bold">
                {modal.data.description}
              </Text>
              <Box backgroundColor={theme.secondary} padding={10} margin="10px 0" borderRadius={10}>
                <Box display="flex" justifyContent="space-between">
                  <Text fontWeight="bold" color="gray">
                    {formatAttribute(modal.data.attribute, modal.data.level, character[ATTRIBUTE.PRIMARY[modal.data.attribute]])}
                  </Text>
                  <Button type="filled" color="success" fontSize="medium" onClick={() => handle.updateAbility(modal.data)}>
                    Melhorar
                  </Button>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="error" padding={10} onClick={() => handle.deleteAbility(modal.data.id)}>
                  Remover
                </Button>
                <Button type="filled" padding={10} onClick={handle.resetAbility}>
                  Fechar
                </Button>
              </Box>
            </>
          )
        })[modal.content] || null}
      </Modal>
      <List height={200} onClick={(row) => handle.openModal('update_ability', row)} {...abilities} />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Text fontWeight="bold">
          <Text inline color="primary">Capacidade: </Text> {capacity}
        </Text>
        <Button type="filled" onClick={() => handle.openModal('add_ability')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Abilities