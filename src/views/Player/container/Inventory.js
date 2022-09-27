import React, { useState } from 'react'
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
    category: '',
    attribute: 'FOR',
    usable: 'Não',
    level: 1,
  },
  INVENTORY: {
    columns: {
      id: 'ID',
      item: 'Item',
      description: 'Descrição',
      category: 'Categoria',
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

function Inventory({
  user,
  character,
  setRefreshCharacter,
}) {

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [inventory,] = useState(INITIAL.INVENTORY)

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
    },
    resetInventory: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
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
                name="category"
                placeholder="Categoria"
                options={Object.keys(INVENTORY.CATEGORY)}
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
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetInventory}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10}>
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