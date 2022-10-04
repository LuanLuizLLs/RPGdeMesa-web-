import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../global/context'
import { requestAPI } from '../../../services/api'
import { ATTRIBUTE, INVENTORY } from '../../../configs'
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
    usable: 'Não',
    level: 1,
  },
  REFRESH: null,
  INVENTORY: {
    columns: {
      id: 'ID',
      name: 'Item',
      description: 'Descrição',
      attribute: 'Atributo',
      level: 'Nível',
    },
    rows: [],
  }
}

const phisicalCapacity = (character = {}, capacity = 0) => {
  Object.entries(character).forEach(([key, value]) => {
    if (ATTRIBUTE.PHISICAL.includes(key)) {
      capacity += value
    }
  })
  return capacity
}

const identifyUsable = (value = '') => {
  return INVENTORY.USABLE.indexOf(value)
}

function Inventory({
  user,
  character,
  setRefreshCharacter,
}) {

  const { setLoading, setMessage } = useContext(Context)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [inventory, setInventory] = useState(INITIAL.INVENTORY)

  useEffect(() => {
    character.id && requestAPI('inventory', {
      id_character: character.id,
    })
      .read(({ data }) => {
        setInventory((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
    },
    resetInventory: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createInventory: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('inventory', {
        ...values,
        user: user.id,
        id_character: character.id,
        usable: identifyUsable(values.usable),
      })
        .create(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetInventory)
    },
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={() => setModal(INITIAL.MODAL)}>
        {{
          add_item: (
            <>
              <Title type="h6">
                Adicionar item:
              </Title>
              <Input
                name="name"
                label="Item"
                placeholder="Nome"
                stateValue={[values, setValues]}
              />
              <Select
                name="usable"
                label="Usável"
                options={INVENTORY.USABLE}
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
                    options={INVENTORY.ATTRIBUTES[identifyUsable(values.usable)]}
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
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetInventory}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.createInventory}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          use_item: (
            <></>
          )
        }}
      </Modal>
      <List height={200} {...inventory} />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Text fontWeight="bold">
          <Text inline color="primary">Capacidade: </Text> {phisicalCapacity(character)}
        </Text>
        <Button type="filled" onClick={() => Boolean(character.id) && handle.openModal('add_item')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Inventory