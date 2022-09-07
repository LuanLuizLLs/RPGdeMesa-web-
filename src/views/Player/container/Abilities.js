import React, { useContext, useEffect, useState } from 'react'
import theme from '../../../theme'
import Context from '../../../global/context'
import { ATTRIBUTE } from '../../../configs'
import { requestAPI } from '../../../services/api'
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

  const capacityAbilities = (character.intelligence + character.wisdom + character.charisma)

  const { setMessage, setLoading } = useContext(Context)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [abilities, setAbilities] = useState(INITIAL.ABILITIES)

  useEffect(() => {
    character.id && requestAPI('abilities', {
      id_character: character.id,
    })
      .read(({ data }) => {
        setAbilities((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data, })
      setValues({ ...values, ...data })
    },
    resetAbility: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createAbility: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('abilities', {
        player,
        ...values,
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
        .finally(handle.resetAbility)
    },
    updateAbility: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('abilities', {
        player,
        ...values,
        level: values.level + 1,
      })
        .update(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetAbility)
    },
    deleteAbility: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('abilities', values)
        .delete(({ data }) => {
          setRefresh(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetAbility)
    },
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetAbility}>
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
                  <Button type="filled" color="success" fontSize="medium" onClick={handle.updateAbility}>
                    Melhorar
                  </Button>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="error" padding={10} onClick={handle.deleteAbility}>
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
          <Text inline color="primary">Capacidade: </Text> {capacityAbilities || 0}
        </Text>
        <Button type="filled" onClick={() => Boolean(character.id) && handle.openModal('add_ability')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Abilities