import React, { useContext, useEffect, useState } from 'react'
import API from '../../../services/api'
import theme from '../../../theme'
import Context from '../../../global/context'
import { attribute } from '../../../configs'
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

function Abilities({
  player,
  character,
  setRefreshCharacter,
}) {

  const setMessage = useContext(Context).message[1]

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
                    options={Object.keys(attribute)}
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
              <Box backgroundColor={theme.secondary} padding={10} margin="10px 0" borderRadius={10}>
                <Text fontWeight="bold">
                  {modal.data.description}
                </Text>
                <Text fontWeight="bold" color="gray">
                  {modal.data.attribute}{(modal.data.level + (character[attribute[modal.data.attribute]])) > 0 && `+`}{(modal.data.level + (character[attribute[modal.data.attribute]]))}
                </Text>
                <Box display="flex" justifyContent="flex-end" marginTop={10}>
                  <Button type="filled" color="error" fontSize="medium" onClick={() => handle.deleteAbility(modal.data.id)}>
                    Remover
                  </Button>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button type="bottomless" padding={10} onClick={handle.resetAbility}>
                  Voltar
                </Button>
                <Button type="filled" padding={10} onClick={() => handle.updateAbility(modal.data)}>
                  Melhorar
                </Button>
              </Box>
            </>
          )
        })[modal.content] || null}
      </Modal>
      <List height={200} onClick={(row) => handle.openModal('update_ability', row)} {...abilities} />
      <Box display="flex" justifyContent="flex-end" margin={10}>
        <Button type="filled" onClick={() => handle.openModal('add_ability')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Abilities