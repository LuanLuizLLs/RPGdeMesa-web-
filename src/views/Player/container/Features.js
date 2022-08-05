import React, { useState } from 'react'
import { 
  Box,
  Button,
  List, 
  Modal,
 } from '../../../components'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  }
}

function Features() {

  const [modal, setModal] = useState(INITIAL.MODAL)

  return (
    <>
      <Modal
        maxWidth={500}
        stateModal={[modal, setModal]}
      >
        {({
          feature: (
            <>
              TESTE
            </>
          )
        })[modal.content] || 'Conteúdo não encontrado...'}
      </Modal>
      <List
        height={200}
        columns={['ID', 'Característica', 'FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR']}
        rows={[
          {
            id: 1,
            name: 'Musculoso',
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            description: 'Teste',
          }
        ]}
      />
      <Box display="flex" justifyContent="flex-end" margin={10}>
        <Button type="filled">
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Features