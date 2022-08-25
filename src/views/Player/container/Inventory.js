import React, { useState } from 'react'
import { averageAttributes } from '../../../utils'
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
    columns: ['ID', 'Item', 'Descrição', 'Tipo', 'Quantidade'],
    rows: [],
  }
}

function Inventory({
  player,
  character,
  setRefreshCharacter,
}) {

  const capacity = averageAttributes([character.strength, character.dexterity, character.constitution], 2)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [inventory,] = useState(INITIAL.INVENTORY)

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]}>
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
          <Text inline color="primary">Capacidade: </Text> {capacity}
        </Text>
        <Button type="filled">
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Inventory