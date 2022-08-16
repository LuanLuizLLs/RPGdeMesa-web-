import React, { useState } from 'react'
import {
  Box,
  Button,
  List,
  Modal,
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
    columns: ['ID', 'Item', 'Descrição', 'Atributo', 'Modificador'],
    rows: [
      {
        id: 1,
        name: 'Espada média',
        description: 'Arma comum',
        attribute: 'ATQ',
        modifier: 1,
      },
      {
        id: 2,
        name: 'Escudo médio',
        description: 'Proteção comum',
        attribute: 'DEF',
        modifier: 1,
      },
      {
        id: 3,
        name: 'Botas de couro',
        description: 'Vestimenta comum',
        attribute: 'AGL',
        modifier: 1,
      },
    ],
  }
}

function Inventory({
  player,
  character,
  setRefreshCharacter,
}) {

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [inventory, ] = useState(INITIAL.INVENTORY)

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
      <Box display="flex" justifyContent="flex-end" margin={10}>
        <Button type="filled">
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Inventory