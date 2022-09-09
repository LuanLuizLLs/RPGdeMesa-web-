import React, { useState } from 'react'
import { ATTRIBUTE } from '../../../configs'
import {
  Box,
  Button,
  List,
  Modal,
  Text,
  Title,
} from '../../../components'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    id: '',
  },
  INVENTORY: {
    columns: {
      id: 'ID', 
      item: 'Item', 
      description: 'Descrição',
      category: 'Categoria',
      quantoty: 'Quantidade',
    },
    rows: [],
  }
}

const phisicalCapacity = (character = {}) => {
  let capacity = 0
  Object.entries(character).forEach(([key, value]) => {
    if (ATTRIBUTE.PHISICAL.includes(key)) {
      capacity += value
    }
  })
  return capacity
}

function Inventory({
  player,
  character,
  setRefreshCharacter,
}) {

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [inventory,] = useState(INITIAL.INVENTORY)

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={() => setModal(INITIAL.MODAL)}>
        {({
          add_item: (
            <>
              <Title type="h6" color="primary">
                Adicionar item
              </Title>
            </>
          ),
          use_item: (
            <></>
          )
        })[modal.content] || null}
      </Modal>
      <List height={200} {...inventory} />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Text fontWeight="bold">
          <Text inline color="primary">Capacidade: </Text> {phisicalCapacity(character)}
        </Text>
        <Button type="filled">
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Inventory